import * as actions from "../seaServiceDetailsActions";
import api from "../../../api/seaServiceApi";
import {
  GET_SEA_SERVICE_DETAILS,
  GET_SEA_SERVICE_DETAILS_FAIL,
  GET_SEA_SERVICE_DETAILS_SUCCESS,
  SET_REFRESHING_SEA_SERVICE_DETAILS,
} from "../../constants";

describe("test action sea service", () => {
  it("should create an action to get sea service details", () => {
    const expectedAction = {
      type: GET_SEA_SERVICE_DETAILS,
    };

    expect(actions.getSeaServiceDetails()).toEqual(expectedAction);
  });
  it("should create an action for getSeaServiceDetailsFailed", () => {
    const expectedAction = {
      type: GET_SEA_SERVICE_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getSeaServiceDetailsFailed({})).toEqual(expectedAction);
  });
  it("should create an action for getSeaServiceDetailsSuccess", async () => {
    const data = (await api()).json();
    const expectedAction = {
      type: GET_SEA_SERVICE_DETAILS_SUCCESS,
      payload: data,
    };

    expect(actions.getSeaServiceDetailsSuccess(data)).toEqual(expectedAction);
  });
  it("should create an action for setRefreshingSeaServiceDetails", async () => {
    const expectedAction = {
      type: SET_REFRESHING_SEA_SERVICE_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingSeaServiceDetails(true)).toEqual(
      expectedAction
    );
  });
});
