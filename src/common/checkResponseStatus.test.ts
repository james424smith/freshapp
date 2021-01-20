import { checkResponseStatus } from "./checkResponseStatus";

describe("test checkResponseStatus", () => {
  it("should return empty array when the status is 404", () => {
    const error = {
      status: 404,
    };
    expect(checkResponseStatus(error)).toStrictEqual([]);
  });
  it("should return error when the status is 403", () => {
    const error = {
      status: 403,
    };

    try {
      checkResponseStatus(error);
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
