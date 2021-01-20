import {
  GET_PAYSLIP_DETAILS,
  GET_PAYSLIP_DETAILS_SUCCESS,
  GET_PAYSLIP_DETAILS_FAIL,
  GET_PAYSLIP_DOCUMENTS_FILE,
  GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
  REMOVE_PAYSLIP_DOCUMENTS_FILE,
  REMOVE_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  REMOVE_PAYSLIP_DOCUMENTS_FILE_FAILED,
  SET_LOADING_NEW_PAYSLIP,
  SET_IS_DOWNLOADING_PAYSLIP_SUCCESS,
  SET_REFRESHING_PAYSLIP_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  Allotments,
  PayslipDocuments,
  PayslipDocumentsFile,
  PayslipRecord,
  Payslip,
} from "../../interfaces";

//Payslip Actions Section
export function getPayslipDetails(): InitialisedSagaCall {
  return { type: GET_PAYSLIP_DETAILS };
}

export function setRefreshingPayslipDetails(
  isLoading: boolean
): InitialisedSagaCall {
  return { type: SET_REFRESHING_PAYSLIP_DETAILS, payload: isLoading };
}

export const setIsDownloadingPayslipSuccess = (
  isDownloading: boolean,
  payslipId: string
): SuccessAction<{ isDownloading: boolean; payslipId: string }> => {
  return {
    type: SET_IS_DOWNLOADING_PAYSLIP_SUCCESS,
    payload: { isDownloading, payslipId },
  };
};

export const getPayslipDetailsSuccess = (
  payslipDetails: PayslipDocuments,
  allotmentsDetails?: Allotments
): SuccessAction<{
  payslipDetails: PayslipDocuments;
  allotmentsDetails?: Allotments;
}> => ({
  type: GET_PAYSLIP_DETAILS_SUCCESS,
  payload: { payslipDetails, allotmentsDetails },
});

export const getPayslipDetailsFailed = (error: any): FailedAction => ({
  type: GET_PAYSLIP_DETAILS_FAIL,
  error,
});

// REMOVE PDF FILE FROM LOCAL IF DOWNLOADED
export function removePayslipDocumentsFileFromLocal(
  payslipDetails: PayslipRecord
): InitialisedSagaCall {
  return { type: REMOVE_PAYSLIP_DOCUMENTS_FILE, payslipDetails };
}
export const removePayslipDocumentsFileFromLocalSuccess = (): InitialisedSagaCall => ({
  type: REMOVE_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
});

export const removePayslipDocumentsFileFromLocalFailed = (
  error: any
): FailedAction => ({
  type: REMOVE_PAYSLIP_DOCUMENTS_FILE_FAILED,
  error,
});

// PDF Actions Section

export function getPayslipDocumentsFile(
  payslipDetails:
    | PayslipRecord
    | (Payslip & {
        isOffline: boolean;
        payslipId: string;
        fileType: string;
      }),
  isOffline: boolean
): InitialisedSagaCall {
  return {
    type: GET_PAYSLIP_DOCUMENTS_FILE,
    payslipDetails,
    isOffline,
  };
}

export const getPayslipDocumentsFileSuccess = (
  payslipDocumentsFile: PayslipDocumentsFile
): SuccessAction<PayslipDocumentsFile> => ({
  type: GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  payload: payslipDocumentsFile,
});

export const getPayslipDocumentsFileFailed = (error: any): FailedAction => ({
  type: GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
  error,
});

export function setIsLoadingNewPayslip(
  loadingNew: boolean
): InitialisedSagaCall {
  return { type: SET_LOADING_NEW_PAYSLIP, payload: loadingNew };
}
