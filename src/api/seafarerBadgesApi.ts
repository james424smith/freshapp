import { Badges, SuccessRestReturn } from "../interfaces";
import badgesList from "../../__mocks__/fake-data/badges.json";

const seafarerBadgesDetails: Badges = badgesList;

const delay = 0;

const getSeafarerBadgesDetails = (): Promise<SuccessRestReturn<Badges>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => seafarerBadgesDetails }));
    }, delay);
  });
};

export default getSeafarerBadgesDetails;
