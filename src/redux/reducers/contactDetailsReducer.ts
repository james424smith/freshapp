import {
  CLEAR_ALL_STATE,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  SET_REFRESHING_CONTACT_DETAILS,
} from "../constants";
import {
  Contact,
  SuccessAction,
  FailedAction,
  InitialisedSagaCall,
} from "../../interfaces";

export interface ContactDetailsState {
  contactDetails: Contact;
  loader: boolean;
}

export const defaultState: ContactDetailsState = {
  contactDetails: {
    manningAgent: {},
    crewingManager: { crewingManager: {} },
    portAgent: {},
  },
  loader: false,
};

export default (
  state: ContactDetailsState = defaultState,
  action: InitialisedSagaCall | SuccessAction<Contact | boolean> | FailedAction
) => {
  switch (action.type) {
    case GET_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        contactDetails: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    case SET_REFRESHING_CONTACT_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_CONTACT_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
