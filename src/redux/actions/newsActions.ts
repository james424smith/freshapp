import {
  GET_ALL_NEWS,
  GET_ALL_NEWS_FAIL,
  GET_ALL_NEWS_SUCCESS,
  SET_REFRESHING_NEWS,
} from "../constants";
import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  News,
} from "../../interfaces/";

export function getAllNews(): InitialisedSagaCall {
  return { type: GET_ALL_NEWS };
}

export const getAllNewsSuccess = (news: News): SuccessAction<News> => ({
  type: GET_ALL_NEWS_SUCCESS,
  payload: news,
});

export const setRefreshingNews = (
  isLoading: boolean
): SuccessAction<boolean> => ({
  type: SET_REFRESHING_NEWS,
  payload: isLoading,
});

export const getAllNewsFailed = (error: any): FailedAction => ({
  type: GET_ALL_NEWS_FAIL,
  error,
});
