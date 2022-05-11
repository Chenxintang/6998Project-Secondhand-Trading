import './App.css';
import React, { useState } from "react";
import { Routes, Route, Router, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {LoginUser, ProfileStatus, removeProfile, SaveAvatar} from  './components/Cookie';
import NormalPageLayout from './pages/NormalPageLayout';
import Authorization from './components/Authorization';
import UploadProfile from './pages/UploadProfile';

const searchURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/search"

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
      // setIfGetRecommend(true)
      // api request recommendation and user avatar------------------- loginURL
      // var result = await getRecommend(userInfo.email);
      // var recommend_data = product_dataset
      // console.log("get recommendation data from api when login")
      // SaveAvatar(recommend_data.Avatar)
      return ( <NormalPageLayout /> )
      //   <div>
      //     {/* <NormalPageLayout recommend_data={recommend_data.Data}/> */}
          
      //   </div>
      // )
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
