import React from "react";
import TermsAndPrivacyPolicyLink from "../../termsAndPrivacyPolicy/TermsAndPrivacyPolicyLink";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import {
  PRIVACY_POLICY_ROUTE,
  TERMS_AND_CONDITIONS_ROUTE,
} from "../../../constants/routes";

describe("AppColorScheme snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui and press privacy-policy-button", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <TermsAndPrivacyPolicyLink navigate={navigate} />
    );

    fireEvent.press(getByTestId("privacy-policy-button"));
    expect(navigate).toHaveBeenCalledWith(PRIVACY_POLICY_ROUTE);

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui and press terms-and-condition-button", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <TermsAndPrivacyPolicyLink navigate={navigate} />
    );

    fireEvent.press(getByTestId("terms-and-condition-button"));
    expect(navigate).toHaveBeenCalledWith(TERMS_AND_CONDITIONS_ROUTE);

    expect(toJSON()).toMatchSnapshot();
  });
});
