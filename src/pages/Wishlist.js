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
import { useNavigate } from "react-router-dom"

const temp_wishlist = [
  {
    Id: 'a',
    Image: 'https://picsum.photos/256/186',
    Title: 'Retro style feather necklace',
    Location: "New York, NY",
    Price: "12"
  },
  {
    Id: 'b',
    Image: 'https://picsum.photos/256/186',
    Title: 'Schedule App',
    Location: "New York, NY",
    Price: '9'
  },
]

const Wishlist = () => {
  let navigate = useNavigate();
  const [wishlistData, setWishlistData] = React.useState(temp_wishlist);
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
          delete temp[i];
          break;
        }
      }
      setWishlistData(temp);
      // call delete wishlist product api------------------------------
    }
    setIsModalOpen(!isModalOpen)
  }; 
  
  const viewProduct = (e) => {
    console.log("view product detail", e.target.dataset.id);
    // redirect to product detail page ------------------------------------
    navigate(`/product/${e.target.dataset.id}`, {state: {'data': ''} });
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
                ({ Id, Image, Title, Location, Price }) => (
                  <Col md={6} sm={12} key={Id} id={Id}>
                    <Card className='p-2 wishlist_card'>
                      <Row>
                        <Col md={3}>
                          <Media object src={Image} className="rounded mr-2 mb-2" style={{ width: '100%', height: 'auto' }}/>
                        </Col>
                        <Col md={5} className="overflow-hidden align-self-center">
                          <Media heading tag="h5" className="text-truncate"> {Title} </Media>
                          <p className="text-muted text-truncate">{Location}</p>
                        </Col>
                        <Col md={2} className="align-self-center">
                            <h4>${Price}</h4>
                        </Col>
                        <Col md={2} className="p-0">
                          <a className="wishlist_link" data-action="open" data-id={Id} onClick={toggleModelOpen}> Delete </a>
                          <a className="wishlist_link" data-id={Id} onClick={viewProduct}>View</a>
                        </Col>
                        <Modal data-id={Id} toggle={toggleModelOpen} isOpen={isModalOpen}>
                          <ModalBody>
                            Are you sure to delete this product from your wishlist?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" data-action="delete"  data-id={Id} outline onClick={toggleModelOpen} >
                              Delete
                            </Button>
                            {' '}
                            <Button data-id={Id} onClick={toggleModelOpen}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Row>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Wishlist;