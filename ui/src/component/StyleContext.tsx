import * as React from "react";

const StyleContext = React.createContext({
  util: {
    unstyledButton: { border: "none", cursor: "pointer" }
  },
  theme: {
    dark: {
      color: {
        background: {
          primary: "rgb(33, 34, 36)",
          secondary: "rgb(25, 26, 27)"
        },
        text: {
          primary: "rgb(226, 0, 0)",
          secondary: "rgb(109, 195, 250)",
          light: "rgb(218, 213, 205)"
        }
      }
    }
  }
});

export default StyleContext;
