import { SuccessAction } from "../../interfaces";
import { SET_DARK_MODE_OPTIONS } from "../constants";

export const setDarkModeOptions = (
  darkModeOptions: string
): SuccessAction<string> => {
  return {
    type: SET_DARK_MODE_OPTIONS,
    payload: darkModeOptions,
  };
};
