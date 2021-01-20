import {
  CLEAR_ALL_STATE,
  GET_ASSIGNMENT_DETAILS_FAIL,
  GET_ASSIGNMENT_DETAILS_SUCCESS,
  SET_REFRESHING_ASSIGNMENT_DETAILS,
} from "../constants";
import {
  Assignment,
  SuccessAction,
  FailedAction,
  InitialisedSagaCall,
} from "../../interfaces";

export interface AssignmentDetailsState {
  assignmentDetails: Assignment[];
  loader: boolean;
}

export const defaultState: AssignmentDetailsState = {
  assignmentDetails: [],
  loader: false,
};

export default (
  state: AssignmentDetailsState = defaultState,
  action:
    | InitialisedSagaCall
    | SuccessAction<Assignment[] | boolean>
    | FailedAction
) => {
  switch (action.type) {
    case GET_ASSIGNMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        assignmentDetails: action.payload,
      };
    case GET_ASSIGNMENT_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    case SET_REFRESHING_ASSIGNMENT_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
