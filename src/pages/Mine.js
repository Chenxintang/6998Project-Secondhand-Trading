import React from "react";
import{
  Row,
  Col, 
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardHeader,
  CardText,
  CardBody,
  FormFeedback,
} from 'reactstrap'
import { useNavigate, useLocation } from "react-router-dom"
import Image from 'react-bootstrap/Image'
import { LoginUser } from "../components/Cookie";

const detailURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/details"
const soldURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/sold"

const Mine = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state.sidebar);
  const [profileValue, setProfileValue] = React.useState(location.state.sidebar)
  const [buyerEmail, setBuyerEmail] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(null);
  const [modalId, setModalId] = React.useState('');
  const toggleModelOpen = async (e) => {
    if(e.target.dataset.action == "sold"){
      setIsFormValid(null);
      setModalId(e.target.dataset.id)
      setBuyerEmail("")
    }
    if(e.target.dataset.action == "confirm"){
      if(!buyerEmail){
        setIsFormValid(false);
        return
      }
      else{
        var product_id = e.target.dataset.id;
        var temp_sell = profileValue.SellProductID;
        var temp_sold = profileValue.SoldProductID;
        for(let i in temp_sell){
          if(temp_sell[i]['Id'] === product_id){
            temp_sold.push(temp_sell[i])
            delete temp_sell[i];
            break;
          }
        }
        setProfileValue({
          ...profileValue,
          SoldProductID: temp_sold,
          SellProductID: temp_sell
        })
        setIsFormValid(null);
        setBuyerEmail("");
        soldProduct(product_id)
      }
      // var temp = wishlistData;
      // for(let i in temp){
      //   if(temp[i]['Id'] === modalId){
      //     delete temp[i];
      //     break;
      //   }
      // }
      // setWishlistData(temp);
      // call sold out product api------------------------------
    }
    setIsModalOpen(!isModalOpen)
  }; 

  const handleChange = (e) => {
    setBuyerEmail(e.target.value);
  }

  const viewProduct = async (e) => {
    var id = e.target.dataset.id
    console.log("view product detail", id);
    // redirect to product detail page --------------------------------------
    var URL = detailURL + `/${id}`;
    console.log(`get api request of product ${id} to url ${URL}`);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    navigate(`/product/${id}`, {state: {'data': data} });
  }
  
  const soldProduct = async (product_id) => {
    console.log("sold product to url", soldURL, product_id);
    // sold to product detail page --------------------------------------
    var response = await fetch(soldURL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        ProductId: product_id, 
        SellerId: LoginUser().email, 
        BuyerId: buyerEmail
      })
    })
    var data = await response.json();
    console.log(data.message);
  }

  const RenderProductNoAction = ({ Id, ImgURL, Title, Location, Price }) => {
    return (
      <Col md={6} sm={12} key={Id} id={Id}>
        <Card className='p-2 wishlist_card'>
          <Row>
            <Col md={3}>
              <Media object src={ImgURL[0]} className="rounded mr-2 mb-2" style={{ width: '60px', height: 'auto' }}/>
            </Col>
            <Col md={5} className="overflow-hidden align-self-center">
              <Media heading tag="h5" className="text-truncate"> {Title} </Media>
              <p className="text-muted text-truncate">{Location}</p>
            </Col>
            <Col md={2} className="align-self-center">
                <h5>${Price}</h5>
            </Col>
            <Col md={2} className="p-0">
              <a className="wishlist_link" data-id={Id} onClick={viewProduct}>View</a>
            </Col>
          </Row>
        </Card>
      </Col>
    )
  }
  const RenderProductAction = ({ Id, ImgURL, Title, Location, Price }) => {
    return (
      <Col md={6} sm={12} key={Id} id={Id}>
        <Card className='p-2 wishlist_card'>
          <Row>
            <Col md={3}>
              <Media object src={ImgURL[0]} className="rounded mr-2 mb-2" style={{ maxWidth: '60px', height: 'auto' }}/>
            </Col>
            <Col md={5} className="overflow-hidden align-self-center">
              <Media heading tag="h5" className="text-truncate"> {Title} </Media>
              <p className="text-muted text-truncate">{Location}</p>
            </Col>
            <Col md={2} className="align-self-center">
                <h5>${Price}</h5>
            </Col>
            <Col md={2} className="p-0">
              <a className="wishlist_link" data-id={Id} onClick={viewProduct}>View</a>
              <a className="wishlist_link" data-action="sold" data-id={Id} onClick={toggleModelOpen}> Sold </a>
            </Col>
          </Row>
        </Card>
      </Col>
    )
  }
  // console.log(props.navigation.state)
  return (
    <div>
      <Card className="my-3">
        <CardHeader tag="h3"> User Profile </CardHeader>
        <CardBody>
          <Row>
            <Col md={3} lg={4}>
              <Row>
                <Col md={10} style={{textAlign: 'center'}}>
                    <Image alt={'user avatar img'} src={profileValue.PortraitURL} roundedCircle
                      top className="uplaod_avatar"/>
                </Col>
              </Row>
            </Col>
            <Col md={9} lg={8}>
              <CardText className="mt-3"> Name: {profileValue.Name} </CardText>
              <CardText> Phone Number: {profileValue.PhoneNumber} </CardText>
              <CardText> Email: {profileValue.Id} </CardText>
              <CardText> Gender: {profileValue.Gender} </CardText>
              <CardText> Address: {profileValue.Address} </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader tag="h3"> Selling Product </CardHeader>
        <CardBody>
          <Row>
            {profileValue.SellProductID.map(
              RenderProductAction
            )}
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader tag="h3"> Bought Product </CardHeader>
        <CardBody>
          <Row>
            {profileValue.BoughtProductID.map(
              RenderProductNoAction
            )}
          </Row>
        </CardBody>
      </Card>
      <Card className="my-3">
        <CardHeader tag="h3"> Sold Product </CardHeader>
        <CardBody>
          <Row>
            {profileValue.SoldProductID.map(
              RenderProductNoAction
            )}
          </Row>
        </CardBody>
      </Card>
      <Modal data-id={modalId} toggle={toggleModelOpen} isOpen={isModalOpen}>
        <ModalBody>
          Type in the buyer's email to confirm product transaction
          <Input placeholder="...@columbia.edu" onChange={handleChange} 
                 className="mt-3" type="text" required 
                 valid={isFormValid==true} invalid={isFormValid==false}
          />
          <FormFeedback invalid> Can not be empty</FormFeedback>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" data-action="confirm" data-id={modalId} outline onClick={toggleModelOpen} >
            Yes
          </Button>
          {' '}
          <Button data-id={modalId} onClick={toggleModelOpen}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default Mine;