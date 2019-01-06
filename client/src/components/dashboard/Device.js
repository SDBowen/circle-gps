// //////////////////////////////////////////////////////////
// Review mockup when additonal device support is implemented
// //////////////////////////////////////////////////////////

import React from "react";

const Device = props => (
  <li className="side-nav__item">
    <a href="#" className="side-nav__link" onClick={props.selectDevice}>
      <span>{props.profile.deviceId}</span>
    </a>
  </li>
);
export default Device;
