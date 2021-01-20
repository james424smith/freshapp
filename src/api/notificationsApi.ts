import { Notification, SuccessRestReturn } from "../interfaces";
import notifications from "../../__mocks__/fake-data/notifications.json";

const delay = 0;

const getNotificationsDetails = (): Promise<
  SuccessRestReturn<Notification>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => notifications }));
    }, delay);
  });
};

export default getNotificationsDetails;
