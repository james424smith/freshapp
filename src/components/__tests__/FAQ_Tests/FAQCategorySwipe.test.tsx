import React from "react";
import {
  render,
  cleanup,
  RenderAPI,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import FAQScreen from "../../../screens/FAQScreen";
import "react-native-gesture-handler/Swipeable";
import "@testing-library/jest-native/extend-expect";
import Amplify, { Analytics } from "aws-amplify";
import * as RNN from "@react-navigation/native";
import { light } from "../../../constants/styles/colors";

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

describe("FAQ Screen UI test", () => {
  let wrapper: Promise<RenderAPI>;

  beforeEach(() => {
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    wrapper = waitFor(() => render(<FAQScreen />));
    jest.mock("react-native-gesture-handler/Swipeable", () => {
      return {
        useSwipeable: jest.fn(),
        Swipeable: jest.fn(),
      };
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render the screen as FAQScreen UI", async () => {
    expect((await wrapper).toJSON()).toMatchSnapshot();
  });

  it("Should defined Tab0", async () => {
    const wrapperComponent = (await wrapper).getByText("Registration");
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined Tab1", async () => {
    const wrapperComponent = (await wrapper).getByText("Login and Password");
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined Tab2", async () => {
    const wrapperComponent = (await wrapper).getByText("Personal Information");
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined Tab3", async () => {
    const wrapperComponent = (await wrapper).getByText("Assignment");
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined Tab4", async () => {
    const wrapperComponent = (await wrapper).getByText("Technical");
    expect(wrapperComponent).toBeDefined();
  });

  it("Should defined Tab0, when clicked", async () => {
    const spy = jest.spyOn(RNN, "useTheme").mockImplementation(() => light);
    const TabButton = (await wrapper).getByTestId("tab1");
    const wrapperComponent = (await wrapper).getByText("Registration");
    expect(wrapperComponent.props.style[1].color).toBe("#FFFFFF");
    fireEvent.press(TabButton);
    expect(wrapperComponent.props.style[1].color).toBe("#8FAABF");
    spy.mockRestore();
  });

  it("Should defined Tab1, when clicked", async () => {
    const spy = jest.spyOn(RNN, "useTheme").mockImplementation(() => light);
    const TabButton = (await wrapper).getByTestId("tab1");
    const wrapperComponent = (await wrapper).getByText("Login and Password");
    expect(wrapperComponent.props.style[1].color).toBe("#8FAABF");
    fireEvent.press(TabButton);
    expect(wrapperComponent.props.style[1].color).toBe("#FFFFFF");
    spy.mockRestore();
  });

  it("Should defined Tab2, when clicked", async () => {
    const spy = jest.spyOn(RNN, "useTheme").mockImplementation(() => light);
    const TabButton = (await wrapper).getByTestId("tab2");
    const wrapperComponent = (await wrapper).getByText("Personal Information");
    expect(wrapperComponent.props.style[1].color).toBe("#8FAABF");
    fireEvent.press(TabButton);
    expect(wrapperComponent.props.style[1].color).toBe("#FFFFFF");
    spy.mockRestore();
  });

  it("Should defined Tab3, when clicked", async () => {
    const spy = jest.spyOn(RNN, "useTheme").mockImplementation(() => light);
    const TabButton = (await wrapper).getByTestId("tab3");
    const wrapperComponent = (await wrapper).getByText("Assignment");
    expect(wrapperComponent.props.style[1].color).toBe("#8FAABF");
    fireEvent.press(TabButton);
    expect(wrapperComponent.props.style[1].color).toBe("#FFFFFF");
    spy.mockRestore();
  });

  it("Should defined Tab4, when clicked", async () => {
    const spy = jest.spyOn(RNN, "useTheme").mockImplementation(() => light);
    const TabButton = (await wrapper).getByTestId("tab4");
    const wrapperComponent = (await wrapper).getByText("Technical");
    expect(wrapperComponent.props.style[1].color).toBe("#8FAABF");
    fireEvent.press(TabButton);
    expect(wrapperComponent.props.style[1].color).toBe("#FFFFFF");
    spy.mockRestore();
  });
});
