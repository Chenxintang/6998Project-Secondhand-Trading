import json
import urllib.parse
import boto3
import base64
import re
import os
import datetime
import dateutil.tz
import requests
import sys
import uuid
import time
import logging
from requests.auth import HTTPBasicAuth
from requests_aws4auth import AWS4Auth
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
from boto3.dynamodb.conditions import Key, Attr



def lambda_handler(event, context):
    
    print("Received event: " + json.dumps(event, indent=2))
    
    # 1. put user portrait in S3
    if 'resource' in event and event['resource'] == '/upportrait':
        url = user_portrait(event)
        responseBody = {
            'imageURL':url
        }        
        return {
                'statusCode': 200,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'body': json.dumps(responseBody),
                'isBase64Encoded':False
            }   

    # 2. post user profile in database
    if "resource" in event and event["resource"] == '/user/fillInfo':
        res = user_fillinfo(event)   
        message = {
            "message":res
        }
        return {
                'statusCode': 200,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'body': json.dumps(message),
                'isBase64Encoded':False
            }  

    # 3. get user profile from database
    # and user sell/sold/bought products from database
    if "resource" in event and event["resource"] == '/user/profile/{userID}':
        profile_info, sell_product_info, sold_product_info, bought_product_info = user_profile(event)
        responseBody = {
            "Id": profile_info["Id"],
            "Name": profile_info["Name"],
            "Gender": profile_info["Gender"],
            "Address": profile_info["Address"],
            "PhoneNumber": profile_info["PhoneNumber"],
            "PortraitURL": profile_info["PortraitURL"],
            "SellProductID": sell_product_info,
            "SoldProductID": sold_product_info,
            "BoughtProductID": bought_product_info
        }          
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(responseBody)
            }

    # 4. get user liked products from database
    if "resource" in event and event["resource"] == '/user/view-liked/{userID}':
        # print(event['body'])
        # print(type(event['body']))
        # print("body content: ", body)
        response = user_view_liked(event)
        responseBody = {
            'user_liked_products':response
        }          
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(responseBody)
            }

    # 5. recommend products according to search history
    if "resource" in event and event["resource"] == '/user/login':
        print("body content: ", event['body'])
        PortraitURL, response = user_login(event)
        responseBody = {
            "Avatar":PortraitURL,
            "Data": response 
        }             
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(responseBody)
            }
         
    # 6. post or delete user liked products in database
    if "resource" in event and event["resource"] == '/user/liked-item':
        print("body content: ", event['body'])
        response = user_liked_post(event)
        return {
                'isBase64Encoded':False,
                'headers': {"Access-Control-Allow-Origin": "*"},
                'statusCode': 200,
                'body':json.dumps(response)
            }

# put user portrait in s3 bucket
def user_portrait(event):
    if 'resource' in event and event['resource'] == '/upportrait':
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
        s3.put_object(Bucket = 'portrait', Key=file_name, Body=decodeImage, ContentType=content_type)
    
        imageurl = 'https://s3.amazonaws.com/portrait/' + file_name        

        return imageurl

# Post user profile in db
# All the information
def user_fillinfo(event):
    # print (event['body'])
    body = event['body']
    
    body = json.loads(body)
    # print(type(body))

    Id = body["Id"]
    Name = body['Name']
    Gender = body['Gender']
    Address = body['Address']
    PhoneNumber = body['PhoneNumber']
    PortraitURL = body['PortraitURL']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    user_table = dynamodb.Table("UserTable")
    response = user_table.put_item(
    # Data to be inserted
        Item = {
            "id": Id,
            "Name": Name,
            "Gender": Gender,
            "Address": Address,
            "PhoneNumber": PhoneNumber,
            "PortraitURL": PortraitURL,
            "SearchHistory": [],
            "SellProductID": [],
            "SoldProductID":[],
            "BoughtProductID": [],
            "LikedProductID": []
        }
    )
    # print("DB response", response)
    print("Create user profile successfully!")
    res = "Create user profile successfully!"
    return res



# get user profile and user sell/sold/bought/liked products from db
def user_profile(event):
    if "resource" in event and event["resource"] == '/user/profile/{userID}':
        userID = event["pathParameters"]["userID"]

        # Dynamo gets info based on user id
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        user_table = dynamodb.Table("UserTable")

        response = user_table.get_item(
            Key={
                'id': userID
            }
        )
        user_info = response['Item']
        print(user_info)

        Id = user_info["id"]
        Name = user_info["Name"]
        Gender = user_info["Gender"]
        Address = user_info["Address"]
        PhoneNumber=user_info["PhoneNumber"]
        PortraitURL=user_info["PortraitURL"]

        profile_info = {
            "Id": Id,
            "Name": Name,
            "Gender": Gender,
            "Address": Address,
            "PhoneNumber": PhoneNumber,
            "PortraitURL": PortraitURL
        }

        SellProductID_list = user_info["SellProductID"]
        SoldProductID_list = user_info["SoldProductID"]
        BoughtProductID = user_info["BoughtProductID"]
        
        sell_product_info = []
        for sell_id in SellProductID_list:
            if sell_id and len(sell_product_info)<4:
                # print("sellProductID", sell_id)
                searchData = get_product_from_db_id(sell_id)
                sell_product_info.append(searchData)
                # print("SellProduct info from es--- {}".format(searchData))
        # if sell_product_info:
        #     print(sell_product_info)  

        sold_product_info = []
        for sold_id in SoldProductID_list:
            if sold_id and len(sold_product_info)<4:
                # print("soldProductID", sold_id)
                searchData = get_product_from_db_id(sold_id)
                sold_product_info.append(searchData)
                # print("SoldProduct info from es--- {}".format(searchData))
        # if sold_product_info:
        #     print(sold_product_info)  

        bought_product_info = []
        for bought_id in BoughtProductID:
            if bought_id and len(bought_product_info)<4:
                # print("boughtProductID", bought_id)
                searchData = get_product_from_db_id(bought_id)
                bought_product_info.append(searchData)
                # print("BoughtProduct info from es--- {}".format(searchData))
        # if bought_product_info:
        #     print(bought_product_info)  

        return profile_info, sell_product_info, sold_product_info, bought_product_info
            
