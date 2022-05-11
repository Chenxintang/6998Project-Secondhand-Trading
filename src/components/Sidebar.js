import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faSquarePlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";

import '../styles/Sidebar.css';

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
    Id: 'a',
    Image: 'https://picsum.photos/256/186',
    Title: 'Retro style feather necklace',
    Location: "New York, NY",
    Price: "12"
  },
  {
    Id: 'b',
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
  "ProtraitURL": "https://s3.amazonaws.com/portrait/photo1.jpg",
  "SellProductID": [
      {"Id": "a",
      "Image": "https://picsum.photos/256/186",
      "Title": "Retro style feather necklace",
      "Location": "New York, NY",
      "Price": "12"},
      {"Id": "b",
      "Image": "https://picsum.photos/256/180",
      "Title": "Retro style feather necklace",
      "Location": "New York, NY",
      "Price": "10"}
  ],
  "BoughtProductID": [
    {"Id": "c",
    "Image": "https://picsum.photos/256/186",
    "Title": "Retro style feather necklac",
    "Location": "New York, NY",
    "Price": "12"},
    {"Id": "d",
    "Image": "https://picsum.photos/256/180",
    "Title": "Retro style feather necklace",
    "Location": "New York, NY",
    "Price": "10"}
  ]
}
function SideBar ({ isOpen, toggle }){
  const navigate = useNavigate();
  const clickMain = (e) => {
    console.log('navigate to mainpage from side bar')
    // api request to get recommendation
    navigate('/', {state: {sidebar: product_dataset, query: ''} });
    // window.location.href = '/';
  }
  const clickMine = () => {
    console.log('navigate to mine from side bar')
    // api request to get user dataset
    navigate('/mine', {state: {sidebar: sampleItem} });
  }
  const clickWishlist = () => {
    console.log('navigate to wishlist from side bar')
    // api request to get user wishlist
    navigate('/wishlist', {state: {sidebar: temp_wishlist} });
  }
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <p className="sidebar_name">Secondhand<br/><span style={{paddingLeft: "60px"}}>Trading</span></p>
        <img className="sidebar_logo" src="sidebar-logo.png"/>
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
