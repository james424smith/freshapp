import React from "react";
import PasswordValidationsSection from "../../authentication/PasswordValidationsSection";
import { render, cleanup } from "@testing-library/react-native";

describe("PasswordValidationsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when password matches the criterias", () => {
    const func = jest.fn();

    const { toJSON } = render(
      <PasswordValidationsSection
        password={"SomePassword543!"}
        setAllValid={func}
      />
    );

    expect(func).toHaveBeenCalledWith(true);
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when password doesn't match the criterias", () => {
    const func = jest.fn();

    const { toJSON } = render(
      <PasswordValidationsSection password={"123"} setAllValid={func} />
    );

    expect(func).toHaveBeenCalledWith(false);
    expect(toJSON()).toMatchSnapshot();
  });
});
