import React from "react";
import {
  Button
} from 'reactstrap'
import {LoginUser, setProfile} from '../components/Cookie'

function UploadProfile(props){
  
  const SubmitProfile = (e) => {
    console.log("into submit profile function");
    setProfile(false);
    // props.toggleIfUpload();
    window.location.href = '/';
  }

  return (
    <div> 
      This is profile upload page 
      <Button onClick={SubmitProfile}> Submit </Button>
    </div>
  )
}
export default UploadProfile;