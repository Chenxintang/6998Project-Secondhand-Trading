import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap"

const PhotoGallery = (props) => {
  const information = props.productinfo;
  const [mainUrl, setmainUrl] = React.useState(information['ImgURL'][0])

  const changeMainImg = (url) => {
    setmainUrl(url);
  }

  return (
    <Container>
      <Row>
        <Card>
          <CardImg alt={information['Id']} src={mainUrl}/>
        </Card>
      </Row>
      <hr/>
      <Row>
        {information['ImgURL'].map( (url, index) => (
          <Col key={index} md={2} >
              <CardImg alt={'img'+index} src={url} onClick={() => changeMainImg(url)} className="card_clickable"></CardImg>
          </Col>
          ))}
      </Row>
    </Container>
  )
}

export default PhotoGallery;