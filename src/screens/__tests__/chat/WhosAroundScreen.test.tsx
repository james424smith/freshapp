import React from "react";
import WhosAroundScreen from "../../chat/WhosAroundScreen";
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Settings } from "luxon";
import MockDate from "mockdate";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CHAT_HISTORY_ROUTE } from "../../../constants/routes";

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

describe("WhosAroundScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when isOnline is true and platform is ios", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue("12345");
    Analytics.updateEndpoint = jest.fn().mockResolvedValue("12345");
    MockDate.set(1574237559000);

    Platform.OS = "ios";
    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        isOnline: true,
        onlineUntil: 1574237659000,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <WhosAroundScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("close-icon"));
    expect(useNavigation().navigate).toHaveBeenCalledWith(CHAT_HISTORY_ROUTE);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
  it("should render correct ui when isOnline is true and platform is adnroid", async () => {
    MockDate.set(1574237559000);

    Platform.OS = "android";
    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        isOnline: true,
        onlineUntil: 1574237659000,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <WhosAroundScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
});
