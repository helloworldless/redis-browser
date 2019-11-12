import { RedisCommandAndParameters } from "../types";
import {
  CommandsActions,
  ADD_COMMAND,
  REMOVE_COMMAND,
  UPDATE_COMMAND
} from "./actions";

export type CommandsState = ReadonlyArray<RedisCommandAndParameters>;

export const initialState: CommandsState = [];

export const reducer = (
  state: CommandsState,
  action: CommandsActions
): CommandsState => {
  switch (action.type) {
    case ADD_COMMAND:
      return [...state, action.command];
    case REMOVE_COMMAND:
      return state.filter(command => command.id !== action.id);
    case UPDATE_COMMAND:
      return state.map(command => {
        return command.id === action.command.id ? action.command : command;
      });
    default:
      return state;
  }
};
