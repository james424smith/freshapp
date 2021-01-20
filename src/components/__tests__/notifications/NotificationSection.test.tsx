import React from "react";
import NotificationSection from "../../notifications/NotificationSection";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {
  ASSIGNMENT,
  PAYSLIP,
  FLIGHT,
  PERSONAL,
  NEWSLETTER,
  GENERAL,
} from "../../../constants/notificationsConstants";
import * as HandleLinkHelper from "../../../common/handleLink";
describe("NotificationSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui", () => {
    const markAsRead = jest.fn();
    const mockedState = {
      notificationsDetails: {
        notificationsDetails: {
          notificationsDetails: {
            notifications: [
              {
                category: ASSIGNMENT,
                date: "",
                description: "",
                isRead: false,
                notificationId: 1234,
                title: "",
              },
            ],
            unreadCount: 4,
          },
        },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NotificationSection markAsRead={markAsRead} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("NotificationSection snapshot test fireEvents", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  [
    { type: ASSIGNMENT, path: "assignment" },
    { type: PAYSLIP, path: "salaries" },
    { type: FLIGHT, path: "flights" },
    { type: PERSONAL, path: "documents" },
    { type: NEWSLETTER, path: "news" },
    { type: GENERAL },
    { type: "Test" },
  ].map((a) =>
    it(`should render correct ui when type = ${a.type}`, () => {
      const spy = jest.spyOn(HandleLinkHelper, "handleLink");

      const markAsRead = jest.fn();
      const mockedState = {
        notificationsDetails: {
          notificationsDetails: {
            notificationsDetails: {
              notifications: [
                {
                  category: a,
                  date: "",
                  description: "",
                  isRead: a.type === GENERAL ? true : false,
                  notificationId: 1234,
                  title: "",
                },
              ],
              unreadCount: 4,
            },
          },
        },
      };
      const mockedStore = configureMockStore();

      const { getByTestId } = render(
        <Provider store={mockedStore(mockedState)}>
          <NotificationSection
            notificationsList={[
              {
                category: a.type,
                date: "",
                description: "",
                isRead: a.type === GENERAL ? true : false,
                notificationId: 1234,
                title: "",
              },
            ]}
            markAsRead={markAsRead}
          />
        </Provider>
      );
      fireEvent.press(getByTestId("notification-button"));

      if (a.type !== GENERAL && a.type !== "Test") {
        expect(HandleLinkHelper.handleLink).toHaveBeenCalledWith(
          "crewcompanion",
          a.path
        );
      } else {
        expect(HandleLinkHelper.handleLink).toHaveBeenCalledTimes(0);
      }
      spy.mockRestore();
    })
  );
});
