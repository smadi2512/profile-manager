import { ReactNode, useReducer } from "react";

type ToggleState = {
  on: boolean;
};

type ToggleAction =
  | { type: "TOGGLE" }
  | { type: "RESET" }
  | { type: "SET"; payload: boolean };

type ToggleStateReducer = (
  state: ToggleState,
  action: ToggleAction
) => ToggleState;

const defaultToggleReducer: ToggleStateReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { on: !state.on };
    case "RESET":
      return { on: false };
    case "SET":
      return { on: action.payload };
    default:
      return state;
  }
};

type ToggleProps = {
  children: (props: {
    on: boolean;
    toggle: () => void;
    reset: () => void;
    setOn: (value: boolean) => void;
  }) => ReactNode;
  initialOn?: boolean;
  reducer?: ToggleStateReducer;
};

export default function Toggle({
  children,
  initialOn = false,
  reducer = defaultToggleReducer,
}: ToggleProps) {
  const [state, dispatch] = useReducer(reducer, { on: initialOn });

  const toggle = () => dispatch({ type: "TOGGLE" });
  const reset = () => dispatch({ type: "RESET" });
  const setOn = (value: boolean) => dispatch({ type: "SET", payload: value });

  return children({ on: state.on, toggle, reset, setOn });
}
