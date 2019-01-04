import React from "react";

import Cog from "./Cog";
import Lock from "./Lock";

const Icon = props => {
  switch (props.name) {
    case "cog":
      return <Cog {...props} />;
    case "lock":
      return <Lock {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
