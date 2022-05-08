import './App.css';
import React, { useState } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {LoginUser, ProfileStatus, removeProfile} from  './components/Cookie';
import NormalPageLayout from './pages/NormalPageLayout';
import Authorization from './components/Authorization';
import UploadProfile from './pages/UploadProfile';


function App() {
  const userInfo = LoginUser();
  // const profileFlag = ProfileStatus();
  // console.log(ProfileStatus());
  // const [IfUpload, setIfUpload] = useState(false);
  // const toggleIfUpload = () => setIfUpload(!IfUpload);
  // const [IfShowLogin, setIfShowLogin] = useState(true);
  // const toggleShowLogin = () => setIfShowLogin(!IfShowLogin);

  console.log(userInfo)
  if(userInfo.email && userInfo.username){
    if(ProfileStatus() === 'true'){
      console.log(ProfileStatus());
      return ( <UploadProfile /> )
    }else{
      console.log(ProfileStatus());
      return ( <NormalPageLayout /> )
    }
  }else{
    removeProfile()
    return (
      // <Authorization toggleIfUpload={toggleIfUpload}/>
      <Authorization />
    )
  }
}

export default App;
