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

const product_dataset = {
  "homepage": {
    "1": {"Id": "1", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"}, 
    // "1": {
    //   "Id": "1", 
    //   "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], 
    //   "Title": "Retro style feather necklace", 
    //   "Price": "12", 
    //   "Location": "New York, NY",
    //   "Tags": ["cloth", "women", "dress"],
    //   "OriginalPrice": "30",
    //   "Condition": "New", // new, used, refurbished, open box, for part or not working
    //   "Brand": "Zara",
    //   "Description": "Product Description......"
    // }, 
    "2": {"Id": "2", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
    "3": {"Id": "3", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
    "4": {"Id": "4", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
    "5": {"Id": "5", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
    "6": {"Id": "6", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
    "7": {"Id": "7", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Free Citibike", "Price": "40", "Location": "New York, NY"},
    "8": {"Id": "8", "Img": ["https://picsum.photos/256/186", "https://picsum.photos/256/187", "https://picsum.photos/256/188"], "Title": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
  },
  "Women's Cloth": {
    "1": {"Id": "9", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth1", "Price": "12", "Location": "New York, NY"},
    "2": {"Id": "10", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth2", "Price": "600", "Location": "New York, NY"}, 
    "3": {"Id": "11", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth3", "Price": "40", "Location": "Yonkers, NY"},
    "4": {"Id": "12", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth4", "Price": "100", "Location": "New York, NY"},
    "5": {"Id": "13", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth5", "Price": "20", "Location": "Queens, NY"},
    "6": {"Id": "14", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth6", "Price": "240", "Location": "Queens, NY"},
    "7": {"Id": "15", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth7", "Price": "40", "Location": "New York, NY"},
    "8": {"Id": "16", "Img": "https://picsum.photos/256/186", "Title": "Women's Cloth8", "Price": "50", "Location": "New York, NY"},
  },
  "Men's Cloth": {
    "1": {"Id": "17", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth1", "Price": "12", "Location": "New York, NY"},
    "2": {"Id": "18", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth2", "Price": "600", "Location": "New York, NY"}, 
    "3": {"Id": "19", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth3", "Price": "40", "Location": "Yonkers, NY"},
    "4": {"Id": "20", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth4", "Price": "100", "Location": "New York, NY"},
    "5": {"Id": "21", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth5", "Price": "20", "Location": "Queens, NY"},
    "6": {"Id": "22", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth6", "Price": "240", "Location": "Queens, NY"},
    "7": {"Id": "23", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth7", "Price": "40", "Location": "New York, NY"},
    "8": {"Id": "24", "Img": "https://picsum.photos/256/186", "Title": "Men's Cloth8", "Price": "50", "Location": "New York, NY"},
  }
}

class Search extends React.Component {
  constructor(props){
    super(props);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      product_info: product_dataset['homepage']
    };
  }
  
  toggle1 = () => {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1,
    });
  };
  toggle2 = () => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
    });
  };
  toggle3 = () => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
    });
  };

  updateProduct = (e) =>{
    console.log(e.target.dataset.genre)
    this.setState({product_info: product_dataset[e.target.dataset.genre]})
  }

  render(){
   

    return (
      <div>
        <Nav tabs>
        <Dropdown nav active isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
          <DropdownToggle nav className="dropdown_tab"> Cloth </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.updateProduct} data-genre="Women's Cloth"> Women's Cloth </DropdownItem>
            <DropdownItem onClick={this.updateProduct} data-genre="Men's Cloth"> Men's Cloth </DropdownItem>
            <DropdownItem> Shoes </DropdownItem>
            <DropdownItem> Pajamas </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown nav isOpen={this.state.dropdownOpen2} toggle={this.toggle2} >
          <DropdownToggle nav className="dropdown_tab"> Electronics </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> Phones </DropdownItem>
            <DropdownItem> Computers </DropdownItem>
            <DropdownItem> Games </DropdownItem>
            <DropdownItem> Pajamas </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown nav isOpen={this.state.dropdownOpen3} toggle={this.toggle3} >
          <DropdownToggle nav className="dropdown_tab"> Accessories </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> Necklace </DropdownItem>
            <DropdownItem> Rings </DropdownItem>
            <DropdownItem> Bags </DropdownItem>
            <DropdownItem> Daily </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </Nav>
        <Productwindow product_info={this.state.product_info}/>
      </div>
    );
  }
};

export default Search;