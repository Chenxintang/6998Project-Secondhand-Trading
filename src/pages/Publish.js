import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Alert,
  Form, 
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  InputGroup,
  Label,
  InputGroupText,
  Spinner
} from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Addtag from "../components/Addtag";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginUser } from "../components/Cookie";

var product_img = {};
const PhotoURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/upitemphoto";
const InfoURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/postInfo"
const detailURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/details"

const Publish = () => {
  // component states definition
  const navigate = useNavigate(); 
  const [imgValueState, setimgValueState] = React.useState({});
  const [productPhotoWindow, setproductPhotoWindow] = React.useState([]);
  const [ifSpinner, setIfSpinner] = React.useState(false);
  const [ifDisable, setIfDisable] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const toggleAlertOpen = () => setIsAlertOpen(!isAlertOpen);
  const [itemId, setItemId] = React.useState('');
  const [formValidState, setformValidState] = React.useState({
    'title': null,
    'categorySelect': null,
    'locationSelect': null,
    'conditionSelect': null,
    'brand': null,
    'sellingPrice': null,
    'originalPrice': null,
    'productDetail': null,
    'photo': null
  });
  const [formValueState, setformValueState] = React.useState({
    'title': '',
    'categorySelect': '',
    'locationSelect': '',
    'conditionSelect': '',
    'brand': '',
    'sellingPrice': '',
    'originalPrice': '',
    'productDetail': '',
    'user_tags': [],
  });

  // component function definition
  React.useEffect(() => {
    console.log("change of validation state");
    var flag = true;
    for(var key in formValidState){
      flag = flag && formValidState[key];
    }
    if(flag){
      console.log("all correct, sending api requests")
      sendAllInfo();
    }
    // api get category data
  }, [formValidState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    SubmitValidation();
    console.log('handle submit');
    console.log(formValueState);
    console.log(imgValueState);
  }

  const sendAllInfo = async () => {
    setIfSpinner(true);
    var labels = [];
    var urls = [];
    for(var key in imgValueState){
      let response = await sendPhotoAPI(imgValueState[key].avatar_name, imgValueState[key].data, imgValueState[key].type);
      console.log('response from api photo')
      labels = labels.concat(response.labels);
      urls.push(response.imageURL);
    }
    var product_information = {
      'url': urls,
      'labels': formValueState.user_tags.concat(labels),
      'userID': LoginUser().email,
      'title': formValueState.title,
      'category': formValueState.categorySelect,
      'location': formValueState.locationSelect,
      'condition': formValueState.conditionSelect,
      'brand': formValueState.brand,
      'detail': formValueState.productDetail,
      'SellingPrice': formValueState.sellingPrice,
      'OriginalPrice': formValueState.originalPrice
    }
    // console.log(product_information);
    var itemid = sendInfoApi(product_information);
    console.log(itemid)
    setItemId(itemid)
    toggleAlertOpen();
    setIfDisable(true)
    setformValueState({
      'title': '',
      'categorySelect': '',
      'locationSelect': '',
      'conditionSelect': '',
      'brand': '',
      'sellingPrice': '',
      'originalPrice': '',
      'productDetail': '',
      'user_tags': [],
    })
    setIfSpinner(false);
  }
  const sendPhotoAPI = async (name, data, type) => {
    console.log('put avatar img to url ', name, PhotoURL);
    var response = await fetch(PhotoURL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        "File-Name": name,
        "Content-Type": type+';base64'
      },
      body: data
    })
    var data = await response.json();
    console.log(data)
    return data;
    // .then(response => {
    //   return response.json();
    // }).then(data => {
    //   console.log(data);
    //   console.log(data.labels)
    //   console.log(data.imageURL)
    //   return data;
    // })
  }
  const sendInfoApi = async (product_data) => {
    console.log('put all product information to url ', InfoURL);
    console.log(product_data)
    var response = await fetch(InfoURL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        // "File-Name": name,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(product_data)
    })
    var data = await response.json();
    console.log(data)
    return (data.itemID);
  }
  
  const clickItemId = async (e) => {
    var id = itemId;
    var URL = detailURL + `/${id}`;
    console.log(`get api request of product ${id} to url ${URL}`);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    navigate(`/product/${id}`, {state: {'data': data} }); //
  }

  const handleChange = (e) => {
    setformValueState({
      ...formValueState,
      [e.target.name]: e.target.value
    })
  }

  const SubmitValidation = () => {
    setformValidState({
      'title': formValueState.title.length > 0 && formValueState.title.length < 100,
      'categorySelect': formValueState.categorySelect.length > 0,
      'locationSelect': formValueState.locationSelect.length > 0,
      'conditionSelect': formValueState.conditionSelect.length > 0,
      'brand': formValueState.brand.length > 0 && formValueState.brand.length < 15,
      'sellingPrice': formValueState.sellingPrice != 0,
      'originalPrice': formValueState.originalPrice != 0,
      'productDetail': formValueState.productDetail.length > 0,
      'photo': Object.keys(imgValueState).length > 0
    })
  }

  const add_photo = (e) => {
    console.log('enter add_photo');
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      var id = (Object.keys(imgValueState).length+1);
      var temp_imgValue = imgValueState;
      temp_imgValue[id] = {'data': reader.result.split(',')[1],
                          'type': reader.result.split(';')[0].split(':')[1],
                          'url': reader.result,
                          'avatar_name': timestamp };
      setimgValueState(temp_imgValue);

      setproductPhotoWindow(productPhotoWindow.concat(
        <Col md={2} key={id}>
          <Card >
            <Button close className="close_image" onClick={delete_photo} id={id}/>
            <CardImg alt={id} src={reader.result} top width="100%" />
          </Card>
        </Col>
      ))
    };
  }

  const delete_photo = (e) => {
    console.log(e.target.id)
    var temp_window = productPhotoWindow;
    var temp_img = imgValueState;
    delete temp_img[e.target.id];
    delete temp_window[e.target.id];
    setimgValueState(temp_img)
    setproductPhotoWindow(temp_window);
    console.log("delete success");
  }

  const selectedTags = (tags) => {
    console.log("user tags", tags);
    setformValueState({
      ...formValueState,
      'user_tags': tags
    })
  }

  return (
    <div>
      <Alert color="success" isOpen={isAlertOpen} toggle={toggleAlertOpen}>
        Succesfully published! 
        <a className="alert-link" data-id={itemId} onClick={clickItemId} > Take a look. </a>
      </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h3">
            Publish a new item
          </CardTitle>
          <Form id="publish_form" onSubmit={handleSubmit} >
          <fieldset disabled ={ifDisable}>
            <FormGroup>
              <Label for="title"> Title </Label>
              <Input name="title" placeholder="Use words people will search for your item" onChange={handleChange}
                     valid={formValidState.title===true} invalid={formValidState.title===false}
              /> 
              <FormFeedback invalid> Title can not be empty, and should be less than 100 words.</FormFeedback>
              <FormText> You can include details such as brand, color, size, specs, condition, etc. </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="categorySelect"> Category </Label>
              <Input id="product_category" name="categorySelect" type="select" onChange={handleChange}
                     valid={formValidState.categorySelect===true} invalid={formValidState.categorySelect===false}
              >
                <option></option>
                <option> Clothing </option>  <option> Sports </option>
                <option> Art </option>  <option> Health </option>
                <option> Tickets </option>  <option> Electronics </option>
                <option> Accessories </option>  <option> Games </option>
                <option> Other </option>
              </Input>
              <FormFeedback invalid> Category can not be empty.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="locationSelect"> Location </Label>
              <Input id="product_location" name="locationSelect" type="select" onChange={handleChange}
                     valid={formValidState.locationSelect===true} invalid={formValidState.locationSelect===false}
              >
                <option></option>
                <option> Campus </option>  <option> Upper Manhattan </option>
                <option> Midtown </option>  <option> Downtown </option>
                <option> Queens </option>  <option> New Jersey </option>
                <option> Brooklyn </option>  <option> Flushing </option> 
                <option> Other Area in New York </option>
              </Input>
              <FormFeedback invalid> Location can not be empty.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="conditionSelect"> Condition </Label>
              <Input id="product_condition" name="conditionSelect" type="select" onChange={handleChange}
                     valid={formValidState.conditionSelect===true} invalid={formValidState.conditionSelect===false}
              >
                <option></option>
                <option> New </option>
                <option> Used </option>
                <option> Refurbished </option>
                <option> Open box </option>
                <option> For parts or not working </option>
              </Input>
              <FormFeedback invalid> Condition can not be empty.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="brand"> Brand </Label>
              <Input name="brand" placeholder="Brand of the product"  onChange={handleChange}
                     onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                     valid={formValidState.brand===true} invalid={formValidState.brand===false}
              />
              <FormFeedback invalid> Brand can not be empty</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="sellingPrice"> Selling Price </Label>
                  <InputGroup>
                    <InputGroupText>$</InputGroupText>
                    <Input name="sellingPrice" placeholder="Amount" type="number" step="0.1" onChange={handleChange}
                           valid={formValidState.sellingPrice===true} invalid={formValidState.sellingPrice===false}
                    />
                    <FormFeedback invalid> Selling price can not be empty</FormFeedback>
                  </InputGroup>
                </Col>
                <Col>
                  <Label for="originalPrice"> Original Price </Label>
                  <InputGroup>
                    <InputGroupText>$</InputGroupText>
                    <Input name="originalPrice" placeholder="Amount" type="number" step="0.1" onChange={handleChange}
                           valid={formValidState.originalPrice===true} invalid={formValidState.originalPrice===false}
                    />
                    <FormFeedback invalid> Original price can not be empty</FormFeedback>
                  </InputGroup>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
              <Label for="userTags"> Add Tags for the product </Label>
              <Addtag selectedTags = {selectedTags}/>
            </FormGroup>
            <FormGroup>
              <Label for="productDetail"> Product Detail </Label>
              <Input id="product_detail" name="productDetail" type="textarea" onChange={handleChange}
                     valid={formValidState.productDetail===true} invalid={formValidState.productDetail===false}
              />
              <FormText> Add size, color, type and other details of the product you are selling. <br/>
                        Tell buyers about unique features, flaws, or why you are selling it! </FormText>
              <FormFeedback invalid> Product detail can not be empty </FormFeedback>
            </FormGroup>
          </fieldset>
          </Form>
        </CardBody>
      </Card>

      {/* uplod photos card */}
      <Card>
        <CardBody>
          <FormGroup>
            <Label for="productPhoto"> Upload photos </Label>
            <Input id="product_photo" name="productPhoto" type="file" onChange={add_photo}
                   valid={formValidState.photo===true} invalid={formValidState.photo===false}
            />
            <FormFeedback invalid> upload at least one photo </FormFeedback>
          </FormGroup>
          <Row>
            {productPhotoWindow}
          </Row>
        </CardBody>
      </Card>
      <Row style={{margin: '10px'}}>
        <Col></Col>
        <Col md={2} lg={2}>
          <Spinner color="info" size="" hidden={!ifSpinner}>
            Loading...
          </Spinner>
          <Button size="lg" className="bg-gradient-theme-left border-0 mb-3" inlineblock
                  form="publish_form" submit>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Publish;