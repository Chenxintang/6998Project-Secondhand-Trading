import './App.css';
import React, { useState } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {LoginUser, ProfileStatus, removeProfile} from  './components/Cookie';
import NormalPageLayout from './pages/NormalPageLayout';
import Authorization from './components/Authorization';
import UploadProfile from './pages/UploadProfile';

const product_dataset = {
  Avatar: 's3://portrait/IMG_4576(20200321-223824) (2).JPG',
  Data: [
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
    {"Id": "2", "Img": "https://picsum.photos/256/186", "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
    {"Id": "3", "Img": "https://picsum.photos/256/186", "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
    {"Id": "4", "Img": "https://picsum.photos/256/186", "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
    {"Id": "5", "Img": "https://picsum.photos/256/186", "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
    {"Id": "6", "Img": "https://picsum.photos/256/186", "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
    {"Id": "7", "Img": "https://picsum.photos/256/186", "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
    {"Id": "8", "Img": "https://picsum.photos/256/186", "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
  ]
}
const searchURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/search"

function App() {
  const userInfo = LoginUser();
  // const getRecommendationAPI = async () => {
  //   var URL = searchURL + `?q=${type}_${key}`;
  //   console.log("send search request to url", URL);
  //   var response = await fetch(URL);
  //   var data = await response.json();
  //   console.log(data);
  //   setProductInfo(data);
  //   setSearchKey(key);
  // }
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
      // api request recommendation and user avatar
      
      var recommend_data = product_dataset
      console.log("get recommendation data from api when login")
      return ( <NormalPageLayout recommend_data={recommend_data}/> )
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
