import React from 'react';
import{
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

var search_key = 'recommendation';
var sort_key = "newest";

const Productwindow = (props) => {
  const [sortBtnIsOpen, setsortBtnOpen] = React.useState(false);
  const toggleSortBtn = () => setsortBtnOpen(!sortBtnIsOpen);

  let navigate = useNavigate(); 
  const redirect = (data) =>{
    navigate(`/product/${data['Id']}`, {state: {'data': data} });
  }
  
  // generate product preview card window
  var product = [];
  for(let i = 0; i < 2; i++){
    let row = [];
    for(let j = 0; j < 4; j++){
      let index = String(i*4+j+1);
      let this_product = props.product_info[index];
      row.push(
        <Col key={"col"+index}>
          <Card className="product_card">
            <CardImg alt={this_product['Name']} src={this_product['Img'][0]} top width="100%" />
            <CardBody onClick={()=> redirect(this_product)} className="card_clickable">
              <CardTitle tag="h5"> {this_product['Name']} </CardTitle>
              <CardText tag="h6">
                ${this_product['Price']}
              </CardText>
              <CardSubtitle className="text-muted" tag="p" >
                {this_product['Location']}
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      )
    }
    product.push(<Row key={"row"+i}>{row}</Row>)
  }
    
  return (
    <Container fluid>
      <Row className='m-2'>
        <Col md={4} style={{lineHeight: "35px"}} >Results for {search_key}
        </Col>
        <Col></Col>
        <Col md={2}>
        <ButtonDropdown isOpen={sortBtnIsOpen} toggle={toggleSortBtn}>
          <DropdownToggle caret color="light"> Sort by: {sort_key}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem> Newest(Default) </DropdownItem>
            <DropdownItem> Closest </DropdownItem>
            <DropdownItem> Price: Low to high </DropdownItem>
            <DropdownItem> Price: High to low </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </Col>
      </Row>
      {product}
    </Container>
  )
}
export default Productwindow;
