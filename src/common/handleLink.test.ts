import { Linking } from "react-native";
import { handleLink } from "./handleLink";

describe("test the handleLink action based on the parameters", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should open the url when the type is url and destination is defined", () => {
    handleLink("url", "https://www.google.com");
    expect(Linking.openURL).toBeCalledWith("https://www.google.com");
  });
  it("should open the url when the type is url and destination is undefined", () => {
    handleLink("url", "");
    expect(Linking.openURL).toBeCalledTimes(0);
  });

  it("should open the url when the type is crewcompanion and destination is defined", () => {
    handleLink("crewcompanion", "notification");
    expect(Linking.openURL).toBeCalledWith("crewcompanion://notification");
  });
  it("should open the url when the type is crewcompanion and destination is undefined", () => {
    handleLink("crewcompanion", "");
    expect(Linking.openURL).toBeCalledTimes(0);
  });

  it("should open the url when the type is not url and destination is undefined", () => {
    handleLink("tel:", "");
    expect(Linking.openURL).toBeCalledTimes(0);
  });
  it("should open the url when the type is not url and destination is defined", () => {
    handleLink("tel", "1234");
    expect(Linking.openURL).toBeCalledWith("tel:1234");
  });
});
