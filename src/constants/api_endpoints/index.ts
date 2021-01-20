export const assignmentsEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/all-assignments`;

export const imprintEndpoint = (baseUrl: string): string =>
  `${baseUrl}/imprint`;

export const seafarerEndpoint = (baseUrl: string, seafarerId: number): string =>
  `${baseUrl}/seafarers/${seafarerId}`;

export const newsEndpoint = (baseUrl: string): string => `${baseUrl}/news`;

export const seafarerDocumentsEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/seafarersdocuments`;

export const seafarerDocumentsFileEndpoint = (
  baseUrl: string,
  seafarerId: number,
  documentId?: string | number,
  documentCounter?: number
): string => {
  if (documentId && documentCounter) {
    return `${baseUrl}/seafarers/${seafarerId}/seafarersdocuments/${documentId}/${documentCounter}`;
  }
  throw Error("documentId and documentCounter cann be undefined");
};

export const signUpEndpoint = (baseUrl: string): string =>
  `${baseUrl}/register`;

export const termsAndConditionsEndpoint = (baseUrl: string): string =>
  `${baseUrl}/termsconditions`;

export const privacyPolicyEndpoint = (baseUrl: string): string =>
  `${baseUrl}/privacypolicy`;

export const workingClothesEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/workingclothes`;

export const seaServiceEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/seaservicerecords`;

export const payslipEndpoint = (baseUrl: string, seafarerId: number): string =>
  `${baseUrl}/seafarers/${seafarerId}/salaries`;

export const checkVersionEndpoint = (baseUrl: string): string =>
  `${baseUrl}/versions`;

export const payslipDocumentsFileEndpoint = (
  baseUrl: string,
  seafarerId: number,
  vesselCode?: string,
  payslipId?: string | number
): string => {
  if (vesselCode && payslipId) {
    return `${baseUrl}/seafarers/${seafarerId}/salaries/${vesselCode}/${payslipId}`;
  }
  throw Error("vesselCode and payslipId cannot be undefined");
};

export const allotmentsEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/allotments`;

export const notificationsEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/notifications`;

export const notificationReadEndpoint = (baseUrl: string): string =>
  `${baseUrl}/notificationread`;

export const seafarerBadgesEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/seafarers/${seafarerId}/badge`;

export const contactEndpoint = (baseUrl: string, seafarerId: number): string =>
  `${baseUrl}/seafarers/${seafarerId}/contacts`;

export const flightsEndpoint = (baseUrl: string, seafarerId: number): string =>
  `${baseUrl}/seafarers/${seafarerId}/flights`;

export const covidDocumentEndpoint = (baseUrl: string): string =>
  `${baseUrl}/covidfile/covid`;

export const validateWebsocketEndpoint = (
  baseUrl: string,
  seafarerId: number
): string => `${baseUrl}/chat/seafarers/${seafarerId}/validate`;

export type endpointOptions =
  | "assignment"
  | "imprint"
  | "seafarer"
  | "signup"
  | "crewManager"
  | "manningAgent"
  | "termsAndConditions"
  | "privacyPolicy"
  | "news"
  | "workingClothes"
  | "seafarerDocuments"
  | "seaService"
  | "payslip"
  | "allotments"
  | "notifications"
  | "notificationRead"
  | "seafarerBadges"
  | "seafarerDocumentsFileEndpoint"
  | "contact"
  | "flights"
  | "payslipDocumentsFile"
  | "seafarerDocumentsFile"
  | "covid"
  | "validateWebsocket"
  | "versionCheck";
