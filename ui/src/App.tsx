import * as React from "react";
import { createReducerContext } from "./ReducerContext";
import RedisBrowser from "./RedisBrowser";
import { RedisCommand } from "./types";

const ADD_COMMAND = "addCommand";
const REMOVE_COMMAND = "removeCommand";

type AppState = RedisCommand[];
type Action = {
  type: typeof ADD_COMMAND | typeof REMOVE_COMMAND;
  payload: RedisCommand;
};

const initialState: AppState = [];

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "addCommand":
      return [...state, action.payload];
    case "removeCommand":
      return state.filter(command => command !== action.payload);
    default:
      return state;
  }
};

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
