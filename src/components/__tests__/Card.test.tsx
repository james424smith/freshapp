import React from "react";
import Card from "../Card";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { dark, light } from "../../constants/styles/colors";
import { useTheme } from "@react-navigation/native";

describe("Card snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui when hasReadMore and screen are defined and click read-more-card-button", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <Card
        item={{ value: "SomeValue" }}
        navigate={navigate}
        title={"Some title"}
        description={"Some Description"}
        hasReadMore={true}
        screen={"Assignment"}
        summary={"Some summary"}
      />
    );

    fireEvent.press(getByTestId("read-more-card-button"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Assignment", {
      newItem: { value: "SomeValue" },
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when hasReadMore and screen are defined and click read-more-card-buttonand all styles are passed as props and useTheme returns light", () => {
    useTheme().colors = light.colors;
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <Card
        item={{ value: "SomeValue" }}
        navigate={navigate}
        title={"Some title"}
        description={"Some Description"}
        hasReadMore={true}
        screen={"Assignment"}
        summary={"Some summary"}
        containerStyles={{ backgroundColor: "red" }}
        descriptionStyle={{ backgroundColor: "red" }}
        titleStyles={{ color: "red" }}
      />
    );

    fireEvent.press(getByTestId("read-more-card-button"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Assignment", {
      newItem: { value: "SomeValue" },
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when hasReadMore and screen are defined and click read-more-card-buttonand all styles are passed as props and useTheme returns dark", () => {
    useTheme().colors = dark.colors;
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <Card
        item={{ value: "SomeValue" }}
        navigate={navigate}
        title={"Some title"}
        description={"Some Description"}
        hasReadMore={true}
        screen={"Assignment"}
        summary={"Some summary"}
        containerStyles={{ backgroundColor: "red" }}
        descriptionStyle={{ backgroundColor: "red" }}
        titleStyles={{ color: "red" }}
      />
    );

    fireEvent.press(getByTestId("read-more-card-button"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Assignment", {
      newItem: { value: "SomeValue" },
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui and  when hasReadMoreis false", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <Card
        item
        navigate={navigate}
        title={"Some title"}
        description={"Some Description"}
        summary={"Some summary"}
        titleStyles
      />
    );
    fireEvent.press(getByTestId("card-button"));
    expect(navigate).toHaveBeenCalledTimes(0);
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui and when hasReadMore and screen defined and click card-button", () => {
    const navigate = jest.fn();
    const { toJSON, getByTestId } = render(
      <Card
        item
        navigate={navigate}
        title={"Some title"}
        description={"Some Description"}
        hasReadMore={true}
        screen={"Assignment"}
        summary={"Some summary"}
        titleStyles
      />
    );
    fireEvent.press(getByTestId("card-button"));
    expect(navigate).toHaveBeenCalledWith("Assignment", { newItem: {} });
    expect(toJSON()).toMatchSnapshot();
  });
});
