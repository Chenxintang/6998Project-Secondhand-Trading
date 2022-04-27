import React, {useState} from "react";
import {
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import '../styles/Search.css'


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
            product_info: {"1": "Sample1", "2": "Sample2", "3": "Sample3"}
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

    updateProduct = () =>{
        this.setState({product_info: {"1": "Sample2-1", "2": "Sample2-2", "3": "Sample2-3"}})
    }

    render(){
        return (
            <div>
               <Nav tabs>
                <Dropdown nav active isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                    <DropdownToggle nav className="dropdown_tab"> Cloth </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.updateProduct}> Women's Cloth </DropdownItem>
                        <DropdownItem> Men's Cloth </DropdownItem>
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
                <div>
                    <p>{this.state.product_info['1']}</p>
                    <p>{this.state.product_info['2']}</p>
                    <p>{this.state.product_info['3']}</p>
                </div>
            </div>
        );
    }
};

export default Search;