# get user liked products info
def user_view_liked(event):
    if "resource" in event and event["resource"] == '/user/view-liked/{userID}':
        
        user_id = event["pathParameters"]["userID"]
        print("user_id",user_id)
        
        # Dynamo gets info based on user id
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        user_table = dynamodb.Table("UserTable")

        response = user_table.get_item(
            Key={
                'id': user_id
            }
        )
        user_info = response['Item']
        product_ids = user_info["LikedProductID"]
        
        product_info_list = []
        for product_id in product_ids:
            if product_id:
                print(product_id)
                searchData = get_product_from_db_id(product_id)
                product_info_list.append(searchData)
                print("es RESPONSE --- {}".format(searchData))
                
        if product_info_list:
            print(product_info_list)
            return product_info_list
        else:
            return "No such products."



def get_product_from_db_id(product_id):
        
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
    print("type:",type(product_info["ImgURL"]))
    if type(product_info["ImgURL"]) == 'list':
        ImgURL = product_info["ImgURL"][0]
    else:
        ImgURL = product_info["ImgURL"]
    SellingPrice = product_info["SellingPrice"]
    
    message_content =  {
            "Id": product_id,
            "Title": Title,
            "Location": Location,
            "ImgURL": ImgURL,
            "Price": SellingPrice
        }
    
    #return message_content
    # print("product_info", product_info)
    return message_content
    


# push recommendations and user portrait when user logs in
def user_login(event):
    if "resource" in event and event["resource"] == '/user/login':
        body = event["body"]
        body = json.loads(body)
        user_id = body["UserId"]
        # Dynamo gets info based on user id
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        user_table = dynamodb.Table("UserTable")

        response = user_table.get_item(
            Key={
                'id': user_id
            }
        )
        user_info = response['Item']
        imageURL = user_info["PortraitURL"]
        
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
        if len(user_info["SearchHistory"]) == 0:
            print('no search history')
            # randomly generated some recommendations
            result = search.search(index = 'items', body={"query": {"match":{"Location":{"query":'Upper Manhattan'}}}})
            print(result)
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
                ls = ['1652250845.6529338','1652251153.1481884','1652248908.3001688','1652249266.544047']
                if item["_source"]["id"] not in items and (item["_source"]["id"] not in ls):
                    items.append(Item)
        
        #searchhistory: tags for product
        else:
            tags = user_info["SearchHistory"]
            hits = []
            for tag in tags:
                if tag:
                    print(tag)
                    tag_lower = tag.lower()
                    searchData = search.search(index = 'items', body={"query": {"match":{"Tags":{"query":tag_lower,"fuzziness": "AUTO","analyzer": "standard"}}}})
                    hit=searchData['hits']['hits']
                    hits.append(hit)
            print(hits)
            items = []
            for item in hits[0]:
                Item = {
                    "Id" :item["_source"]["id"],
                    "Img":item["_source"]["ImgURL"][0],
                    "Title":item["_source"]["Title"],
                    "Price":item["_source"]["SellingPrice"],
                    "Location":item["_source"]["Location"]
                }
                ls = ['1652250845.6529338','1652251153.1481884','1652248908.3001688','1652249266.544047']
                if item["_source"]["id"] not in items and (item["_source"]["id"] not in ls):
                    items.append(Item)

        
                
        
        print("es RESPONSE --- {}".format(items))
                    
        return imageURL,items


# post new liked product id & delete not liked item into user database
def user_liked_post(event):
    if "resource" in event and event["resource"] == '/user/liked-item':
        # get user_id and product_id
        body = event["body"]
        body = json.loads(body)
        user_id = body["UserId"]
        product_id = body["ProductId"]
        
        # retrieve from database
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        user_table = dynamodb.Table("UserTable")
        

        # if add a new liked product
        if body["action"] == "ADD":
            response = user_table.update_item(
                    Key={"id": user_id},
                    UpdateExpression="SET LikedProductID = list_append(if_not_exists(LikedProductID, :empty_list), :new_value)",
                    ExpressionAttributeValues={":empty_list": [], ":new_value": [product_id]},
                )
            print("Add new liked product response: ", response)
            return response

        # if delete an old liked product
        elif body["action"] == "DELETE":
            response = user_table.get_item(
                    Key={'id': user_id}
            )
            product_info = response['Item']
            liked_product_id = product_info['LikedProductID']
            print("liked_product_id:",liked_product_id)
        
            #delete likedProductID
            liked_product_id.remove(product_id)
            print("After removed", liked_product_id)
            response = user_table.update_item(
                        Key={"id": user_id},
                        UpdateExpression="SET LikedProductID = :new_value",
                        # ExpressionAttributeValues={":empty_list": [], ":new_value": [liked_product_id]},
                        ExpressionAttributeValues={":new_value": liked_product_id}
                    )
            print("delete liked product:", response)
        
            return response