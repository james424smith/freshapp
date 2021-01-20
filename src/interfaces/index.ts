import { Document } from "./seafarerDocumentsTypes";
import { NEWSLETTERS, PRESS_RELEASES } from "../constants/NewsConstants";
import {
  MARLOW_SERVICE,
  NON_MARLOW_SERVICE,
} from "../constants/seaServiceConstants";
import { ALLOTMENTS, PAYSLIPS } from "../constants/salaryConstants";
import {
  CREW_MANAGER,
  PORT_AGENT,
  MANNING_AGENT,
} from "../constants/contactConstants";
import { WebsocketEvent } from "./websocketTypes";
export * from "./seafarerDetailsTypes";
export * from "./assignmentDetailsTypes";
export * from "./imprintDetailsTypes";
export * from "./ManningAgentTypes";
export * from "./CrewManagerTypes";
export * from "./newsType";
export * from "./termsAndConditionsTypes";
export * from "./workingClothesTypes";
export * from "./privacyPolicyTypes";
export * from "./seaServiceDetailsTypes";
export * from "./notificationsTypes";
export * from "./seafarerBadgesTypes";
export * from "./seafarerDocumentsTypes";
export * from "./contactTypes";
export * from "./salaryDetailsTypes";
export * from "./requestMethodsTypes";
export * from "./websocketTypes";
export * from "./covidDocumentTypes";
export * from "./versionCheckTypes";
import { Payslip, PayslipRecord } from "./salaryDetailsTypes";
export interface InitialisedSagaCall {
  event?: WebsocketEvent;
  type: string;
  documentDetails?: Document;
  isOffline?: boolean;
  payload?: any;
  payslipDetails?:
    | PayslipRecord
    | (Payslip & {
        isOffline: boolean;
        payslipId: string;
        fileType: string;
      });
  payslipDocument?: string;
  messageType?: string;
  chatId?: number | string;
}

export interface FailedAction {
  type: string;
  error: any;
  payload?: any;
}
export interface SuccessAction<T> {
  type: string;
  payload: T;
  chatId?: string;
}
export interface SuccessRestReturn<T> {
  json: () => T;
  text?: () => string;
}
export interface FailedRestReturn {
  [key: string]: any;
}
export type Recipient = {
  recipientId: string;
  blob: string;
  firstName: string;
  familyName: string;
};
export type PdfResourceType = "url" | "file" | "base64";
export type WebViewType = "html" | "url";
export type AssignmentType = "current" | "next";
export type NewsType = typeof PRESS_RELEASES | typeof NEWSLETTERS;
export type SeaServiceType = typeof MARLOW_SERVICE | typeof NON_MARLOW_SERVICE;
export type SalaryType = typeof PAYSLIPS | typeof ALLOTMENTS;
export type RenderType = "file" | "base64";
export type ContactType =
  | typeof CREW_MANAGER
  | typeof PORT_AGENT
  | typeof MANNING_AGENT;
