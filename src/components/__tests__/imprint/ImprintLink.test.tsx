import React from "react";
import ImprintLink from "../../imprint/ImprintLink";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

describe("ImprintLink snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when imprint", () => {
    const navigation = jest.fn();

    const { toJSON, getByTestId } = render(
      <ImprintLink navigate={navigation} />
    );
    fireEvent.press(getByTestId("imprint-button"));
    expect(navigation).toHaveBeenCalledWith("Imprint");
    expect(toJSON()).toMatchSnapshot();
  });
});
