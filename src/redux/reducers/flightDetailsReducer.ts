import {
  CLEAR_ALL_STATE,
  GET_FLIGHTS_DETAILS_SUCCESS,
  GET_FLIGHTS_DETAILS_FAIL,
  SET_REFRESHING_FLIGHT_DETAILS,
} from "../constants/";
import {
  FlightData,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
  Flight,
} from "../../interfaces";

export interface FlightsDetailsState {
  flights: { flights: Flight[] };
  loader: boolean;
}

export const defaultState: FlightsDetailsState = {
  flights: { flights: [] },
  loader: false,
};

export default (
  state: FlightsDetailsState = defaultState,
  action:
    | InitialisedSagaCall
    | SuccessAction<FlightData | boolean>
    | FailedAction
) => {
  switch (action.type) {
    case GET_FLIGHTS_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        flights: action.payload,
      };
    case GET_FLIGHTS_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    case SET_REFRESHING_FLIGHT_DETAILS:
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
