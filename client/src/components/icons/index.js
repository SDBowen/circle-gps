import React from "react";

import Cog from "./Cog";
import Lock from "./Lock";
import Target from "./Target";

const Icon = props => {
  switch (props.name) {
    case "cog":
      return <Cog {...props} />;
    case "lock":
      return <Lock {...props} />;
    case "target":
      return <Target {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
