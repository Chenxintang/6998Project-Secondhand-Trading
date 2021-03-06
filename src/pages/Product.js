import React from "react";
import {
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Container,
  Row,
  Col,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import PhotoGallery from "../components/PhotoGallery";
import { LoginUser } from "../components/Cookie";

const product_dataset = {
  "Id": "2022-05-10",
  "Title": "[Used]Airpods Pro",
  "Location": "New York City",
  "ImgURL": ['https://picsum.photos/256/186','https://picsum.photos/256/187','https://picsum.photos/256/188'],
  "SellingPrice": "100",
  "OriginalPrice":"170",
  "CreatedTime": "2022-05-10",
  "Category": "Electronics",
  "Tags": ["earphone","white"],
  "Condition": "used",
  "Brand": "Apple",
  "Details": "almost new, bought last year. Firm price, no bargain.",
  "SellerID": "yj2679@columbia.edu",
}
const temp_wishlist = [
  {
    Id: '1652219337.5907838',
    Image: 'https://picsum.photos/256/186',
    Title: 'Retro style feather necklace',
    Location: "New York, NY",
    Price: "12"
  },
  {
    Id: '1652219337.5907838',
    Image: 'https://picsum.photos/256/186',
    Title: 'Schedule App',
    Location: "New York, NY",
    Price: '9'
  },
]

const detailURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/details"
const addWishURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/liked-item"
const viewWishURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/view-liked/"

function Product(){
  const navigate = useNavigate();
  const product_id = useParams()['id'];
  const location = useLocation();
  const product_data = location.state.data;
  // const productDetailRequestAPI = (id) => {
  //   // api request get product details
  //   var URL = detailURL + `/${id}`;
  //   console.log(`get api request of product ${id} to url ${URL}`);
  //   // var response = await fetch(URL);
  //   // var data = await response.json();
  //   // console.log(data);
  //   return product_dataset
  // }
  const [productDetail, setProductDetail] = React.useState(product_data);
  const [emailMessage, setEmailMessage] = React.useState(
    `Hi, my name is ${LoginUser().username}, I'm interested the ${productDetail.Title} you sell.`
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModelOpen = (e) => {
    // if(e.target.dataset.action === 'send'){
    //   console.log(`send email message to ${productDetail.SellerID}`)
    //   // call send email api -----------------------------------------------
    // }
    setIsModalOpen(!isModalOpen);
  } 
  
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const toggleAlertOpen = () => setIsAlertOpen(!isAlertOpen);
  const handleChange = (e) => {
    setEmailMessage(e.target.value);
  }

  const saveWishlist = async () => {
    console.log('add wish list to url', addWishURL);
    var response = await fetch(addWishURL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({UserId: LoginUser().email, ProductId: product_id, action: "ADD"})
    })
    var data = await response.json();
    var code = data.ResponseMetadata.HTTPStatusCode
    console.log(code)
    if(code === 200){
      toggleAlertOpen();
    }
  }

  const clickWishlist = async () => {
    // api request to get user wishlist
    var URL = viewWishURL + LoginUser().email;
    console.log('get wish list from url', URL);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    console.log('navigate to wishlist from product detail page')
    navigate('/wishlist', {state: {sidebar: data.user_liked_products} });
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <PhotoGallery productinfo={productDetail}/>
        </Col>
        <Col className="m-0 mr-1">
          <Alert color="success" isOpen={isAlertOpen} toggle={toggleAlertOpen}>
            Succesfully added to wishlist! 
            <a className="alert-link" onClick={clickWishlist} > Take a look. </a>
          </Alert>
          <div className="productdetail_card">
            <h3>{productDetail.Title}</h3>
            <div>
              <span className="selling_price">${productDetail.SellingPrice}</span>
              <span className="original_price">Original price: ${productDetail.OriginalPrice}</span>
            </div>
            <div className="normal"> 
              <span className="domain">Created on: </span> {productDetail.CreatedTime} in {productDetail.Location} 
            </div>
            <div className="normal"> <span className="domain"> Condition: </span> {productDetail.Condition} </div>
            <div className="normal"> <span className="domain"> Category: </span> {productDetail.Category} </div>
            <div className="normal"> <span className="domain"> Brand: </span> {productDetail.Brand} </div>
            <div className="description"> <span className="domain"> Description: </span> {productDetail.Details} </div>
          </div>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col className="mb-5">
          <Button className="product_action_btn mb-3" onClick={toggleModelOpen}> Want to buy </Button>
          <Button className="product_action_btn" onClick={saveWishlist} > Save to wishlist </Button>
        </Col>
        
        <Modal toggle={toggleModelOpen} isOpen={isModalOpen}>
          <ModalBody tag="h5">
            Seller Contact Email is {productDetail.SellerID}
            {/* <Input
              value={emailMessage} onChange={handleChange} className="mt-3"
              rows={5} type="textarea" /> */}
          </ModalBody>
          <ModalFooter>
            <Button color="success" data-action="send" outline onClick={toggleModelOpen} >
              Got it
            </Button>
            {/* {' '}
            <Button onClick={toggleModelOpen}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
      </Row>
    </Container>
    
  )
}

export default Product;