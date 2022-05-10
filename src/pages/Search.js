import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Productwindow from "../components/Productwindow";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/Search.css';

const product_dataset = {
  "0": {"Id": "1", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
  "1": {"Id": "2", "Img": "https://picsum.photos/256/186", "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
  "2": {"Id": "3", "Img": "https://picsum.photos/256/186", "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
  "3": {"Id": "4", "Img": "https://picsum.photos/256/186", "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
  "4": {"Id": "5", "Img": "https://picsum.photos/256/186", "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
  "5": {"Id": "6", "Img": "https://picsum.photos/256/186", "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
  "6": {"Id": "7", "Img": "https://picsum.photos/256/186", "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
  "7": {"Id": "8", "Img": "https://picsum.photos/256/186", "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
}
const search_result = {
  "0": {"Id": "1", "Img": "https://picsum.photos/256/186", "Title": "Retro style feather necklace2", "Price": "12", "Location": "New York, NY"}, 
  "1": {"Id": "2", "Img": "https://picsum.photos/256/186", "Title": "Ps5 for Sale Brand New2", "Price": "600", "Location": "New York, NY"}, 
  "2": {"Id": "3", "Img": "https://picsum.photos/256/186", "Title": "Children's Book2", "Price": "40", "Location": "Yonkers, NY"},
  "3": {"Id": "4", "Img": "https://picsum.photos/256/186", "Title": "Powerfull Bissel 3750W2", "Price": "100", "Location": "New York, NY"},
  "4": {"Id": "5", "Img": "https://picsum.photos/256/186", "Title": "Google Stadia Contorller2", "Price": "20", "Location": "Queens, NY"},
  "5": {"Id": "6", "Img": "https://picsum.photos/256/186", "Title": "Spectra Synergy Double2", "Price": "240", "Location": "Queens, NY"},
  "6": {"Id": "7", "Img": "https://picsum.photos/256/186", "Title": "Free Citibike2", "Price": "40", "Location": "New York, NY"},
  "7": {"Id": "8", "Img": "https://picsum.photos/256/186", "Title": "Airpods 3 Pro2", "Price": "50", "Location": "New York, NY"},
}
const searchURL = "https://9lyrg1tzpl.execute-api.us-east-1.amazonaws.com/dev/items/search"

const Search = (props) => {
  // component states definition
  const requestProductInfo = () => {
    if(props.Query){          // user search for something
      return search_result
    }else{              // normal entering, get recommendation
      return product_dataset
    }
  }
  
  const [categoryState, setcategoryState] = React.useState({
    'Clothing': false,
    'Sports': false,
    'Art': false,
    'Health': false,
    'Tickets': false,
    'Electronics': false,
    'Accessories': false,
    'Games': false,
    'Other': false
  })
  const [choseCategory, setchoseCategory] = React.useState('')
  const [productInfo, setProductInfo] = React.useState(requestProductInfo())
  const [searchKey, setSearchKey] = React.useState('Recommendation')

  //component react functions definition 
  React.useEffect(() => {
    if(choseCategory){
      console.log('chose category: ', choseCategory);
      searchRequestApi("category", choseCategory.trim());
    }
    // api get category data
    // setProductInfo(result)
  }, [choseCategory]);

  // React.useEffect(() => {           // refresh all product information
  //   console.log('change of props.productContent');
  //   setProductInfo(props.productContent);
  // }, [props.productContent]);

  React.useEffect(() => {           // refresh all product information
    if(props.Query){
      console.log('change of props.Query');
      // send search request ---------------------------------
      var search_key = props.Query.split(' ')[0];
      searchRequestApi("search", search_key)
    }
  }, [props.Query]);

  const selectProduct = (e) =>{
    var cate = e.target.text;
    console.log(cate);
    setchoseCategory(cate);
    setcategoryState({ ...categoryState, [cate]: true});
    // setProductInfo(product_dataset)
  }

  const searchRequestApi = async (type, key) => {
    var URL = searchURL + `?q=${type}_${key}`;
    console.log("send search request to url", URL);
    var response = await fetch(URL);
    var data = await response.json();
    console.log(data);
    setProductInfo(data);
    setSearchKey(key);
  }

  // requestProductInfo();

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink active={categoryState.Clothing} onClick={selectProduct} className="category_link"> Clothing </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Sports} onClick={selectProduct} className="category_link"> Sports </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Art} onClick={selectProduct} className="category_link"> Art </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Health} onClick={selectProduct} className="category_link"> Health </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Tickets} onClick={selectProduct} className="category_link"> Tickets </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Electronics} onClick={selectProduct} className="category_link"> Electronics </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Accessories} onClick={selectProduct} className="category_link"> Accessories </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState["Games"]} onClick={selectProduct} className="category_link"> Games </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={categoryState.Other} onClick={selectProduct} className="category_link"> Other </NavLink>
        </NavItem>
      </Nav>
      <Productwindow product_info={productInfo} search_key={searchKey}/>
    </div>
  );
}

export default Search;