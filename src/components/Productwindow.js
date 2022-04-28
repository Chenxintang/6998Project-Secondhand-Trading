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

var search_key = 'airpods';
var sort_key = "newest";

const Productwindow = (props) => {
  const [sortBtnIsOpen, setsortBtnOpen] = React.useState(false);
  const toggleSortBtn = () => setsortBtnOpen(!sortBtnIsOpen);

  let navigate = useNavigate(); 

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
            <CardImg alt={this_product['Name']} src={this_product['Img']} top width="100%" />
            <CardBody onClick={()=> {navigate(`/product/${this_product['Id']}`);}} className="card_clickable">
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
        <Col md={2} style={{lineHeight: "35px"}}>Results for {search_key}
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




// class Productwindow extends React.Component {
//   constructor(props){
//     super(props);
//     this.toggleSortBtn = this.toggleSortBtn.bind(this);
//     this.state = {
//       sortBtnIsOpen: false
//     };
//   }
//   toggleSortBtn = () => {
//     this.setState({
//       sortBtnIsOpen: !this.state.sortBtnIsOpen,
//     });
//   };



//   render(){
//     // generate product preview card window
//     var product = [];
//     for(let i = 0; i < 2; i++){
//       let row = [];
//       for(let j = 0; j < 4; j++){
//         let index = String(i*4+j+1);
//         let this_product = this.props.product_info[index];
//         row.push(
//           <Col key={"col"+index}>
//             <Card className="product_card">
//               <CardImg alt={this_product['Name']} src={this_product['Img']} top width="100%" />
//                 <CardBody onClick={this.routeChange(this_product['Id'])} className="card_clickable">
//                   <CardTitle tag="h5"> {this_product['Name']} </CardTitle>
//                   <CardText tag="h6">
//                     ${this_product['Price']}
//                   </CardText>
//                   <CardSubtitle className="text-muted" tag="p" >
//                     {this_product['Location']}
//                   </CardSubtitle>
//                 </CardBody>
//             </Card>
//           </Col>
//         )
//       }
//       product.push(<Row key={"row"+i}>{row}</Row>)
//     }
    
//     return (
//       <Container fluid>
//         <Row className='m-2'>
//           <Col md={2} style={{lineHeight: "35px"}}>Results for {search_key}
//           </Col>
//           <Col></Col>
//           <Col md={2}>
//           <ButtonDropdown isOpen={this.state.sortBtnIsOpen} toggle={this.toggleSortBtn}>
//             <DropdownToggle caret color="light"> Sort by: {sort_key}</DropdownToggle>
//             <DropdownMenu>
//               <DropdownItem> Newest(Default) </DropdownItem>
//               <DropdownItem> Closest </DropdownItem>
//               <DropdownItem> Price: Low to high </DropdownItem>
//               <DropdownItem> Price: High to low </DropdownItem>
//             </DropdownMenu>
//           </ButtonDropdown>
//           </Col>
//         </Row>
//         {product}
//       </Container>
//     )
//   }
// }

export default Productwindow;
