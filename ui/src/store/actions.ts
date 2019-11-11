import { RedisCommandAndParameters } from "../types";

export const ADD_COMMAND = "ADD_COMMAND";
export const REMOVE_COMMAND = "REMOVE_COMMAND";
export const UPDATE_COMMAND = "UPDATE_COMMAND";

export type CommandsActions =
  | AddCommandAction
  | RemoveCommandAction
  | UpdateCommandAction;

interface AddCommandAction {
  type: typeof ADD_COMMAND;
  command: RedisCommandAndParameters;
}

export function addCommand(
  command: RedisCommandAndParameters
): CommandsActions {
  return { type: ADD_COMMAND, command };
}

interface RemoveCommandAction {
  type: typeof REMOVE_COMMAND;
  id: string;
}

export function removeCommand(id: string): CommandsActions {
  return { type: REMOVE_COMMAND, id };
}

interface UpdateCommandAction {
  type: typeof UPDATE_COMMAND;
  command: RedisCommandAndParameters;
}

export function updateCommand(
  command: RedisCommandAndParameters
): CommandsActions {
  return { type: UPDATE_COMMAND, command };
}
