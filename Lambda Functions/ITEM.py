import json
import urllib.parse
import boto3
import re
import os
import base64
import datetime
import dateutil.tz
import requests
from requests_aws4auth import AWS4Auth
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
from boto3.dynamodb.conditions import Key, Attr
import sys
import uuid
import time
from requests.auth import HTTPBasicAuth



def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    # if it is triggered by /upitemphoto
    if 'resource' in event and event['resource'] == '/upitemphoto':
        url,labels = imageindex(event,context)
        
        responseBody = {
            'imageURL':url,
            'labels':labels
        }
        return {
                'statusCode': 200,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'body': json.dumps(responseBody),
                'isBase64Encoded':False
            }
    
    # if it is triggered by /postInfo  
    if "resource" in event and event["resource"] == '/postInfo':
        print(event['body'])
        print(type(event['body']))
        body1 = event['body']
        body = json.loads(body1)
        print(body)
        itemid = es_Posted(event,context)
        responseBody = {
            'itemID':itemid
        }
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(responseBody)
            }
            
    # if it is triggered by /items/search method 
    if "resource" in event and event["resource"] == '/items/search':
        res = search_tags(event)
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(res)
            }

    if "resource" in event and event["resource"] == "/items/details/{id}":
        res = get_info_from_db(event)
        return {
            'isBase64Encoded':False,
            'headers': {"Access-Control-Allow-Origin": "*"},
            'statusCode': 200,
            'body':json.dumps(res)
        }
        
    # if it is triggered by /items/sold/ Methods
    if "resource" in event and event["resource"] == '/items/sold':
        response = remove_product_from_es(event)
        responsebody= {
            "message": response
        }
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body': json.dumps(responsebody)
            }        
        
def imageindex(event, context):
    body = event['body']
    decodeImage = base64.b64decode(body) 
    print(decodeImage)
    
    multiValueHeaders = event["multiValueHeaders"]
    content_type = multiValueHeaders["content-type"][0]
    print(content_type)
    
    # get the file name
    file_name = multiValueHeaders["file-name"][0]
    print(file_name)
    
    # upload image to s3
    s3 = boto3.client('s3', region_name='us-east-1')
    s3.put_object(Bucket = 'item-photo', Key=file_name, Body=decodeImage, ContentType=content_type)

    imageurl = 'https://s3.amazonaws.com/item-photo/' + file_name
    
    # Get the image labels from rekognition
    labels = []
    
    # enter the rekognition
    client = boto3.client('rekognition')
    response = client.detect_labels(Image={'S3Object':{'Bucket':'item-photo','Name':file_name}},MaxLabels=10)
    
    for label in response['Labels']:
        labels.append(label['Name'])
    
    print('label:', labels)

    return (imageurl,labels)
        
    

  
def es_Posted(event,context):

    print (event['body'])
    body1 = event['body']
    
    body = json.loads(body1)
    print(body)
    print(type(body))
    
    url = body["url"]
    labels = body['labels']
    itemowner = body['userID']
    itemtitle = body['title']
    category = body['category']
    location = body['location']
    condition = body['condition']
    brand = body['brand']
    sellingPrice = body['SellingPrice']
    originalPrice = body['OriginalPrice']
    tags = labels
    detail = body['detail']
    itemid = str(time.time())
    now = str(datetime.datetime.now()).split('.')[0]
    
    # store the specific item info in opensearch 
    record = {
        "id": itemid,
        "Title": itemtitle,
        "Location": location,
        "ImgURL": url,
        "SellingPrice": sellingPrice,
        "CreatedTime": now,
        "Category": category,
        "Tags": tags
    }
    print(record)      
    
    host = "search-photos-z5y574efsjshn6rof2s3a3bvni.us-east-1.es.amazonaws.com"
    region = 'us-east-1'
    service = 'es'
    credentials = boto3.Session().get_credentials()
    auth = AWSV4SignerAuth(credentials, region)
    search = OpenSearch(
        hosts = [{'host': host, 'port': 443}],
        http_auth = auth,
        use_ssl = True,
        verify_certs = True,
        connection_class = RequestsHttpConnection
    )
    res = search.index(index="items", doc_type="_doc", id=itemid, body=record)
    # result = search.get(index="items", doc_type="_doc", id='1')
    print("res", res)
    # print("result", result)

    # store complete information in db
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    product_table = dynamodb.Table("ProductTable")
    response = product_table.put_item(
        # Data to be inserted
        Item = {
            "id": itemid,
            "Title": itemtitle,
            "Location": location,
            "ImgURL": url,
            "SellingPrice": sellingPrice,
            "OriginalPrice":originalPrice,
            "CreatedTime": now,
            "Category": category,
            "Tags": tags,
            "Condition": condition,
            "Brand": brand,
            "Details": detail,
            "SellerID": itemowner        
        }
    )
    
    print("DB response", response)
    # store information in db
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    user_table = dynamodb.Table("UserTable")
        
    # add a new post product
    response = user_table.update_item(
                Key={"id": itemowner},
                UpdateExpression="SET SellProductID = list_append(if_not_exists(SellProductID, :empty_list), :new_value)",
                ExpressionAttributeValues={":empty_list": [], ":new_value": [itemid]},
            )
    print("DB response", response)    
    
    return itemid
    

# if it is triggered by /items/search method
def search_tags(event):  
    q = event['queryStringParameters']['q']
    print("q:",q)
    
    # differentiate the tags received
    newTag = q.split('_')
    
    if newTag:
        tag_lower = newTag[1].lower()
        print("tag_lower:",tag_lower)
        searchData = get_product_from_es(tag_lower,newTag[0])
        print("es RESPONSE --- {}".format(searchData))
        
        if searchData:
            return searchData
    return []

   
