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

function Product(){
  const product_id = useParams()['id'];
  const {state} = useLocation();
  const detail = state.data
  console.log("state ",state);
  console.log("data ", detail);

  console.log(product_id);
  return (
    <Container>
      <Row>
        <Col>
          <PhotoGallery productinfo={detail}/>
        </Col>
        <Col>
          <h3>{detail.name}</h3>
          
        </Col>
      </Row>
      <div>
        <p>{product_id}</p>
      </div>
    </Container>
    
  )
}

export default Product;