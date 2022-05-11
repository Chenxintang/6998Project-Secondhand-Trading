import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdSearch } from 'react-icons/md'; 
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai'
// import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  InputGroupText,
  Input,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { GetAvatar, LogOut } from "./Cookie";
import { LoginUser } from "./Cookie"
import Avatar from './Avatar';
import UserCard from './Usercard';
import '../styles/Topbar.css';

const Item = {
  "Id": "ct2990@columbia.edu",
  "Name": "Stacey",
  "Address": "2960 Broadway",
  "PhoneNumber": "6466666666",
  "ProtraitURL": "https://portrait.s3.amazonaws.com/staceyportrait",
  "Gender": "Female"
}
const result = [{"Id": "1652219337.5907838", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}]
const searchURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/search"

// class Topbar extends React.Component {
const Topbar = (props) => {
  const navigate = useNavigate();

  const [topbarIsOpen, setTopbarOpen] = useState(false);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  const [isOpenUserCardPopover, setUserCardPopover] = useState(false);
  const toggleUserCardPopover = () => setUserCardPopover(!isOpenUserCardPopover);
  const [searchQuery, setSearchQuery] = useState('');

  const [searchRange, setSearchRange] = useState('All');
  const changeSearchRange = (e) => {
    setSearchRange(e.target.innerHTML)
  }
  const clearInput = React.useRef();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }
  const clickSearch = async (e) => {
    // props.Search(searchQuery);
    clearInput.current.value = "";
    if(searchQuery){
      console.log('navigate to main from top bar - search')
      // api request to get user profile
      var search_data = await searchRequestApi("search", searchQuery)
      navigate('/', {state: {topbar: {key: searchQuery, data: search_data}} });
    }
  }
  // const clickProfile = () => {
  //   console.log('navigate to profile from top bar')
  //   // api request to get user profile----------------------
  //   navigate('/profile', {state: {topbar: Item} });
  // }
  const searchRequestApi = async (type, key) => {
    var URL = searchURL + `?q=${type}_${key}`;
    console.log("send search request to url", URL);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    return data
  }

  return (
    <div>
      <Navbar
        // color="light"
        // light
        className="navbar shadow-sm mb-1 bg-white p-0"
        expand="md"
      >
        <Button className="sidebar_btn" onClick={props.toggleSidebar}>
          ST
        </Button>
        <NavbarToggler onClick={toggleTopbar} />
        {/* <Collapse isOpen={topbarIsOpen} navbar> */}
          <Nav className="navbar_right" navbar>
            <NavItem className="search_nav_item">
              <InputGroup>
                {/* <UncontrolledButtonDropdown>
                  <InputGroupText>{searchRange}</InputGroupText>
                  <DropdownToggle split outline />
                  <DropdownMenu>
                    <DropdownItem header>Search Range</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={changeSearchRange} value="All">All</DropdownItem>
                    <DropdownItem onClick={changeSearchRange} value="Seller">Seller</DropdownItem>
                    <DropdownItem onClick={changeSearchRange} value="Product">Product</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown> */}
                <Input placeholder="Search.." onChange={handleChange} innerRef={clearInput}/>
                <Button color="secondary" onClick={clickSearch}>
                  <MdSearch size="25"/>
                </Button>
              </InputGroup>
            </NavItem>
          </Nav>
          <Nav className="navbar_right">
            {/* <NavItem>
              <NavLink to={"/search"} className="nav_icon">
                <AiOutlineShoppingCart size="25"/>
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink tag={Link} to={"/search"} className="nav_icon">
                <AiOutlineHeart size="25"/>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink id="Popover_user">
                <Avatar
                  onClick={toggleUserCardPopover}
                  className="can-click"
                  src={GetAvatar().url}
                />
              </NavLink>
              <Popover
                placement="bottom"
                isOpen={isOpenUserCardPopover}
                toggle={toggleUserCardPopover}
                target="Popover_user"
                className="border-0"
                style={{ minWidth: 200 }}
              >
                <PopoverBody className="p-0 border-light">
                  <UserCard
                    title={LoginUser().username}
                    text={LoginUser().email}
                    avatar={GetAvatar().url}
                    // text="Last updated 3 mins ago"
                    className="border-light"
                    avatarSize="60px"
                  >
                    <ListGroup flush>
                      {/* <ListGroupItem tag="button" action className="border-light">
                        <MdPersonPin /> Profile
                      </ListGroupItem>
                      <ListGroupItem tag="button" action className="border-light">
                        <MdInsertChart /> Stats
                      </ListGroupItem>
                      <ListGroupItem tag="button" action className="border-light">
                        <MdMessage /> Messages
                      </ListGroupItem>
                      <ListGroupItem tag="button" action className="border-light">
                        <MdSettingsApplications /> Settings
                      </ListGroupItem>
                      <ListGroupItem tag="button" action className="border-light">
                        <MdHelp /> Help
                      </ListGroupItem> */}
                      <ListGroupItem tag="button" action className="border-light" onClick={LogOut}>
                        <MdExitToApp /> Signout
                      </ListGroupItem>
                    </ListGroup>
                  </UserCard>
                </PopoverBody>
              </Popover>
            </NavItem>

          </Nav>
        {/* </Collapse> */}
      </Navbar>
    </div>
    
  );
};

export default Topbar;
