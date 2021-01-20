import { all, fork, put, takeEvery } from "redux-saga/effects";
import { getAllNewsFailed, getAllNewsSuccess } from "../../actions";
import * as functions from "../newsSagas";
import getAllNews from "../../../api/newsApi";
import * as apiRequest from "../../../common/request";

describe("Test News Sagas", () => {
  it("should dispatch action GET_ALL_NEWS", () => {
    const generator = functions.watchGetAllNews();
    expect(generator.next().value).toEqual(
      takeEvery("GET_ALL_NEWS", functions.getAllNewsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getAllNewsRequest", async () => {
    const spy = jest.spyOn(apiRequest, "default").mockReturnValue(getAllNews());

    const res = await functions.getAllNewsRequest();

    expect(res).toEqual((await getAllNews()).json());

    spy.mockRestore();
  });

  it("should return data from News API", async () => {
    const newsData = await getAllNews();

    const generator = functions.getAllNewsFn();

    // calls the private function to get the News
    expect(generator.next()).toBeTruthy();

    expect(generator.next(newsData.json()).value).toEqual(
      put(getAllNewsSuccess(newsData.json()))
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should return data from News API and fail", async () => {
    const generator = functions.getAllNewsFn();
    // calls the private function to get the Assignment details
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getAllNewsFailed({ error: "Some error" }))
    );
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetAllNews)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
