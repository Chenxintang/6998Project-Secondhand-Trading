import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route, useParams } from "react-router-dom";

import Topbar from "../components/Topbar";
import Search from "../pages/Search"
import Mine from "./Mine"
import Publish from "../pages/Publish"
import Wishlist from "./Wishlist"
import Product from "./Product";


function Content (props){
  // const [searchQuery, setSearchQuery] = React.useState('');
  // const [productContent, setProductContent] = React.useState(product_dataset);
  // const [Query, setQuery] = React.useState('');
  
  // React.useEffect(() => {
  //   if(searchQuery){
  //     console.log("change of search query, do search request", searchQuery);
  //     // api search -------------------------------
  //     // setProductContent(search_result);
  //     setQuery(searchQuery);
  //   }
  // }, [searchQuery]);
  
  return (
    <Container fluid className={classNames("content", { "is-open": props.sidebarIsOpen })}>
    {/* <Container fluid> */}
      {/* <Topbar toggleSidebar={props.toggleSidebar} Search={setSearchQuery} avatar={props.recommend_data.Avatar}/> */}
      <Topbar toggleSidebar={props.toggleSidebar}/>
      <Routes>
        {/* <Route path="/" element={<Search Query = {Query} recommend_data={props.recommend_data.Data}/>} /> */}
        <Route path="/" element={<Search recommend_data={props.recommend_data}/>} />
        <Route path="/publish" element={<Publish/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/mine" element={<Mine/>} />
        <Route path="/product/:id" element={<Product/>} />
      </Routes>
    </Container>
  // </div>
)
};

// function GetProductId() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let product_id = useParams();
//   return (
//     <Product id={product_id}/>
//   );
// }

export default Content;