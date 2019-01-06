// //////////////////////////////////////////////////////////
// Review mockup when additonal device support is implemented
// //////////////////////////////////////////////////////////

import React from "react";

const Device = props => (
  <li className="side-nav__item">
    <a href="#" className="side-nav__link">
      <span>{props.profile.deviceId}</span>
    </a>
  </li>
);
export default Device;

//         <div
//           key={index}
//           className={tab.active ? 'active item' : 'item'}
//           onClick={() => props.onClick(tab.id)}
//         >
//           {tab.title}
//         </div>
//       ))
//     }
//   </div>
// );
