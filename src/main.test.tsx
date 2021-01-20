import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react-native";
import * as RequestHelpers from "./common/request";
import DeviceInfo from "react-native-device-info";
import { Alert, Platform } from "react-native";
import { Analytics } from "aws-amplify";
import MainScreen from "./index";

describe("MainScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll((done) => {
    done();
  });

  it("should render MainScreen ", async () => {
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const { toJSON } = render(<MainScreen />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should throw alert when platform is ios and version does not match", async () => {
    Platform.OS = "ios";
    DeviceInfo.getVersion = jest.fn().mockReturnValue("1.3.0");
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({ data: { ios: "1.3.1" } });
    const spy2 = jest.spyOn(Alert, "alert");

    render(<MainScreen />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(1);
    });
    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should throw alert when platform is android and version does not match", async () => {
    Platform.OS = "android";
    DeviceInfo.getVersion = jest.fn().mockReturnValue("1.3.0");
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({ data: { android: "1.3.1" } });
    const spy2 = jest.spyOn(Alert, "alert");

    render(<MainScreen />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(1);
    });
    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should throw alert when platform is android and version does match", async () => {
    Platform.OS = "android";
    DeviceInfo.getVersion = jest.fn().mockReturnValue("1.3.1");
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({ data: { android: "1.3.1" } });
    const spy2 = jest.spyOn(Alert, "alert");

    render(<MainScreen />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(0);
    });
    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should throw alert when platform is ios and version does match", async () => {
    Platform.OS = "ios";
    DeviceInfo.getVersion = jest.fn().mockReturnValue("1.3.1");
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({ data: { android: "1.3.1" } });
    const spy2 = jest.spyOn(Alert, "alert");

    render(<MainScreen />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(0);
    });
    spy.mockRestore();
    spy2.mockRestore();
  });
});
