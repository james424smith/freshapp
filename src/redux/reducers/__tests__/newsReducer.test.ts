import reducer, { defaultState } from "../newsReducer";
import {
  CLEAR_ALL_STATE,
  GET_ALL_NEWS_FAIL,
  GET_ALL_NEWS_SUCCESS,
  SET_REFRESHING_NEWS,
} from "../../constants";
import getAllNews from "../../../api/newsApi";

describe("Test News Reducer", () => {
  it("should return the current state", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should return the current state and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should return correct value when SET_REFRESHING_NEWS is called", () => {
    expect(
      reducer(defaultState, {
        type: SET_REFRESHING_NEWS,
        payload: true,
      })
    ).toEqual({ ...defaultState, loader: true });
  });

  it("should handle CLEAR ALL STATE", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_ALL_NEWS_SUCCESS action", () => {
    const mockNews = getAllNews();

    expect(
      reducer(
        { loader: true },
        {
          type: GET_ALL_NEWS_SUCCESS,
          payload: mockNews,
        }
      )
    ).toEqual({ ...defaultState, loader: false, news: mockNews });
  });

  it("should handle GET_ALL_NEWS_FAIL action", async () => {
    const mockNews = (await getAllNews()).json();

    expect(
      reducer(
        { loader: true, news: mockNews },
        {
          type: GET_ALL_NEWS_FAIL,
          payload: mockNews,
        }
      )
    ).toEqual({ ...defaultState, loader: false, news: mockNews });
  });
});
