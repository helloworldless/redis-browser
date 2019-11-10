import * as React from "react";
import { CommandContext } from "./App";
import StyleContext from "./StyleContext";
import { RedisCommand } from "./types";

function CommandAdder() {
  const { dispatch } = React.useContext(CommandContext);
  const { theme } = React.useContext(StyleContext);

  return (
    <section style={{ textAlign: "center", margin: "1rem" }}>
      {Object.values(RedisCommand).map(command => (
        <div key={command} style={{ display: "inline" }}>
          <button
            key={command}
            onClick={() => dispatch({ type: "addCommand", payload: command })}
            style={{
              backgroundColor: `${theme.dark.color.background.secondary}`,
              color: "rgb(109, 195, 250)",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            <h6>+ {command}</h6>
          </button>
        </div>
      ))}
    </section>
  );
}

export default CommandAdder;
