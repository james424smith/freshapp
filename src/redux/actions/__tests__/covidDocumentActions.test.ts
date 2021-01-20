import {
  GET_COVID_DOCUMENT,
  GET_COVID_DOCUMENT_FAIL,
  GET_COVID_DOCUMENT_SUCCESS,
  SET_IS_LOADING_COVID,
} from "../../constants/";
import * as actions from "../covidDocumentActions";

describe("test action covid document", () => {
  it("should create an action to get covid document", () => {
    const expectedAction = {
      type: GET_COVID_DOCUMENT,
    };

    expect(actions.getCovidDocument()).toEqual(expectedAction);
  });

  it("should create an action to get covid document success call", () => {
    const payload = "12345";
    const expectedAction = {
      type: GET_COVID_DOCUMENT_SUCCESS,
      payload,
    };

    expect(actions.getCovidDocumentSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to set refreshing contactDetails", () => {
    const isLoading = false;
    const expectedAction = {
      type: SET_IS_LOADING_COVID,
      payload: isLoading,
    };

    expect(actions.setIsLoadingCovid(isLoading)).toEqual(expectedAction);
  });
  it("should create an action to getCovidDocumentFailed", () => {
    const expectedAction = {
      type: GET_COVID_DOCUMENT_FAIL,
      error: {},
    };

    expect(actions.getCovidDocumentFailed({})).toEqual(expectedAction);
  });
});
