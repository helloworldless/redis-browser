import React from "react";
import uuid from "uuid/v4";
import { CommandContext } from "./App";
import StyleContext from "./StyleContext";
import { RedisCommand } from "../types";
import { addCommand } from "../store/actions";
import { RedisCommandDescriptor, withEmptyValue } from "./CommandRunner";

function CommandAdder() {
  const { dispatch } = React.useContext(CommandContext);
  const { theme } = React.useContext(StyleContext);

  return (
    <section style={{ textAlign: "center", margin: "1rem" }}>
      {Object.values(RedisCommand).map((command: RedisCommand) => (
        <div key={command} style={{ display: "inline" }}>
          <button
            key={command}
            onClick={() => {
              dispatch(
                addCommand({
                  id: uuid(),
                  command,
                  parameters: RedisCommandDescriptor[command].parameters
                    .map(p => ({ key: p.key }))
                    .map(withEmptyValue)
                })
              );
            }}
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
