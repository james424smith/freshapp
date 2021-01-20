import { PayslipRecord } from "./../../../interfaces/salaryDetailsTypes";
import * as actions from "../salaryDetailsActions";
import {
  GET_PAYSLIP_DETAILS,
  SET_REFRESHING_PAYSLIP_DETAILS,
  REMOVE_PAYSLIP_DOCUMENTS_FILE,
  REMOVE_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  REMOVE_PAYSLIP_DOCUMENTS_FILE_FAILED,
  GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
  GET_PAYSLIP_DOCUMENTS_FILE,
  GET_PAYSLIP_DETAILS_FAIL,
} from "../../constants";

const document: PayslipRecord = {
  vesselName: "string",
  vesselCode: "string",
  rank: "string",
  dateMonth: "string",
  payslipId: "string",
};

describe("test action salary", () => {
  it("should create an action to get salary details", () => {
    const expectedAction = {
      type: GET_PAYSLIP_DETAILS,
    };

    expect(actions.getPayslipDetails()).toEqual(expectedAction);
  });
  it("should create an action to notify about an error while getting salary details", () => {
    const expectedAction = {
      type: GET_PAYSLIP_DETAILS_FAIL,
      error: {},
    };

    expect(actions.getPayslipDetailsFailed({})).toEqual(expectedAction);
  });

  it("should create an action to refresh payslip and allotments details", () => {
    const expectedAction = {
      type: SET_REFRESHING_PAYSLIP_DETAILS,
      payload: true,
    };

    expect(actions.setRefreshingPayslipDetails(true)).toEqual(expectedAction);
  });
  it("should create an action to remove a payslip from offline mode", () => {
    const expectedAction = {
      type: REMOVE_PAYSLIP_DOCUMENTS_FILE,
      payslipDetails: document,
    };

    expect(actions.removePayslipDocumentsFileFromLocal(document)).toEqual(
      expectedAction
    );
  });
  it("should create an action to successfully remove a payslip from offline mode", () => {
    const expectedAction = {
      type: REMOVE_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
    };

    expect(actions.removePayslipDocumentsFileFromLocalSuccess()).toEqual(
      expectedAction
    );
  });
  it("should create an action to notify about an error in removing a file from offline", () => {
    const expectedAction = {
      type: REMOVE_PAYSLIP_DOCUMENTS_FILE_FAILED,
      error: {},
    };

    expect(actions.removePayslipDocumentsFileFromLocalFailed({})).toEqual(
      expectedAction
    );
  });
  it("should create an action to notify about an error in retrieving a payslip file", () => {
    const expectedAction = {
      type: GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
      error: {},
    };

    expect(actions.getPayslipDocumentsFileFailed({})).toEqual(expectedAction);
  });
  it("should create an action to initial the retrieval of  payslip file", () => {
    const expectedAction = {
      type: GET_PAYSLIP_DOCUMENTS_FILE,
      payslipDetails: document,
      isOffline: true,
    };

    expect(actions.getPayslipDocumentsFile(document, true)).toEqual(
      expectedAction
    );
  });
});
