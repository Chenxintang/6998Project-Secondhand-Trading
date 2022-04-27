import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";

import Topbar from "../components/Topbar";
import Search from "../pages/Search"
import Auction from "../pages/Auction"
import Publish from "../pages/Publish"
import Chatbox from "../pages/Chatbox"
import History from "../pages/History"

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Routes>
      <Route path="/" element={<Search/>} />
      <Route path="/publish" element={<Publish/>} />
      <Route path="/auction" element={<Auction/>} />
      <Route path="/chatbox" element={<Chatbox/>} />
      <Route path="/history" element={<History/>} />
      {/* <Route path="/Home-1" element={<Home-1/>} />
      <Route path="/Home-2" element={<Home-2/>} />
      <Route path="/Home-3" element={<Home-3/>} />
      <Route path="/Page-1" element={<Page-1/>} />
      <Route path="/Page-2" element={<Page-2/>} />
      <Route path="/page-1" element={<page-1/>} />
      <Route path="/page-2" element={<page-2/>} />
      <Route path="/page-3" element={<page-3/>} />
      <Route path="/page-4" element={<page-4/>} /> */}
    </Routes>
    {/* <Switch>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/about" component={() => "About"} />
      <Route exact path="/Pages" component={() => "Pages"} />
      <Route exact path="/faq" component={() => "FAQ"} />
      <Route exact path="/contact" component={() => "Contact"} />
      <Route exact path="/Home-1" component={() => "Home-1"} />
      <Route exact path="/Home-2" component={() => "Home-2"} />
      <Route exact path="/Home-3" component={() => "Home-3"} />
      <Route exact path="/Page-1" component={() => "Page-1"} />
      <Route exact path="/Page-2" component={() => "Page-2"} />
      <Route exact path="/page-1" component={() => "page-1"} />
      <Route exact path="/page-2" component={() => "page-2"} />
      <Route exact path="/page-3" component={() => "page-3"} />
      <Route exact path="/page-4" component={() => "page-4"} />
    </Switch> */}
  </Container>
);

export default Content;