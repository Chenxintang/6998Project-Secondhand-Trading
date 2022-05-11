import React from "react";
import {
  Row,
  Col, 
  Card,
  CardHeader,
  CardBody,
  Button,
  Media,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { useNavigate, useLocation } from "react-router-dom"
import { LoginUser } from "../components/Cookie";

const detailURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/details"
const addWishURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/liked-item"
// const temp_wishlist = [
//   {
//     Id: 'a',
//     Image: 'https://picsum.photos/256/186',
//     Title: 'Retro style feather necklace',
//     Location: "New York, NY",
//     Price: "12"
//   },
//   {
//     Id: 'b',
//     Image: 'https://picsum.photos/256/186',
//     Title: 'Schedule App',
//     Location: "New York, NY",
//     Price: '9'
//   },
// ]

const Wishlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var data_from_sidebar = location.state.sidebar;
  // console.log(data_from_sidebar);

  const [wishlistData, setWishlistData] = React.useState(data_from_sidebar);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState('');
  const toggleModelOpen = (e) => {
    if(e.target.dataset.action == "open"){
      setModalId(e.target.dataset.id)
    }
    if(e.target.dataset.action == "delete"){
      var temp = wishlistData;
      for(let i in temp){
        if(temp[i]['Id'] === modalId){
          temp.splice(i,1)
          break;
        }
      }
      console.log(temp);
      setWishlistData(temp);
      deleteWishlist();
      // call delete wishlist product api------------------------------
    }
    setIsModalOpen(!isModalOpen)
  }; 

  const deleteWishlist = async () => {
    console.log('delete wish list from url', addWishURL);
    var response = await fetch(addWishURL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({UserId: LoginUser().email, ProductId: modalId, action: "DELETE"})
    })
    var data = await response.json();
    var code = data.ResponseMetadata.HTTPStatusCode
    console.log(code)
    // if(code === 200){
    //   toggleAlertOpen();
    // }
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

  // request for user's wishlist data
  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader tag="h3">Wish List</CardHeader>
          <CardBody>
            <Row>
              {wishlistData.map(
                ({ Id, ImgURL, Title, Location, Price }) => (
                  <Col md={6} sm={12} key={Id} id={Id} className="my-2">
                    <Card className='p-2 wishlist_card'>
                      <Row>
                        <Col md={3}>
                          <Media object src={ImgURL[0]} className="rounded mr-2 " style={{ width: '100%', maxHeight: '90px' }}/>
                        </Col>
                        <Col md={5} className="overflow-hidden align-self-center">
                          <Media heading tag="h5" className="text-truncate"> {Title} </Media>
                          <p className="text-muted text-truncate">{Location}</p>
                        </Col>
                        <Col md={2} className="align-self-center">
                            <h5>${Price}</h5>
                        </Col>
                        <Col md={2} className="p-0">
                          <a className="wishlist_link" data-action="open" data-id={Id} onClick={toggleModelOpen}> Delete </a>
                          <a className="wishlist_link" data-id={Id} onClick={viewProduct}>View</a>
                        </Col>
                        
                      </Row>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Modal data-id={modalId} toggle={toggleModelOpen} isOpen={isModalOpen}>
        <ModalBody>
          Are you sure to delete this product from your wishlist?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" data-action="delete"  data-id={modalId} outline onClick={toggleModelOpen} >
            Delete
          </Button>
          {' '}
          <Button data-id={modalId} onClick={toggleModelOpen}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default Wishlist;