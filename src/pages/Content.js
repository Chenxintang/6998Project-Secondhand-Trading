import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route, useParams } from "react-router-dom";

import Topbar from "../components/Topbar";
import Search from "../pages/Search"
import Auction from "../pages/Auction"
import Publish from "../pages/Publish"
import Chatbox from "../pages/Chatbox"
import History from "../pages/History"
import Product from "../pages/Product"

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  // <div className={classNames("content", { "is-open": sidebarIsOpen })}>
    <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
    {/* <Container fluid> */}
      <Topbar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/publish" element={<Publish/>} />
        <Route path="/auction" element={<Auction/>} />
        <Route path="/chatbox" element={<Chatbox/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/product/:id" element={<Product/>} />
        {/* <Route path="/Home-2" element={<Home-2/>} />
        <Route path="/Home-3" element={<Home-3/>} />
        <Route path="/Page-1" element={<Page-1/>} />
        <Route path="/Page-2" element={<Page-2/>} />
        <Route path="/page-1" element={<page-1/>} />
        <Route path="/page-2" element={<page-2/>} />
        <Route path="/page-3" element={<page-3/>} />
        <Route path="/page-4" element={<page-4/>} /> */}
      </Routes>
    </Container>
  // </div>
  
  
);

// function GetProductId() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let product_id = useParams();
//   return (
//     <Product id={product_id}/>
//   );
// }

export default Content;