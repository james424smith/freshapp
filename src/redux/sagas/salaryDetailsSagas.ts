import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_PAYSLIP_DETAILS,
  GET_PAYSLIP_DOCUMENTS_FILE,
  REMOVE_PAYSLIP_DOCUMENTS_FILE,
} from "../constants";
import {
  getPayslipDetailsSuccess,
  getPayslipDetailsFailed,
  getPayslipDocumentsFileSuccess,
  getPayslipDocumentsFileFailed,
  removePayslipDocumentsFileFromLocalSuccess,
  removePayslipDocumentsFileFromLocalFailed,
  setIsDownloadingPayslipSuccess,
  setIsLoadingNewPayslip,
} from "../actions";
import {
  Allotments,
  PayslipDocumentsFile,
  PayslipDocuments,
  FailedRestReturn,
  PayslipRecord,
  InitialisedSagaCall,
} from "../../interfaces";
import axiosWrapper from "../../common/request";
import { removeFileFromLocalStorage } from "../../common/offline_utilities/removeFileFromLocalStorage";
import { saveFileOffline } from "../../common/offline_utilities/saveFileOffline";
import { getPayslips } from "../../common/offline_utilities/getOfflineFiles";
import { checkResponseStatus } from "../../common/checkResponseStatus";

//PAYSLIP SAGAS
export const getPayslipDetailsRequest = async (): Promise<
  PayslipDocuments | FailedRestReturn
> => {
  const res = await axiosWrapper({
    requestMethod: "GET",
    endpoint: "payslip",
  })
    .then((payslips) => payslips.json())
    .catch((error) => {
      checkResponseStatus(error);
    });
  return getPayslips({ documents: res });
};

export const getAllotmentsDetailsRequest = async (): Promise<
  Allotments | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "allotments",
  })
    .then((allotments) => allotments.json())
    .catch((error) => {
      return checkResponseStatus(error);
    });

export function* getPayslipDetailsFn() {
  try {
    const payslipDetails: PayslipDocuments = yield call(
      getPayslipDetailsRequest
    );
    const allotmentsDetails: Allotments = yield call(
      getAllotmentsDetailsRequest
    );

    yield put(getPayslipDetailsSuccess(payslipDetails, allotmentsDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getPayslipDetailsFailed(error));
  }
}

//Save File Offline
export const saveDocumentOffline = async (
  payslipDetails: PayslipRecord,
  payslipDocumentsFile: PayslipDocumentsFile
) => {
  const { payslipId } = payslipDetails;
  const { documentType, payslip } = payslipDocumentsFile;
  await saveFileOffline({
    fileId: payslipId,
    fileType: documentType,
    document: payslip,
    documentDetails: payslipDetails,
  });
};

//Remove file from local - Request
export const removeSalaryFromLocalRequest = async (
  payslipDetails: PayslipRecord
) => {
  const { payslipId, fileType } = payslipDetails;
  await removeFileFromLocalStorage({
    fileId: payslipId,
    fileType,
  });
};

export function* removePayslipDocumentFromLocalFn({
  payslipDetails,
}: InitialisedSagaCall) {
  try {
    if (payslipDetails) {
      yield put(setIsDownloadingPayslipSuccess(true, payslipDetails.payslipId));
      yield call(removeSalaryFromLocalRequest, payslipDetails as PayslipRecord);
      yield put(removePayslipDocumentsFileFromLocalSuccess());
      const payslipDocuments: PayslipDocuments = yield call(
        getPayslipDetailsRequest
      );
      yield put(getPayslipDetailsSuccess(payslipDocuments));
      yield put(
        setIsDownloadingPayslipSuccess(false, payslipDetails.payslipId)
      );
    } else {
      throw Error("payslip details is not present in the call");
    }
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(removePayslipDocumentsFileFromLocalFailed(error));
    yield put(
      setIsDownloadingPayslipSuccess(false, payslipDetails?.payslipId ?? "")
    );
  }
}

//PDF SAGAS
export const getPayslipDocumentsFileRequest = async (
  payslipDetails: PayslipRecord
): Promise<PayslipDocumentsFile | FailedRestReturn> => {
  const { vesselCode, payslipId } = payslipDetails;
  const res = await axiosWrapper({
    requestMethod: "GET",
    endpoint: "payslipDocumentsFile",
    vesselCode,
    payslipId: payslipId.toString(),
  });
  return res.json();
};

export function* getPayslipDocumentsFileFn({
  payslipDetails,
  isOffline,
}: InitialisedSagaCall) {
  try {
    if (payslipDetails) {
      if (isOffline) {
        yield put(
          setIsDownloadingPayslipSuccess(true, payslipDetails.payslipId)
        );
        const payslipDocumentsFile: PayslipDocumentsFile = yield call(
          getPayslipDocumentsFileRequest,
          payslipDetails as PayslipRecord
        );
        yield call(
          saveDocumentOffline,
          payslipDetails as PayslipRecord,
          payslipDocumentsFile
        );
        const payslipDocuments: PayslipDocuments = yield call(
          getPayslipDetailsRequest
        );
        yield put(getPayslipDetailsSuccess(payslipDocuments));
        yield put(
          setIsDownloadingPayslipSuccess(false, payslipDetails.payslipId)
        );
      } else {
        yield put(setIsLoadingNewPayslip(true));
        const payslipDocumentsFile: PayslipDocumentsFile = yield call(
          getPayslipDocumentsFileRequest,
          payslipDetails as PayslipRecord
        );
        yield put(getPayslipDocumentsFileSuccess(payslipDocumentsFile));
        yield put(setIsLoadingNewPayslip(false));
      }
    } else {
      throw Error("payslip details is not present in the call");
    }
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getPayslipDocumentsFileFailed(error));
    yield put(
      setIsDownloadingPayslipSuccess(false, payslipDetails?.payslipId ?? "")
    );
  }
}

export function* watchGetPayslipDetails() {
  yield takeEvery(GET_PAYSLIP_DETAILS, getPayslipDetailsFn);
}

export function* watchGetPayslipDocumentsFile() {
  yield takeEvery(GET_PAYSLIP_DOCUMENTS_FILE, getPayslipDocumentsFileFn);
}

export function* watchRemovePayslipDocumentsFileFromLocal() {
  yield takeEvery(
    REMOVE_PAYSLIP_DOCUMENTS_FILE,
    removePayslipDocumentFromLocalFn
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetPayslipDetails),
    fork(watchGetPayslipDocumentsFile),
    fork(watchRemovePayslipDocumentsFileFromLocal),
  ]);
}
