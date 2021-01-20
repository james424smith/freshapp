import {
  CLEAR_ALL_STATE,
  GET_COVID_DOCUMENT_FAIL,
  GET_COVID_DOCUMENT_SUCCESS,
  SET_IS_LOADING_COVID,
} from "../constants/";
import {
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
} from "../../interfaces";

export interface CovidDocumentState {
  covidDocument: string;
  loader: boolean;
}

export const defaultState: CovidDocumentState = {
  covidDocument: "",
  loader: false,
};

export default (
  state: CovidDocumentState = defaultState,
  action: InitialisedSagaCall | FailedAction | SuccessAction<string | boolean>
) => {
  switch (action.type) {
    case SET_IS_LOADING_COVID:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_COVID_DOCUMENT_FAIL:
      return {
        ...state,
        loader: false,
      };
    case GET_COVID_DOCUMENT_SUCCESS:
      return {
        ...state,
        loader: false,
        covidDocument: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
