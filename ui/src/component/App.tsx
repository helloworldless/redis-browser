import React from "react";
import { createReducerContext } from "../store/ReducerContext";
import RedisBrowser from "./RedisBrowser";
import { reducer, initialState } from "../store/reducer";

const [ctx, CommandProvider] = createReducerContext(reducer, initialState);
export const CommandContext = ctx;

const App = () => {
  return (
    <CommandProvider>
      <RedisBrowser />
    </CommandProvider>
  );
};

export default App;
