import {
  CLEAR_ALL_STATE,
  GET_WORKING_CLOTHES_DETAILS_SUCCESS,
  GET_WORKING_CLOTHES_DETAILS_FAIL,
  SET_REFRESHING_WORKING_CLOTHES_DETAILS,
} from "../constants/";
import {
  WorkingClothes,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
} from "../../interfaces";

export interface WorkingClothesState {
  workingClothesDetails: WorkingClothes;
  loader: boolean;
}

export const defaultState: WorkingClothesState = {
  workingClothesDetails: {},
  loader: false,
};

export default (
  state: WorkingClothesState = defaultState,
  action:
    | InitialisedSagaCall
    | FailedAction
    | SuccessAction<WorkingClothes | boolean>
) => {
  switch (action.type) {
    case GET_WORKING_CLOTHES_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        workingClothesDetails: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    case SET_REFRESHING_WORKING_CLOTHES_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_WORKING_CLOTHES_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
