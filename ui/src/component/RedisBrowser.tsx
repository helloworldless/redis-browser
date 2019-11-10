import React from "react";
import CommandRunner from "./CommandRunner";
import { CommandContext } from "./App";
import StyleContext from "./StyleContext";
import CommandAdder from "./CommandAdder";

const RedisBrowser: React.FC = () => {
  const { state } = React.useContext(CommandContext);
  const { theme } = React.useContext(StyleContext);
  return (
    <main
      style={{
        color: `${theme.dark.color.text.light}`
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: `${theme.dark.color.background.primary}`,
          padding: "1rem"
        }}
      >
        <h1 style={{ color: `${theme.dark.color.text.primary}` }}>
          Redis Browser
        </h1>
      </div>
      <CommandAdder />

      {state.map((command, i) => (
        <div
          key={command}
          style={{
            borderBottom: `${
              isNotLastIndex(state, i) ? `1px solid gray` : "none"
            }`
          }}
        >
          <CommandRunner key={i} command={command} />
        </div>
      ))}
    </main>
  );
};

function isLastIndex(arr: any[], i: number): boolean {
  return i === arr.length - 1;
}

function isNotLastIndex(arr: any[], i: number): boolean {
  return !isLastIndex(arr, i);
}

export default RedisBrowser;
