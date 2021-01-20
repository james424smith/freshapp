import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  RenderAPI,
  waitFor,
  within,
} from "@testing-library/react-native";
import ContactScreen from "../../more_screens/ContactScreen";
import Contact from "../../../../__mocks__/fake-data/contactApi.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import Amplify, { Analytics } from "aws-amplify";
import SwipeNavigator from "../..//more_screens/SwipeNavigatorScreen";
import imprintDetails from "../../../../__mocks__/fake-data/imprintDetails.json";
import news from "../../../../__mocks__/fake-data/news.json";
Analytics.updateEndpoint = jest.fn().mockResolvedValue("");

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

describe("ContactScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render ContactScreen when loader is false ", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render ContactScreen when loader is true ", () => {
    const mockedState = {
      contactDetails: {
        contactDetails: Contact,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ContactScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
});
describe("SwipeNavigatorScreen UI test", () => {
  let wrapper: RenderAPI;
  const mockedState = {
    imprintDetails: { imprintDetails },
    newsDetails: news,
  };

  const mockedStore = configureMockStore();
  beforeEach(() => {
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    wrapper = render(
      <Provider store={mockedStore(mockedState)}>
        <NavigationContainer>
          <SwipeNavigator />
        </NavigationContainer>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.autoMockOff();
  });

  it("Should render the screen as SwipeNavigator UI", async () => {
    expect((await waitFor(() => wrapper)).toJSON()).toMatchSnapshot();
  });

  it("should navigate to Signin screen when home button is clicked", async () => {
    const { getByTestId: wrapper2 } = await waitFor(() => {
      return within(wrapper.getByTestId("ImprintScreen"));
    });
    fireEvent.press(wrapper2("home-button"));
    expect(useNavigation().dispatch).toBeCalled();
  });
  it("Should defined ReadMoreScreen", async () => {
    const wrapperComponent = (await waitFor(() => wrapper)).getByTestId(
      "ReadMoreScreen"
    );
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined FAQScreen", async () => {
    const wrapperComponent = (await waitFor(() => wrapper)).getByTestId(
      "FAQScreen"
    );
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined SupportScreen", async () => {
    const wrapperComponent = (await waitFor(() => wrapper)).getByTestId(
      "SupportScreen"
    );
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined ImprintScreen", async () => {
    const wrapperComponent = (await waitFor(() => wrapper)).getByTestId(
      "ImprintScreen"
    );
    expect(wrapperComponent).toBeDefined();
  });
});
