import React from "react";
import EmploymentOfferScreen from "../../assignments/EmploymentOfferScreen";
import { render, cleanup } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("EmploymentOfferScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when focus is true when employmentOfferDocument is present", () => {
    const route = {
      state: {},
      key: "EmploymentOffer-E0ArYKZZNpvIFYMFIEyaQ",
      name: "EmploymentOffer" as "EmploymentOffer",
      params: { assignmentType: "current" as "current" },
      getState: jest.fn(),
    };
    const mockedState = {
      assignmentDetails: {
        assignmentDetails: [
          {
            employmentOfferDocument: { document: "12345" },
          },
          {},
        ],
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <EmploymentOfferScreen route={route} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when focus is true when employmentOfferDocument is present and assignmentType is next", () => {
    const route = {
      state: {},
      key: "EmploymentOffer-E0ArYKZZNpvIFYMFIEyaQ",
      name: "EmploymentOffer" as "EmploymentOffer",
      params: { assignmentType: "next" as "next" },
      getState: jest.fn(),
    };
    const mockedState = {
      assignmentDetails: {
        assignmentDetails: [
          {
            employmentOfferDocument: {},
          },
          {
            employmentOfferDocument: { document: "12345" },
          },
        ],
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <EmploymentOfferScreen route={route} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when focus is true when employmentOfferDocument is undefined", () => {
    const route = {
      state: {},
      key: "EmploymentOffer-E0ArYKZZNpvIFYMFIEyaQ",
      name: "EmploymentOffer" as "EmploymentOffer",
      params: { assignmentType: "current" as "current" },
      getState: jest.fn(),
    };
    const mockedState = {
      assignmentDetails: {
        assignmentDetails: undefined,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <EmploymentOfferScreen route={route} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
