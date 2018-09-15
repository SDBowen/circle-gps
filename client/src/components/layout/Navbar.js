import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
