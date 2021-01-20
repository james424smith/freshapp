import { waitFor } from "@testing-library/react-native";
import main from "./index";
describe("test store creation", () => {
  it("should create a proper store when dev is true", async () => {
    jest.useRealTimers();
    expect(await waitFor(() => main())).toBeTruthy();
  });
});
