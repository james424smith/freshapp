import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_ALL_NEWS } from "../constants";
import { getAllNewsSuccess, getAllNewsFailed } from "../actions";
import { News, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getAllNewsRequest = async (): Promise<News | FailedRestReturn> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "news",
  }).then((news) => news.json());

export function* getAllNewsFn() {
  try {
    const news: News = yield call(getAllNewsRequest);
    yield put(getAllNewsSuccess(news));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getAllNewsFailed(error));
  }
}

export function* watchGetAllNews() {
  yield takeEvery(GET_ALL_NEWS, getAllNewsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetAllNews)]);
}
