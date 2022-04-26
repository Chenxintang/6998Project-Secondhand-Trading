import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SideBar from './components/Sidebar';
import Content from "./pages/Content";


function Hello(prop){
  return <h1>Hello {prop.name}</h1>
}


function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </Router>
  );
  // return (
  //   <div className="App">
  //     <Sidebar />
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <Hello name="Stacey"/>
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import SideBar from "./components/sidebar/SideBar";
// import Content from "./components/content/Content";
// import "./App.css";



// export default App;
