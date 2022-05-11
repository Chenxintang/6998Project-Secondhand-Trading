import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Label,
  Button
} from "reactstrap"
import { RegisterUser,ConfirmEmail,Loginfunc,ResendCode } from "../utils/coginto"
import {LogIn, LoginUser, setProfile} from './Cookie'

function Authorization(props){
  const [IsLogin, setIsLogin] = React.useState(true);            //login page or sign up page state
  const [loginStatus, setloginStatus] = React.useState(null);    //login email and password is correct state
  const toggleIsLogin = () => {
    setIsLogin(!IsLogin);
    // reset all state
    setvalidstate({
      "nameValid": null,
      "emailValid": null,
      "passwordValid": null,
      "confirmValid": null
    });
    setvaluestate({
      "username": "",
      "email": "",
      "password": "",
      "confirmPassword": "",
      "code": ""
    })
    setloginStatus(null);
  }
  

  const [valuestate, setvaluestate] = React.useState({
    "username": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
    "code": ""
  });
  const [validstate, setvalidstate] = React.useState({
    "nameValid": null,
    "emailValid": null,
    "passwordValid": null,
    "confirmValid": null
  });

  
  React.useEffect(() => {
    console.log("in use effect function");
    // toogleCheckValid();
    console.log(valuestate);
    console.log(validstate);
    if(validstate.nameValid && validstate.emailValid && validstate.passwordValid && validstate.confirmValid){
      console.log('sending verification code to email');
      RegisterUser(valuestate.username, valuestate.password, valuestate.email, ()=>{});  //send confirmation email
    }
  }, [validstate]);

  function handleChange(event) {
    var value = event.target.value;
    setvaluestate({
      ...valuestate,
      [event.target.name]: value,
    });
  }

  const renderButtonText = () => {
    return IsLogin===true ? 'Login' : 'Signup';
  }

  const signup_validation = () => {
    console.log(valuestate.username, valuestate.password, valuestate.email);
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var emailRegex = /[a-z0-9]+@columbia.edu/;
    setvalidstate({
      ...validstate,
      "nameValid": (valuestate.username.length > 0 && valuestate.username.length < 15),
      "emailValid": (emailRegex.test(valuestate.email)),
      "passwordValid": (passwordRegex.test(valuestate.password)),
      "confirmValid": (valuestate.confirmPassword === valuestate.password && valuestate.confirmPassword !== '')
    });
  }

  const email_callback = (status) =>{
    if(status === 'success'){ //validation success, signup success
      console.log("validation success, signup success");
      // add cookie info
      LogIn(valuestate.email, valuestate.username);
      window.location.href = '/';
    }
  }
  const login_callback = (status, username) =>{
    if(status === 'success'){
      console.log("validation success, log in");
      LogIn(valuestate.email, username);
      console.log("userInfo ", LoginUser());
      window.location.href = '/';
    }else{
      setloginStatus(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit');
    if(IsLogin === false){   // Sign up page, input validation
      console.log("confirm verification code")
      setProfile(true);
      ConfirmEmail(valuestate.username,valuestate.code,email_callback);
      // LogIn("ct2990@columbia.edu", "stacey");
      // window.location.href = '/';
    }
    else{                 // Login page, cognito validation
      setProfile(false);
      console.log("log in... confirm email and password")
      Loginfunc(valuestate.email, valuestate.password, login_callback)
    }
  }
  return (
    <Row style={{ height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Col md={6} lg={5}>
        <Card body>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <img src="logo.png" className="rounded" style={{ width: 100, height: 80}} alt="logo"/>
            </div>
            {IsLogin===false && (<FormGroup>
              <Label for="username">Username</Label>
              <Input 
                type='text' name="username" placeholder='your username' 
                valid={validstate.nameValid === true} 
                invalid={validstate.nameValid === false} onChange={handleChange}
              />
              <FormFeedback invalid> Username length should between 0 and 10</FormFeedback>
            </FormGroup>)}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input 
                type='text' name="email" placeholder='uni@columbia.edu' 
                valid={validstate.emailValid === true} 
                invalid={validstate.emailValid === false}  onChange={handleChange}
              />
              <FormFeedback invalid> Email must end with columbia.edu</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              {!IsLogin && (
                <div>
                  <Input 
                    type='password' name="password" placeholder='your password' 
                    valid={validstate.passwordValid === true} 
                    invalid={validstate.passwordValid === false}  onChange={handleChange}
                  />
                  <FormText> At least 8 characters, both uppercase and lowercase letters, include number.</FormText>
                  <FormFeedback invalid> Password does not meet requirement </FormFeedback>
                </div>)}
              {IsLogin && (
                <div>
                  <Input 
                    type='password' name="password" placeholder='your password' 
                    valid={loginStatus===true} invalid={loginStatus===false}  onChange={handleChange}
                  />
                  <FormFeedback invalid> Password and email does not match</FormFeedback>
                </div>)}
            </FormGroup>
            {!IsLogin && (
              <FormGroup>
                <Label for='confirmPassword'>Confirm Password</Label>
                <Input 
                  type='password' name="confirmPassword" placeholder="confirm your password" 
                  valid={validstate.confirmValid === true} 
                  invalid={validstate.confirmValid === false}  onChange={handleChange}
                />
                <FormFeedback invalid> Password does not match </FormFeedback>
              </FormGroup>
            )}
            {!IsLogin && (<FormGroup>
              <Row>
                <Col>
                  <Input 
                    type='text' name="code"
                    placeholder="Verify code"
                    valid={validstate.codeValid === true} 
                    invalid={validstate.codeValid === false} onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Button onClick={signup_validation}>Send verify code</Button>
                </Col>
              </Row>
              <FormFeedback invalid> Confirmation code not correct</FormFeedback>
            </FormGroup>)}
            <hr />
            <Button size="lg" className="bg-gradient-theme-left border-0" block>
              {renderButtonText()}
            </Button>
            <FormFeedback invalid> Password does not match </FormFeedback>

            <div className="text-center pt-1">
              <h6>or</h6>
              <h6>
                {IsLogin===false ? (
                  <a className="no_herf_link" onClick={toggleIsLogin}> Login </a>
                ) : (
                  <a className="no_herf_link" onClick={toggleIsLogin}> Signup </a>
                )}
              </h6>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
        
  );
}

export default Authorization;