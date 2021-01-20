import { Allotments, SuccessRestReturn, PayslipDocuments } from "../interfaces";
import payslipRecords from "../../__mocks__/fake-data/payslips.json";
import allotmentsRecords from "../../__mocks__/fake-data/allotments.json";

const delay = 0;

export const getPayslipDetails = (): Promise<
  SuccessRestReturn<PayslipDocuments>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => payslipRecords }));
    }, delay);
  });
};
export const getAllotmentsDetails = (): Promise<
  SuccessRestReturn<Allotments>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.assign({}, { json: () => allotmentsRecords }));
    }, delay);
  });
};
