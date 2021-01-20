import React from "react";
import PassCodeScreen from "../../authentication/PassCodeScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import AwsCustomStorage from "../../../common/AwsCustomStorage";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import FingerprintScanner from "react-native-fingerprint-scanner";
import AsyncStorage from "@react-native-community/async-storage";
Amplify.configure({
  aws_project_region: "eu-west-1",
  aws_cognito_identity_pool_id:
    "eu-west-1:0700dd4d-d3f1-47e8-aeca-c03a916aba97",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: "eu-west-1_VdCn6sWLK",
  aws_user_pools_web_client_id: "3uc4kul2beqktthivc578jutfm",
  oauth: {},
  aws_mobile_analytics_app_id: "33c953d8b8a04972904e65148ea64665",
  aws_mobile_analytics_app_region: "eu-west-1",
});
describe("AccountVerificationScreen snapshot test", () => {
  afterEach(async () => {
    cleanup();
    jest.clearAllMocks();
    await AwsCustomStorage.clear();
  });

  it("should render correct ui when biometric is unavailble and passcode matches", async () => {
    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue({});
    AsyncStorage.getItem = jest.fn().mockResolvedValue(undefined);
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    AwsCustomStorage.setItem(
      "1234",
      JSON.stringify({
        isUserSetPassCode: true,
        passcode: "1234",
      })
    );
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId, getAllByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );
    fireEvent.press(getAllByTestId("number-button")[0]);
    fireEvent.press(getByTestId("delete-button"));
    fireEvent.press(getAllByTestId("number-button")[1]);
    fireEvent.press(getAllByTestId("number-button")[2]);
    fireEvent.press(getAllByTestId("number-button")[3]);
    fireEvent.press(getAllByTestId("number-button")[4]);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui when biometric is unavailble and passcode is being set for the first time", async () => {
    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue({});
    AsyncStorage.getItem = jest.fn().mockResolvedValue(undefined);
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId, getAllByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );
    fireEvent.press(getAllByTestId("number-button")[0]);
    fireEvent.press(getByTestId("delete-button"));
    fireEvent.press(getAllByTestId("number-button")[1]);
    fireEvent.press(getAllByTestId("number-button")[2]);
    fireEvent.press(getAllByTestId("number-button")[3]);
    fireEvent.press(getAllByTestId("number-button")[4]);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui when biometric is unavailble and passcode doesn't match", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    AwsCustomStorage.setItem(
      "1234",
      JSON.stringify({
        isUserSetPassCode: true,
        passcode: "1234",
      })
    );
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId, getAllByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );

    fireEvent.press(getAllByTestId("number-button")[0]);
    fireEvent.press(getByTestId("delete-button"));
    fireEvent.press(getAllByTestId("number-button")[1]);
    fireEvent.press(getAllByTestId("number-button")[2]);
    fireEvent.press(getAllByTestId("number-button")[3]);
    fireEvent.press(getAllByTestId("number-button")[5]);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui when biometric is available and succeds", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    FingerprintScanner.isSensorAvailable = jest.fn().mockResolvedValue({});
    FingerprintScanner.authenticate = jest.fn().mockResolvedValue({});
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "biometrics" }));
    AwsCustomStorage.setItem(
      "1234",
      JSON.stringify({
        isUserSetPassCode: true,
        passcode: "1234",
      })
    );
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("biometric-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui when biometric is available and fails", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    FingerprintScanner.isSensorAvailable = jest.fn().mockResolvedValue({});
    FingerprintScanner.authenticate = jest.fn().mockRejectedValue({});
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "biometrics" }));
    AwsCustomStorage.setItem(
      "1234",
      JSON.stringify({
        isUserSetPassCode: true,
        passcode: "1234",
      })
    );
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("biometric-button"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui when pressing the forgot passcode", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    AwsCustomStorage.setItem(
      "1234",
      JSON.stringify({
        isUserSetPassCode: true,
        passcode: "1234",
      })
    );
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore({})}>
        <PassCodeScreen />
      </Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("forgot-password"));
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
