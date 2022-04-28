import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  Form, 
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label
} from 'reactstrap'
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

var product_img = {};


const Publish = () => {
  var product_photo_window = [];
  
  const [uploadPhotoWindow, setuploadPhotoWindow] = React.useState(<div></div>);

  const add_photo = (e) => {
    console.log('enter add_photo');
    let id = 'img'+(Object.keys(product_img).length+1)
    product_img[id] = {'url': URL.createObjectURL(e.target.files[0]), 
                       'data': e.target.files[0]
                      };
    console.log(product_img)
    // generate photo window code
    var product_photo_window = [];
    for(let [key, img] of Object.entries(product_img)){
      product_photo_window.push(
        <Col md={2} key={key}>
          <Card >
            <Button close className="close_image" onClick={delete_photo} id={key}/>
            <CardImg alt={key} src={img['url']} top width="100%" />
          </Card>
        </Col>
      );
    };
    setuploadPhotoWindow(product_photo_window);
  }
  const delete_photo = (e) => {
    console.log(e.target.id)
    delete product_img[e.target.id];
    console.log("delete success")
    // generate photo window code
    var product_photo_window = [];
    for(let [key, img] of Object.entries(product_img)){
      product_photo_window.push(
        <Col md={2} key={key}>
          <Card >
            <Button close className="close_image" onClick={delete_photo} id={key}/>
            <CardImg alt={key} src={img['url']} top width="100%" />
          </Card>
        </Col>
      );
    };
    setuploadPhotoWindow(product_photo_window);
  }

  
  

  return (
    <div>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="title"> Title </Label>
              <Input name="title" placeholder="Use words people will search for your item" />  {/*需要字数控制 */}
              <FormFeedback invalid> Title can not be empty, and should be less than 80 words.</FormFeedback>
              <FormText> You can include details such as brand, color, size, specs, condition, etc. 0/80 </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="conditionSelect"> Condition </Label>
              <Input id="product_condition" name="conditionSelect" type="select" >
                <option> New </option>
                <option> Used </option>
                <option> Refurbished </option>
                <option> Open box </option>
                <option> FOr parts or not working </option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="brand"> Brand </Label>
              <Input name="brand" placeholder="Brand of the product" />
              <FormFeedback invalid> Brand can not be empty</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="productDetail"> Proudct Detail </Label>
              <Input id="product_detail" name="productDetail" type="textarea" />
              <FormText> Add size, color, type and other details of the product you are selling. <br/>
                        Tell buyers about unique features, flaws, or why you are selling it! </FormText>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      {/* uplod photos card */}
      <Card>
        <CardBody>
          <FormGroup>
            <Label for="productPhoto"> Upload photos </Label>
            <Input id="product_photo" name="productPhoto" type="file" onChange={add_photo}/>
            <FormText> Improve your buyer's confidence by including as many as possible.</FormText>
          </FormGroup>
          <Row>
            {uploadPhotoWindow}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default Publish;