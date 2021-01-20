import { all, fork, put, takeEvery } from "redux-saga/effects";
import {
  getCovidDocumentFailed,
  getCovidDocumentSuccess,
  setIsLoadingCovid,
} from "../../actions";
import * as functions from "../covidDocumentSagas";
import getCovidDocument from "../../../api/covidDocumentApi";
import * as apiRequest from "../../../common/request";

describe("Test Sea Service Sagas", () => {
  it("should dispatch action GET_COVID_DOCUMENT", () => {
    const generator = functions.watchGetCovidDocument();
    expect(generator.next().value).toEqual(
      takeEvery("GET_COVID_DOCUMENT", functions.getCovidDocumentFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return success when calling getCovidDocumentRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getCovidDocument());

    const res = await functions.getCovidDocumentRequest();

    expect(res).toEqual(
      ((await getCovidDocument()) as { text: () => string }).text()
    );

    spy.mockRestore();
  });

  it("should return data from Covid Document API", async () => {
    const covid = ((await getCovidDocument()) as { text: () => string }).text();

    const generator = functions.getCovidDocumentFn();
    expect(generator.next().value).toEqual(put(setIsLoadingCovid(true)));
    generator.next();
    expect(generator.next(covid).value).toEqual(
      put(getCovidDocumentSuccess(covid))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should call the expected action when getCovidDocumentFailed throws an error ", async () => {
    const generator = functions.getCovidDocumentFn();
    generator.next();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getCovidDocumentFailed({ error: "Some error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([fork(functions.watchGetCovidDocument)])
    );
    expect(generator.next().done).toBeTruthy();
  });
});
