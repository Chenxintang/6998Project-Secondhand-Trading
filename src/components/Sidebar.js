import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import '../styles/Sidebar.css';

const SideBar = ({ isOpen, toggle }) => (
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
        {/* <SubMenu title="Home" icon={faHome} items={submenus[0]} /> */}
        <NavItem>
          <NavLink tag={Link} to={"/about"} className="sidebar_navlink">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Search
          </NavLink>
        </NavItem>
        {/* <SubMenu title="Pages" icon={faCopy} items={submenus[1]} /> */}
        <NavItem>
          <NavLink tag={Link} to={"/pages"}  className="sidebar_navlink">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Publish
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}  className="sidebar_navlink">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            Auction
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}  className="sidebar_navlink">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Chat Box
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/pages"}  className="sidebar_navlink">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            View History
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

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
