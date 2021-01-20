import { News, SuccessRestReturn } from "../interfaces";
import news from "../../__mocks__/fake-data/news.json";

const delay = 0;

const getAllNews = (): Promise<SuccessRestReturn<News>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => news }));
    }, delay);
  });
};

export default getAllNews;
