// import '../App.css';
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {Spinner} from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import {GetAvatar, LoginUser, ProfileStatus, LogOut, SaveAvatar} from  '../components/Cookie';
import SideBar from "../components/Sidebar"
import Content from "./Content";

const product_dataset = {
  Avatar: 's3://portrait/IMG_4576(20200321-223824) (2).JPG',
  Data: [
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
    {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
    {"Id": "6", "Img": "https://picsum.photos/256/186", "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
    {"Id": "7", "Img": "https://picsum.photos/256/186", "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
    {"Id": "8", "Img": "https://picsum.photos/256/186", "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
  ]
}

const loginURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/login"

function NormalPageLayout(props) {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [productInfo, setProductInfo] = React.useState([]);

  React.useEffect(() => {
    // if(!GetAvatar().url){
      console.log('first time log in, in use effect recommend')
      fetchData(LoginUser().email);
    // }
    async function fetchData(userid) {
      
      console.log('get recommendation data from url', loginURL, userid);
      var response = await fetch(loginURL, {
        method: 'POST',
        headers: {
          // "X-Api-Key": 
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({UserId: userid})
      })
      var data = await response.json();
      console.log(data)
      setProductInfo(data.Data)
      SaveAvatar(data.Avatar)
      setIsLoaded(true)
    }
  }, []);

  return (
    <div>
      {isLoaded && (
        <Router>
          <div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} recommend_data={productInfo}/>
          </div>
        </Router>
      )}
      {!isLoaded && (
        <Spinner color="info" size=""> Loading... </Spinner>
        // <div> loading... </div>
      )}
    </div>
    
    // <Router>
    //   <div className="App wrapper">
    //     <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
    //     <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} recommend_data={product_dataset.Data}/>
    //   </div>
    // </Router>
    
  );
}

export default NormalPageLayout;
