import React from "react";
import {
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const product_dataset = {
    "1": {"Id": "1", "Img": "https://picsum.photos/256/186", "Name": "Retro style feather necklace", "Price": "12", "Location": "New York, NY"},
    "2": {"Id": "2", "Img": "https://picsum.photos/256/186", "Name": "Ps5 for Sale Brand New", "Price": "600", "Location": "New York, NY"}, 
    "3": {"Id": "3", "Img": "https://picsum.photos/256/186", "Name": "Children's Book", "Price": "40", "Location": "Yonkers, NY"},
    "4": {"Id": "4", "Img": "https://picsum.photos/256/186", "Name": "Powerfull Bissel 3750W", "Price": "100", "Location": "New York, NY"},
    "5": {"Id": "5", "Img": "https://picsum.photos/256/186", "Name": "Google Stadia Contorller", "Price": "20", "Location": "Queens, NY"},
    "6": {"Id": "6", "Img": "https://picsum.photos/256/186", "Name": "Spectra Synergy Double", "Price": "240", "Location": "Queens, NY"},
    "7": {"Id": "7", "Img": "https://picsum.photos/256/186", "Name": "Free Citibike", "Price": "40", "Location": "New York, NY"},
    "8": {"Id": "8", "Img": "https://picsum.photos/256/186", "Name": "Airpods 3 Pro", "Price": "50", "Location": "New York, NY"},
    "9": {"Id": "9", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth1", "Price": "12", "Location": "New York, NY"},
    "10": {"Id": "10", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth2", "Price": "600", "Location": "New York, NY"}, 
    "11": {"Id": "11", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth3", "Price": "40", "Location": "Yonkers, NY"},
    "12": {"Id": "12", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth4", "Price": "100", "Location": "New York, NY"},
    "13": {"Id": "13", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth5", "Price": "20", "Location": "Queens, NY"},
    "14": {"Id": "14", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth6", "Price": "240", "Location": "Queens, NY"},
    "15": {"Id": "15", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth7", "Price": "40", "Location": "New York, NY"},
    "16": {"Id": "16", "Img": "https://picsum.photos/256/186", "Name": "Women's Cloth8", "Price": "50", "Location": "New York, NY"},
    "17": {"Id": "17", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth1", "Price": "12", "Location": "New York, NY"},
    "18": {"Id": "18", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth2", "Price": "600", "Location": "New York, NY"}, 
    "19": {"Id": "19", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth3", "Price": "40", "Location": "Yonkers, NY"},
    "20": {"Id": "20", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth4", "Price": "100", "Location": "New York, NY"},
    "21": {"Id": "21", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth5", "Price": "20", "Location": "Queens, NY"},
    "22": {"Id": "22", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth6", "Price": "240", "Location": "Queens, NY"},
    "23": {"Id": "23", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth7", "Price": "40", "Location": "New York, NY"},
    "24": {"Id": "24", "Img": "https://picsum.photos/256/186", "Name": "Men's Cloth8", "Price": "50", "Location": "New York, NY"}
}
function Product(){
  const product_id = useParams()['id'] ;
  console.log(product_id);
  return (
    // <ProductDetail id={product_id}/>
    <div>
      <p>{product_id}</p>
    </div>
  )
}

// class ProductDetail extends React.Component {
//   constructor(props){
//     super(props);
//     // this.toggle1 = this.toggle1.bind(this);
//     this.state = {
//       // dropdownOpen1: false,
//     };
//   }

//   render(){
//     console.log("from productdetail: ", this.props.id)
//     return (
//       <div>
//         <p>Product Id is {this.props.id}</p>
//       </div>
//     );
//   }
// };

export default Product;