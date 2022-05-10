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

var product = [];
var search_key = 'recommendation';

const Productwindow = (props) => {
  const [sortBtnIsOpen, setsortBtnOpen] = React.useState(false);
  const toggleSortBtn = () => setsortBtnOpen(!sortBtnIsOpen);
  const [sortKey, setSortKey] = React.useState('newest');
  const [products, setproducts] = React.useState([]);
  
  const changeSortWay = (e) => {
    setSortKey(e.target.innerHTML);
  }

  React.useEffect(() => {
    console.log("change of props.product_info");
    generate_products();
  }, [props.product_info]);

  let navigate = useNavigate(); 
  const redirect = (id) =>{
    navigate(`/product/${id}`); //, {state: {'data': data} }
  }
  function generate_each_product (index, this_product){
    return (
      <Col key={"col"+index} md={3}>
        <Card className="product_card">
          <CardImg alt={this_product['Title']} src={this_product['Img']} top className='product_img'/>
          <CardBody onClick={()=> redirect(this_product['Id'])} className="card_clickable">
            <CardTitle tag="h5" className='overflow-hidden'> {this_product['Title']} </CardTitle>
            <CardText tag="h6">
              ${this_product['Price']}
            </CardText>
            <CardSubtitle className="text-muted" tag="p">
              {this_product['Location']}
            </CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    )
  }

  function generate_products (){
    product = [];
    var length = Object.keys(props.product_info).length;
    var last_row = length % 4;
    var row_num = parseInt(length / 4);
    // console.log(row_num, last_row);
    var index = 0;
    for(let i = 0; i < row_num; i++){
      var row = [];
      for(let j = 0; j < 4; j++){
        // let index = String(i*4+j+1);
        // let this_product = props.product_info[index];
        row.push(generate_each_product(index, props.product_info[index]))
        index++;
      }
      product.push(<Row key={"row"+i}>{row}</Row>)
    }
    var row = [];
    for(let i = 0; i < last_row; i++){
      row.push(generate_each_product(index, props.product_info[index]))
      index++;
    }
    product.push(<Row>{row}</Row>)
    // return product;
    // setproducts(product);
  }

  generate_products()
    
  return (
    <Container fluid>
      <Row className='m-2'>
        <Col md={4} style={{lineHeight: "35px"}} >Results for {props.search_key}
        </Col>
        <Col></Col>
        <Col md={2}>
        <ButtonDropdown isOpen={sortBtnIsOpen} toggle={toggleSortBtn}>
          <DropdownToggle caret color="light"> Sort by: {sortKey}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={changeSortWay}> Newest </DropdownItem>
            <DropdownItem onClick={changeSortWay}> Closest </DropdownItem>
            <DropdownItem onClick={changeSortWay}> Price: Low to high </DropdownItem>
            <DropdownItem onClick={changeSortWay}> Price: High to low </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        </Col>
      </Row>
      {product}
    </Container>
  )
}
export default Productwindow;
