import * as React from "react";

// https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052
export function createReducerContext<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState; // we never actually use this
  const ReducerContext = React.createContext({
    state: initialState,
    dispatch: defaultDispatch // just to mock out the dispatch type and make it not optioanl
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initialState);
    return <ReducerContext.Provider value={{ state, dispatch }} {...props} />;
  }
  return [ReducerContext, Provider] as const;
}
