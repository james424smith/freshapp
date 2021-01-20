export interface PayslipRecord {
  vesselName: string;
  vesselCode: string;
  rank: string;
  dateMonth: string;
  payslipId: string;
  isOffline?: boolean;
  payslip?: string;
  docFileSize?: string;
  fileType?: string;
}

export interface AllotmentsRecord {
  date: string;
  beneficiary: string;
  amount: string;
  allotmentType: string;
  currency: string;
}

export type PayslipDocumentsFile = {
  documentType: string;
  payslip: string;
};

export type PayslipDocuments = PayslipRecord[];

export type Allotments = AllotmentsRecord[];

export type Payslip = {
  documents: PayslipDocuments;
};
