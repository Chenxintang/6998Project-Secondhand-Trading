import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaperPlane,
  faSquarePlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import '../styles/Sidebar.css';

function SideBar ({ isOpen, toggle }){
  const handleclick = (e) => {
    window.location.href = '/';
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
            <NavLink tag={Link} onClick={handleclick} to={''} className="sidebar_navlink">
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
            <NavLink tag={Link} to={"/wishlist"}  className="sidebar_navlink">
              <FontAwesomeIcon icon={faCartShopping} className="mr-3" />
              Wishlist
            </NavLink>
          </NavItem>
          <NavItem className="sidebar_item">
            <NavLink tag={Link} to={"/mine"}  className="sidebar_navlink">
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
