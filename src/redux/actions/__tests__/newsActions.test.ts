import * as actions from "../newsActions";
import {
  GET_ALL_NEWS_FAIL,
  GET_ALL_NEWS,
  SET_REFRESHING_NEWS,
} from "../../constants";

describe("test action news", () => {
  it("should create an action to get news details", () => {
    const expectedAction = {
      type: GET_ALL_NEWS,
    };

    expect(actions.getAllNews()).toEqual(expectedAction);
  });

  it("should create an action to update refreshing status of news", () => {
    const expectedAction = {
      type: SET_REFRESHING_NEWS,
      payload: true,
    };

    expect(actions.setRefreshingNews(true)).toEqual(expectedAction);
  });
  it("should create an action to getAllNewsFailed", () => {
    const expectedAction = {
      type: GET_ALL_NEWS_FAIL,
      error: {},
    };

    expect(actions.getAllNewsFailed({})).toEqual(expectedAction);
  });
});
