import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
