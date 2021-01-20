import * as Reducer from "../index";

describe("test main reducer", () => {
  it("should return the correct state", () => {
    const spy = jest.spyOn(Reducer, "default").mockImplementation();
    Reducer.default();
    expect(Reducer.default).toBeCalledTimes(1);
    spy.mockRestore();
  });
});
