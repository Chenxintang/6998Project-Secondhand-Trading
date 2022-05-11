import React from "react";
import{
  Row,
  Col, 
  Card,
  CardTitle,
  CardText,
} from 'reactstrap'
import { useLocation } from "react-router-dom";
import Image from 'react-bootstrap/Image'

const Profile = () => {

  const location = useLocation();
  var data_from_sidebar = location.state.topbar;
  const [profileValue, setProfileValue] = React.useState(data_from_sidebar)
  // console.log(props.navigation.state)
  return (
    <Row style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Col md={10} lg={10}>
        <Card body>
        <Row>
          <Col md={3} lg={4}>
            <Row>
              <Col md={10} style={{textAlign: 'center'}}>
                  <Image alt={'user avatar img'} src={profileValue.ProtraitURL} roundedCircle top className="uplaod_avatar"/>
              </Col>
            </Row>
          </Col>
          <Col md={9} lg={8}>
            <CardText> Name: {profileValue.Name} </CardText>
            <CardText> Phone Number: {profileValue.PhoneNumber} </CardText>
            <CardText> Email: {profileValue.Id} </CardText>
            <CardText> Gender: {profileValue.Gender} </CardText>
            <CardText> Address: {profileValue.Address} </CardText>
          </Col>
        </Row>
        </Card>
      </Col>
    </Row>
  )
};

export default Profile;