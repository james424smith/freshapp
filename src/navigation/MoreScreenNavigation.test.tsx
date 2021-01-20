import React from "react";
import {
  MoreStack,
  newsStack as NewsStack,
  documents as DocumentsStack,
  salary as SalaryStack,
} from "./MoreScreenNavigation";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { defaultState } from "../redux/reducers";
import Amplify, { Analytics } from "aws-amplify";

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

describe("MoreStack ui test", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });
  it("should render correct ui snapshot", async () => {
    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <NavigationContainer>
          <Provider store={mockedStore(defaultState)}>
            <MoreStack />
          </Provider>
        </NavigationContainer>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
describe("NewsStack ui test", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });
  it("should render correct ui snapshot for NewsStack", async () => {
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <NavigationContainer>
        <Provider store={mockedStore(defaultState)}>
          <NewsStack />
        </Provider>
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
describe("DocumentsStack ui test", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });
  it("should render correct ui snapshot", async () => {
    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <NavigationContainer>
          <Provider store={mockedStore(defaultState)}>
            <DocumentsStack />
          </Provider>
        </NavigationContainer>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
describe("SalaryStack ui test", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });
  it("should render correct ui snapshot", async () => {
    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <NavigationContainer>
          <Provider store={mockedStore(defaultState)}>
            <SalaryStack />
          </Provider>
        </NavigationContainer>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
