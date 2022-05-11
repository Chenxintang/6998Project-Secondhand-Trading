import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Form, 
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  InputGroup,
  Label,
  InputGroupText
} from 'reactstrap'
import { Row, Col } from "reactstrap";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {LoginUser, setProfile} from '../components/Cookie'
import Image from 'react-bootstrap/Image'


const defaulAvatarS3Url = 's3://portrait/IMG_4576(20200321-223824) (2).JPG';
// const S3BucketURL = 'https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev'
const S3BucketURL = 'https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/'


function UploadProfile(props){
  // const [userAvatarURL, setuserAvatarURL] = React.useState({'url': 'userAvatar.JPG', 'data': ''});
  const [validState, setValidState] = React.useState({'address': null, 'phone': null, 'gender': null})
  const [valueState, setValueState] = React.useState({
    'address': '',
    'phone': '',
    'gender': '',
    'url': 'https://portrait.s3.amazonaws.com/IMG_4576(20200321-223824)+(2).JPG',
    's3_url': defaulAvatarS3Url,
    'data': '',
    'avatar_name': '',
    'type': ''
  })

  const SubmitProfile = async (e) => {
    e.preventDefault();
    console.log("into submit profile function");
    if(validateForm()){
      console.log('all form valid, sumbit info');
      console.log(valueState);
      var imageURL = await sendAvatarImg();
      var isSuccess = await sendUserProfile(imageURL);
      if(isSuccess){
        setProfile(false);       //set upload profile cookie
        window.location.href = '/';
      }
    }else{
      console.log('some info not valid');
    }
  }

  const sendAvatarImg = async () => {
    var URL = S3BucketURL + 'upportrait'; //+ '/upload/portrait/' + valueState.avatar_name;
    console.log('put avatar img to url ', URL);
    var response = await fetch(URL, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        // "Access-Control-Allow-Origin": "*",
        "File-Name": valueState.avatar_name,
        "Content-Type": valueState.type+';base64'
      },
      body: valueState.data
    })
    var data = await response.json();
    console.log(data)
    return data.imageURL;
  }

  const sendUserProfile = async (imageURL) => {
    var profileUrl = S3BucketURL + 'user/fillInfo';
    console.log('post all profile to url ', profileUrl);
    var data = {
      Id: LoginUser().email,
      Name: LoginUser().username,
      Gender: valueState.gender,
      Address: valueState.address,
      PhoneNumber: valueState.phone,
      PortraitURL: imageURL
    };
    console.log(data);
    var response = await fetch(profileUrl, {
      method: 'POST',
      headers: {
        // "X-Api-Key": 
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response.status)
    // var data = await response.json();
    // console.log(data)
    return response.status === "200"
  }
  const hiddenFileInput = React.useRef();     // hide file input
  const clickUploadBtn = () => {
    hiddenFileInput.current.click();
    console.log('current.value ');
  }
  const change_avatar = (e) => {
    console.log('change avatar function');
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      // console.log(reader.result)
      // console.log(typeof reader.result.split(',')[1])
      setValueState({
        ...valueState,
        'data': reader.result.split(',')[1],
        'type': reader.result.split(';')[0].split(':')[1],
        'url': reader.result,
        'avatar_name': LoginUser().username+'portrait'
      }) 
    }
  }
  
  function handleChange(event) {
    var value = event.target.value;
    setValueState({
      ...valueState,
      [event.target.name]: value,
    });
  }

  const validateForm = () => {
    var flagAddress = valueState.address.length > 0;
    var flagPhone = valueState.phone.length > 0;
    var flagGender = valueState.gender.length > 0;
    setValidState({
      ...validState,
      'address': flagAddress,
      'phone': flagPhone, 
      'gender': flagGender
    })
    return (flagAddress && flagPhone && flagGender)
  }
  return (
    <Row style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Col md={10} lg={10}>
        <Card body>
        <CardTitle tag="h3">
          Upload your profile
        </CardTitle>
        <Row>
          <Col md={3} lg={4}>
            <Row>
              <Col md={10} style={{textAlign: 'center'}}>
                  <Image alt={'user avatar img'} src={valueState.url} roundedCircle top className="uplaod_avatar"/>
              </Col>
            </Row>
            <FormGroup>
              <AiOutlineCloudUpload onClick={clickUploadBtn} size='33' className="hover_on upload_icon"/>
              <Input id="product_photo" name="productPhoto" innerRef={hiddenFileInput} 
                     type="file" onChange={change_avatar} style={{display:'none'}} 
              />
            </FormGroup>
          </Col>
          
          <Col md={9} lg={8}>
            <Form onSubmit={SubmitProfile}>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type='text' name="address" placeholder='your address' 
                  valid={validState.address === true} 
                  invalid={validState.address === false} onChange={handleChange}
                />
                <FormFeedback invalid> Address must not be empty </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  type='tel' name="phone" placeholder='(___) ___-___' 
                  valid={validState.phone === true} 
                  invalid={validState.phone === false}  onChange={handleChange}
                />
                <FormFeedback invalid> Phone number must not be empty</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="gender"> Gender </Label>
                <Input name="gender" type="select" 
                  valid={validState.gender === true} 
                  invalid={validState.gender === false}  onChange={handleChange}>
                  <option>  </option>
                  <option> Female </option>
                  <option> Male </option> 
                  <option> Prefer Not to Say </option>
                </Input>
                <FormFeedback invalid> Must choose one gender </FormFeedback>
              </FormGroup>
              <hr />
              <Button size="lg" className="bg-gradient-theme-left border-0" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default UploadProfile;
