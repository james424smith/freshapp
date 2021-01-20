import {
  GET_PAYSLIP_DETAILS_SUCCESS,
  GET_PAYSLIP_DETAILS_FAIL,
  GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
  CLEAR_ALL_STATE,
  SET_IS_DOWNLOADING_PAYSLIP_SUCCESS,
  SET_LOADING_NEW_PAYSLIP,
  SET_REFRESHING_PAYSLIP_DETAILS,
} from "../constants";
import {
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
  PayslipDocuments,
  PayslipDocumentsFile,
  Allotments,
} from "../../interfaces";

export interface SalaryDetailsState {
  payslipDetails: PayslipDocuments;
  allotmentsDetails: Allotments;
  payslipDocumentsFile?: PayslipDocumentsFile;
  isDownloading: boolean;
  isLoadingNew: boolean;
  downloadingPayslipId?: number;
  loader: boolean;
}

export const defaultState: SalaryDetailsState = {
  payslipDetails: [],
  allotmentsDetails: [],
  isDownloading: false,
  isLoadingNew: false,
  loader: false,
};

type SuccessReturnTypes =
  | PayslipDocuments
  | Allotments
  | PayslipDocumentsFile
  | boolean
  | number;

export default (
  state: SalaryDetailsState = defaultState,
  action: InitialisedSagaCall | FailedAction | SuccessAction<SuccessReturnTypes>
) => {
  switch (action.type) {
    case GET_PAYSLIP_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        payslipDetails: action.payload.payslipDetails,
        allotmentsDetails: action.payload.allotmentsDetails
          ? action.payload.allotmentsDetails
          : state.allotmentsDetails,
      };
    case GET_PAYSLIP_DETAILS_FAIL:
    case GET_PAYSLIP_DOCUMENTS_FILE_FAIL:
      return {
        ...state,
        loader: false,
      };
    case GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS:
      return {
        ...state,
        loader: false,
        payslipDocumentsFile: action.payload,
      };
    case SET_REFRESHING_PAYSLIP_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    case SET_IS_DOWNLOADING_PAYSLIP_SUCCESS:
      return {
        ...state,
        isDownloading: action.payload.isDownloading,
        downloadingPayslipId: action.payload.payslipId,
      };
    case SET_LOADING_NEW_PAYSLIP:
      return {
        ...state,
        isLoadingNew: action.payload,
      };
    default:
      return state;
  }
};
