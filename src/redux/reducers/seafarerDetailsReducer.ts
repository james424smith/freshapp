import {
  CLEAR_ALL_STATE,
  GET_ALL_SEAFARER_DETAILS_FAIL,
  GET_ALL_SEAFARER_DETAILS_SUCCESS,
  SET_IS_LOADING_DATA,
  SET_REFRESHING_SEAFARER_DETAILS,
} from "../constants";
import {
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
  SeafarerDetails,
  Badges,
} from "../../interfaces";

export interface SeafarerDetailsState {
  seafarerDetails?: SeafarerDetails;
  seafarerBadgesDetails?: Badges;
  loader: boolean;
}

export const defaultState: SeafarerDetailsState = {
  loader: false,
};

export default (
  state: SeafarerDetailsState = defaultState,
  action:
    | InitialisedSagaCall
    | FailedAction
    | SuccessAction<SeafarerDetails | Badges | boolean>
): SeafarerDetailsState => {
  switch (action.type) {
    case SET_IS_LOADING_DATA:
    case SET_REFRESHING_SEAFARER_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_ALL_SEAFARER_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        seafarerDetails: action.payload.seafarerDetails,
        seafarerBadgesDetails: action.payload.seafarerBadgesDetails,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    case GET_ALL_SEAFARER_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
