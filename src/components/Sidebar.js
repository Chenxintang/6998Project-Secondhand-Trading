import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faSquarePlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";

import '../styles/Sidebar.css';
import { LoginUser } from "./Cookie";

const product_dataset = {
  "0": {"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
  "1": {"Id": "2", "Img": "https://picsum.photos/256/186", "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
  "2": {"Id": "3", "Img": "https://picsum.photos/256/186", "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
  "3": {"Id": "4", "Img": "https://picsum.photos/256/186", "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
  "4": {"Id": "5", "Img": "https://picsum.photos/256/186", "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
  "5": {"Id": "6", "Img": "https://picsum.photos/256/186", "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
  "6": {"Id": "7", "Img": "https://picsum.photos/256/186", "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
  "7": {"Id": "8", "Img": "https://picsum.photos/256/186", "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
}
const temp_wishlist = [
  {
    Id: '1652219337.5907838',
    Image: 'https://picsum.photos/256/186',
    Title: 'Retro style feather necklace',
    Location: "New York, NY",
    Price: "12"
  },
  {
    Id: '1652219337.5907838',
    Image: 'https://picsum.photos/256/186',
    Title: 'Schedule App',
    Location: "New York, NY",
    Price: '9'
  },
]
const sampleItem = {
  "Id": "ct2990@columbia.edu",
  "Name": "Chenxin",
  "Address": "2960 Broadway",
  "PhoneNumber": "6466666666",
  "PortraitURL": 'https://portrait.s3.amazonaws.com/IMG_4576(20200321-223824)+(2).JPG',
  "Gender": "female",
  "SellProductID": [
      {"Id": "1652219337.5907838",
      "Image": "https://picsum.photos/256/186",
      "Title": "Retro style feather necklace1",
      "Location": "New York, NY",
      "Price": "12"},
      {"Id": "1652219337.5907838",
      "Image": "https://picsum.photos/256/186",
      "Title": "Retro style feather necklace1",
      "Location": "New York, NY",
      "Price": "10"}
  ],
  "BoughtProductID": [
    {"Id": "1652219337.5907838",
    "Image": "https://picsum.photos/256/187",
    "Title": "Retro style feather necklac2",
    "Location": "New York, NY",
    "Price": "12"},
    {"Id": "1652219337.5907838",
    "Image": "https://picsum.photos/256/187",
    "Title": "Retro style feather necklace2",
    "Location": "New York, NY",
    "Price": "10"}
  ],
  "SoldProductID": [
    {"Id": "1652219337.5907838",
    "Image": "https://picsum.photos/256/188",
    "Title": "Retro style feather necklace3",
    "Location": "New York, NY",
    "Price": "12"},
    {"Id": "1652219337.5907838",
    "Image": "https://picsum.photos/256/188",
    "Title": "Retro style feather necklace3",
    "Location": "New York, NY",
    "Price": "10"}
  ],
}

const mineURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/profile/"
const loginURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/login"
const viewWishURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/user/view-liked/"

function SideBar ({ isOpen, toggle }){
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = React.useState(true)
  const clickMain = (e) => {
    console.log('navigate to mainpage from side bar')
    // api request to get recommendation----------------------
    // var product_recommendation = getRecommendation(LoginUser().email);
    // navigate('/', {state: {sidebar: product_dataset, query: ''} });
    navigate('/');
  }
  const clickMine = async () => {
    // api request to get user dataset
    var URL = mineURL + LoginUser().email;
    console.log('request user profile api to url', URL)
    setIsSpinner(false)
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data)
    console.log('navigate to mine from side bar')
    setIsSpinner(true)
    navigate('/mine', {state: {sidebar: data} });
  }
  
  const clickWishlist = async () => {
    // api request to get user wishlist
    var URL = viewWishURL + LoginUser().email;
    console.log('get wish list from url', URL);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    if(data.user_liked_products == "No such products."){
      var result = []
    }else{
      var result = data.user_liked_products
    }
    console.log('navigate to wishlist from product detail page')
    navigate('/wishlist', {state: {sidebar: result} });
  }

  async function getRecommendation(userid) {
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
    return (data.Data)
  }

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <p className="sidebar_name">Secondhand<br/><span style={{paddingLeft: "60px"}}>Trading</span></p>
        <img className="sidebar_logo" src="https://photo-6998.s3.amazonaws.com/sidebar-logo.png"/>
      </div>
      <div className="side-menu">
        <Nav fill vertical className="list-unstyled pb-3">
          <NavItem className="sidebar_item">
            <NavLink onClick={clickMain} className="sidebar_navlink">
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              Main
            </NavLink>
          </NavItem>
          <NavItem className="sidebar_item">
            <NavLink tag={Link} to={"/publish"}  className="sidebar_navlink">
              <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
              Publish
            </NavLink>
          </NavItem>
          <NavItem className="sidebar_item">
            <NavLink onClick={clickWishlist} className="sidebar_navlink">
              <FontAwesomeIcon icon={faCartShopping} className="mr-3" />
              Wishlist
            </NavLink>
          </NavItem>
          <NavItem className="sidebar_item">
            <NavLink onClick={clickMine} className="sidebar_navlink">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Mine
            </NavLink>
            <Spinner color="info" size="" hidden={isSpinner} > Loading... </Spinner>
          </NavItem>
        </Nav>
      </div>
    </div>
  )
};

// const submenus = [
//   [
//     {
//       title: "Home 1",
//       target: "Home-1",
//     },
//     {
//       title: "Home 2",
//       target: "Home-2",
//     },
//     {
//       itle: "Home 3",
//       target: "Home-3",
//     },
//   ],
//   [
//     {
//       title: "Page 1",
//       target: "Page-1",
//     },
//     {
//       title: "Page 2",
//       target: "Page-2",
//     },
//   ],
// ];

export default SideBar;