def get_product_from_es(tag,classify):
    """Given a tag, return a list of product ids in that tag"""
    # connect to opensearch
    print('ready to connect openSearch')
    
    host = 'search-photos-z5y574efsjshn6rof2s3a3bvni.us-east-1.es.amazonaws.com'
    region = 'us-east-1'
    service = 'es'
    
    # get the credentials
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

    opensearch = OpenSearch(
        hosts = [{'host': host, 'port': 443}],
        http_auth = awsauth,
        verify_certs = True,
        use_ssl = True,
        connection_class = RequestsHttpConnection
    )
    print('enter opensearch success')
    
    if classify == 'search':
        # search for all matches
        result = opensearch.search(index = 'items', body={"query": {"match": {"Tags":{"query":tag,"fuzziness": "AUTO","analyzer": "standard"}}}})
   
        
    elif classify == 'category':
        result = opensearch.search(index = 'items', body={"query": {"match": {"Category":{"query":tag,"fuzziness": "AUTO","analyzer": "standard"}}}})
    
    print(result)
    
    #follow the opesearch response result's structure to retrieve info
    hits=result['hits']['hits']
    print(hits)

    items = []

    for item in hits:
        Item = {
            "Id" :item["_source"]["id"],
            "Img":item["_source"]["ImgURL"][0],
            "Title":item["_source"]["Title"],
            "Price":item["_source"]["SellingPrice"],
            "Location":item["_source"]["Location"]
        }
        ls = ['1652250845.6529338','1652251153.1481884','1652248908.3001688','1652249266.544047',"1652269890.012965","1652270057.5657759"]
        if item["_source"]["id"] not in items and (item["_source"]["id"] not in ls):
            items.append(Item)   
    
    print("items:",items)
    
    return items




# if it is triggered by /items/details/{id} Methods
def get_info_from_db(event):
        
    product_id = event["pathParameters"]["id"]
    print("product_id",product_id)

    # Dynamo gets info based on item id
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    product_table = dynamodb.Table("ProductTable")


    response = product_table.get_item(
        Key={
            'id': product_id
        }
    )
    product_info = response['Item']

    Title = product_info["Title"]
    Location = product_info["Location"]
    ImgURL = product_info["ImgURL"]
    OriginalPrice = product_info["OriginalPrice"]
    SellingPrice = product_info["SellingPrice"]
    CreatedTime=product_info["CreatedTime"]
    Category = product_info["Category"]
    Tags = product_info["Tags"]
    Condition = product_info["Condition"]
    Brand = product_info["Brand"]
    Details= product_info["Details"]
    SellerID = product_info["SellerID"]
    
    message_content =  {
            "Id": product_id,
            "Title": Title,
            "Location": Location,
            "ImgURL": ImgURL,
            "OriginalPrice": OriginalPrice,
            "SellingPrice": SellingPrice,
            "CreatedTime": CreatedTime,
            "Category": Category,
            "Tags": Tags,
            "Condition": Condition,
            "Brand": Brand,
            "Details": Details,
            "SellerID": SellerID
        }
    
    #return message_content
    print("product_info", product_info)
    return message_content
    
# remove item from elastic search and update buyerid in db 
def remove_product_from_es(event):
    """Given a product_id, remove the product out of opensearch"""
    body1 = event["body"]
    body = json.loads(body1)
    
    product_id = body["ProductId"]
    buyer_id = body["BuyerId"]
    seller_id = body["SellerId"]
    
    host = 'search-photos-z5y574efsjshn6rof2s3a3bvni.us-east-1.es.amazonaws.com'
    region = 'us-east-1'
    service = 'es'
    credentials = boto3.Session().get_credentials()
    access_key, secret_key = credentials.access_key, credentials.secret_key

    awsauth = AWS4Auth(access_key, secret_key, region, service, session_token = credentials.token)
    
    search = OpenSearch(
        hosts = [{'host': host, 'port': 443}],
        http_auth = awsauth,
        use_ssl = True,
        verify_certs = True,
        connection_class = RequestsHttpConnection
    )

    res = search.delete(index = "items", id = product_id)
    print("delete product:", res)
    
    """append the product id to buyer user table . """
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    user_table = dynamodb.Table("UserTable")

    response = user_table.update_item(
                Key={"id": buyer_id},
                UpdateExpression="SET BoughtProductID = list_append(if_not_exists(BoughtProductID, :empty_list), :new_value)",
                ExpressionAttributeValues={":empty_list": [], ":new_value": [product_id]},
            )
    print("update bought product for buyer:", response)
    
    """update the seller user table (delete the product from sell_product_id and append it to sold_product_id"""
    # first retrieve all sell_product_id
    response = user_table.get_item(
        Key={
            'id': seller_id
        }
    )
    product_info = response['Item']
    sell_product_id = product_info['SellProductID']
    print("sell_product_id:",sell_product_id)
   
    #delete SellProductID for seller
    sell_product_id.remove(product_id)
    
    resp_delete_seller = user_table.update_item(
                Key={"id": seller_id},
                UpdateExpression="SET SellProductID = :new_value",
                ExpressionAttributeValues={":new_value": sell_product_id},
            )
    print("delete sell product for seller:", resp_delete_seller)
    
    #add SoldProductID for seller
    resp_add_seller = user_table.update_item(
                Key={"id": seller_id},
                UpdateExpression="SET SoldProductID = list_append(if_not_exists(SoldProductID, :empty_list), :new_value)",
                ExpressionAttributeValues={":empty_list": [], ":new_value": [product_id]})
    print("Add sold product for seller:", resp_add_seller)
    res = "success"
    return res