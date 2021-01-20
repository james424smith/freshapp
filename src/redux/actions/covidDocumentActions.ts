import {
  GET_COVID_DOCUMENT,
  GET_COVID_DOCUMENT_SUCCESS,
  GET_COVID_DOCUMENT_FAIL,
  SET_IS_LOADING_COVID,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
} from "../../interfaces/";

export function getCovidDocument(): InitialisedSagaCall {
  return { type: GET_COVID_DOCUMENT };
}

export function setIsLoadingCovid(isLoading: boolean): InitialisedSagaCall {
  return { type: SET_IS_LOADING_COVID, payload: isLoading };
}

export const getCovidDocumentSuccess = (
  covidDocument: string
): SuccessAction<string> => {
  return {
    type: GET_COVID_DOCUMENT_SUCCESS,
    payload: covidDocument,
  };
};

export const getCovidDocumentFailed = (error: any): FailedAction => ({
  type: GET_COVID_DOCUMENT_FAIL,
  error,
});
