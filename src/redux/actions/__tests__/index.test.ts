import { CLEAR_ALL_STATE } from "./../../constants/index";
import { clearAllState } from "../index";

describe("test the actions index file", () => {
  it("should sendCleanState event when called", () => {
    const expectedAction = {
      type: CLEAR_ALL_STATE,
    };

    expect(clearAllState()).toEqual(expectedAction);
  });
});
