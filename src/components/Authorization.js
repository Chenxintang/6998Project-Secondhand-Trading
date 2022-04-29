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

function Authorization(props){
  const [IsLogin, setIsLogin] = React.useState(true);
  const toggleIsLogin = () => setIsLogin(!IsLogin);
  const [emailIsValid, setEmailValid] = React.useState(null);
  const [passwordIsValid, setPasswordValid] = React.useState(null);
  const [pwConfirmIsValid, setPwConfirmValid] = React.useState(null);

  const renderButtonText = () => {
    console.log(IsLogin);
    return IsLogin==true ? 'Login' : 'Signup';
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log('handle submit');
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var emailRegex = /@columbia.edu\s*$/;
    if(IsLogin == false){   // Sign up page, input validation
      let useremail = e.target.email.value;
      let userpassword = e.target.password.value;
      let confirmpassword = e.target.confirmPassword.value;
      if(emailRegex.test(useremail))
        setEmailValid(true);
      else
        setEmailValid(false);
      
      if(passwordRegex.test(userpassword))
        setPasswordValid(true);
      else
        setPasswordValid(false);
      
      if(userpassword == confirmpassword && userpassword != '')
        setPwConfirmValid(true);
      else 
        setPwConfirmValid(false);
    }
    // props.toggleShowLogin();
  }
  return (
    <Row style={{ height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <Col md={6} lg={5}>
        <Card body>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <img src="logo.png" className="rounded" style={{ width: 100, height: 80}} alt="logo"/>
            </div>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input 
                type='email' name="email" placeholder='uni@columbia.edu' 
                valid={emailIsValid==true} invalid={emailIsValid==false}
              />
              <FormFeedback invalid> Email must end with columbia.edu</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input 
                type='password' name="password" placeholder='your password' 
                valid={passwordIsValid==true} invalid={passwordIsValid==false}
              />
              {IsLogin==false && (<FormText> At least 8 characters, both uppercase and lowercase letters, include number.</FormText>)}
              <FormFeedback invalid> Password does not meet requirement </FormFeedback>
            </FormGroup>
            {IsLogin==false && (
              <FormGroup>
                <Label for='confirmPassword'>Confirm Password</Label>
                <Input 
                  type='password' name="confirmPassword" placeholder="confirm your password" 
                  valid={pwConfirmIsValid==true} invalid={pwConfirmIsValid==false}
                />
                <FormFeedback invalid> Password does not match </FormFeedback>
              </FormGroup>
            )}
            <hr />
            <Button size="lg" submit className="bg-gradient-theme-left border-0" block>
              {renderButtonText()}
            </Button>

            <div className="text-center pt-1">
              <h6>or</h6>
              <h6>
                {IsLogin==false ? (
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