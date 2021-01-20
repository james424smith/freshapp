import React from "react";
import FaqView from "../FaqView";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { Linking } from "react-native";

describe("EmployeeIdInput snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui and change value of employeeId", () => {
    const { toJSON, getByTestId } = render(
      <FaqView
        content={[
          {
            question: "Some Question",
            answer: "Some Answer",
            opened: true,
            id: 1,
          },
          {
            question: "Some Question 2",
            answer: "Some Answer 2",
            opened: false,
            id: 2,
          },
        ]}
        selectedQuestion={1}
      />
    );

    fireEvent.press(getByTestId("faq-button-2"));

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui and change value of employeeId whem selectedQuestion is not present in the questions array", () => {
    const { toJSON } = render(
      <FaqView
        content={[
          {
            question: "Some Question",
            answer: "Some Answer",
            opened: true,
            id: 1,
          },
        ]}
        selectedQuestion={2}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should call the openUrl function when clicking an item with url property", () => {
    const { getByTestId } = render(
      <FaqView
        content={[
          {
            question: "Some Question",
            answer: "Some Answer",
            opened: true,
            url: "https://www.google.com",
            id: 1,
          },
        ]}
      />
    );

    Linking.openURL = jest.fn();

    fireEvent.press(getByTestId("open-url-button"));

    expect(Linking.openURL).toHaveBeenCalledWith("https://www.google.com");
  });
});
