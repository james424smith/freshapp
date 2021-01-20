import reducer, { defaultState } from "../salaryDetailsReducer";
import {
  GET_PAYSLIP_DETAILS_SUCCESS,
  GET_PAYSLIP_DETAILS_FAIL,
  GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
  CLEAR_ALL_STATE,
  SET_IS_DOWNLOADING_PAYSLIP_SUCCESS,
  SET_LOADING_NEW_PAYSLIP,
  SET_REFRESHING_PAYSLIP_DETAILS,
  GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
} from "../../constants";
import {
  getPayslipDetails,
  getAllotmentsDetails,
} from "../../../api/salaryApi";

describe("Test Salary related details Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_PAYSLIP_DETAILS_SUCCESS action for allotments", async () => {
    const payslipDetailsPromise = await getPayslipDetails();
    const allotmentsDetailsPromise = await getAllotmentsDetails();
    const payslipDetails = payslipDetailsPromise.json();
    const allotmentsDetails = allotmentsDetailsPromise.json();

    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_PAYSLIP_DETAILS_SUCCESS,
          payload: { payslipDetails, allotmentsDetails },
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      payslipDetails: payslipDetails,
      allotmentsDetails: allotmentsDetails,
    });
  });
  it("should handle GET_PAYSLIP_DETAILS_SUCCESS action for payslips", async () => {
    const payslipDetailsPromise = await getPayslipDetails();
    const payslipDetails = payslipDetailsPromise.json();

    expect(
      reducer(
        { ...defaultState, loader: true },
        {
          type: GET_PAYSLIP_DETAILS_SUCCESS,
          payload: { payslipDetails },
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      payslipDetails: payslipDetails,
    });
  });

  it("should handle GET_PAYSLIP_DETAILS_FAIL action", async () => {
    const mockSalaryDetails = (await getPayslipDetails()).json();

    expect(
      reducer(
        {
          ...defaultState,
          loader: true,
          payslipDetails: mockSalaryDetails,
        },
        {
          type: GET_PAYSLIP_DETAILS_FAIL,
          payload: mockSalaryDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      payslipDetails: mockSalaryDetails,
    });
  });
  it("should handle GET_PAYSLIP_DOCUMENTS_FILE_FAIL action", async () => {
    const mockSalaryDetails = (await getPayslipDetails()).json();

    expect(
      reducer(
        {
          ...defaultState,
          loader: true,
          payslipDetails: mockSalaryDetails,
        },
        {
          type: GET_PAYSLIP_DOCUMENTS_FILE_FAIL,
          payload: mockSalaryDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      payslipDetails: mockSalaryDetails,
    });
  });

  it("should handle SET_REFRESHING_PAYSLIP_DETAILS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_PAYSLIP_DETAILS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });

  it("should handle GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS action", async () => {
    const testSalaryDetailsPromise = await getPayslipDetails();
    const testSalaryDetails = testSalaryDetailsPromise.json();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_PAYSLIP_DOCUMENTS_FILE_SUCCESS,
          payload: testSalaryDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      payslipDocumentsFile: testSalaryDetails,
    });
  });

  it("should handle SET_IS_DOWNLOADING_PAYSLIP_SUCCESS action", () => {
    const mockSetDownloadPayslips = { isDownloading: true, payslipId: 12 };
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_DOWNLOADING_PAYSLIP_SUCCESS,
          payload: mockSetDownloadPayslips,
        }
      )
    ).toEqual({
      ...defaultState,
      isDownloading: true,
      downloadingPayslipId: 12,
    });
  });

  it("should handle SET_LOADING_NEW_PAYSLIP action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_LOADING_NEW_PAYSLIP,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, isLoadingNew: true });
  });
});
