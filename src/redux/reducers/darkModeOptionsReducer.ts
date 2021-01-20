import { CLEAR_ALL_STATE, SET_DARK_MODE_OPTIONS } from "../constants/";
import { InitialisedSagaCall, SuccessAction } from "../../interfaces";

export interface DarkModeOptionsState {
  darkModeOptionsValue: string;
  loader: boolean;
}

export const defaultState: DarkModeOptionsState = {
  darkModeOptionsValue: "system",
  loader: false,
};

export default (
  state: DarkModeOptionsState = defaultState,
  action: InitialisedSagaCall | SuccessAction<string>
) => {
  switch (action.type) {
    case SET_DARK_MODE_OPTIONS:
      return {
        ...state,
        loader: false,
        darkModeOptionsValue: action.payload,
      };
    case CLEAR_ALL_STATE:
      return {
        ...defaultState,
        darkModeOptionsValue: state.darkModeOptionsValue,
      };
    default:
      return state;
  }
};
