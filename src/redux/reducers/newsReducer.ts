import {
  CLEAR_ALL_STATE,
  GET_ALL_NEWS_FAIL,
  GET_ALL_NEWS_SUCCESS,
  SET_REFRESHING_NEWS,
} from "../constants";
import {
  News,
  SuccessAction,
  FailedAction,
  InitialisedSagaCall,
} from "../../interfaces";

export interface NewsState {
  news?: News;
  loader: boolean;
}

export const defaultState: NewsState = {
  loader: false,
};

export default (
  state: NewsState = defaultState,
  action: InitialisedSagaCall | SuccessAction<News | boolean> | FailedAction
) => {
  switch (action.type) {
    case GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        loader: false,
        news: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    case SET_REFRESHING_NEWS:
      return {
        loader: true,
      };
    case GET_ALL_NEWS_FAIL:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
