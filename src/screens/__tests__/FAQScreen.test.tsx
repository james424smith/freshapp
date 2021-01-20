import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import FAQScreen from "../FAQScreen";

import "@testing-library/jest-native/extend-expect";
import Amplify, { Analytics, Auth } from "aws-amplify";

Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
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
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("Should render the FAQScreen as UI when user is signed in", () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: 1234 });
    const { toJSON, getByTestId } = render(<FAQScreen />);

    fireEvent.changeText(getByTestId("faq-search"), "login");

    expect(toJSON()).toMatchSnapshot();
  });
  it("Should render the FAQScreen as UI when user is not signed in", () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);
    const { toJSON, getByTestId } = render(<FAQScreen />);

    fireEvent.changeText(
      getByTestId("faq-search"),
      "getByTestIdHow do I see the location of the vessel"
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("Should render the FAQScreen as UI when user is not signed in and no available search option", () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue(false);
    const { toJSON, getByTestId } = render(<FAQScreen />);

    fireEvent.changeText(
      getByTestId("faq-search"),
      "getByTestIdHow do I see the location of the vessel fasdsa"
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
