import React from "react";
import {
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col
} from "reactstrap";
import { useParams, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import PhotoGallery from "../components/PhotoGallery";

const product_dataset = {
  "1": {"Id": "1", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
  "2": {"Id": "2", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
  "3": {"Id": "3", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
  "4": {"Id": "4", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
  "5": {"Id": "5", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
  "6": {"Id": "6", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
  "7": {"Id": "7", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
  "8": {"Id": "8", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
}
const detailURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/details"


function Product(){
  const product_id = useParams()['id'];
  const productDetailRequestAPI = (id) => {
    // api request get product details
    var URL = detailURL + `/${id}`;
    console.log(`get api request of product ${id} to url ${URL}`);
    // var response = await fetch(URL);
    // var data = await response.json();
    // console.log(data);
    return product_dataset[id]
  }
  const [productDetail, setProductDetail] = React.useState(productDetailRequestAPI(product_id))
  // const {state} = useLocation();
  // const detail = state.data
  // console.log("state ",state);
  // console.log("data ", detail);

  console.log(product_id);
  return (
    <Container>
      <Row>
        <Col>
          <PhotoGallery productinfo={productDetail}/>
        </Col>
        <Col>
          <h3>detail.name</h3>
          
        </Col>
      </Row>
      <div>
        <p>product_id</p>
      </div>
    </Container>
    
  )
}

export default Product;