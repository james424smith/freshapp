import { CURRENT, NEXT } from "./assignmentConstants";

describe("assignmentConstants tests", () => {
  it("sjould return correct values", () => {
    expect(CURRENT).toBe("current");
    expect(NEXT).toBe("next");
  });
});
