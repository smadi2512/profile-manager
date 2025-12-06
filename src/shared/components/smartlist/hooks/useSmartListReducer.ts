import { useCallback, useReducer } from "react";
import {
  SmartListAction,
  SmartListState,
  defaultSmartListReducer,
} from "../reducer/smartListReducer";

export type StateReducerOverride = (
  state: SmartListState,
  action: SmartListAction,
  nextState: SmartListState
) => SmartListState;

export function useSmartListReducer(
  initialState: SmartListState,
  stateReducer?: StateReducerOverride
): [SmartListState, React.Dispatch<SmartListAction>] {
  const enhancedReducer = useCallback(
    (state: SmartListState, action: SmartListAction): SmartListState => {
      const nextState = defaultSmartListReducer(state, action);
      return stateReducer ? stateReducer(state, action, nextState) : nextState;
    },
    [stateReducer]
  );

  return useReducer(enhancedReducer, initialState);
}
