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
  console.log("state ",state);
  console.log("data ", state.data);

  console.log(product_id);
  return (
    <Container>
      <Row>
        <Col>
          <PhotoGallery productinfo={state.data}/>
        </Col>
        <Col>
        </Col>
      </Row>
      <div>
        <p>{product_id}</p>
      </div>
    </Container>
    
  )
}

export default Product;