import { InitialisedSagaCall } from "../../interfaces";
import { CLEAR_ALL_STATE } from "../constants";
export * from "./seafarerDetailsActions";
export * from "./assignmentDetailsActions";
export * from "./imprintDetailsActions";
export * from "./termsAndConditionsActions";
export * from "./workingClothesActions";
export * from "./newsActions";
export * from "./privacyPolicyActions";
export * from "./seafarerDocumentsActions";
export * from "./seaServiceDetailsActions";
export * from "./notificationsActions";
export * from "./salaryDetailsActions";
export * from "./contactDetailsActions";
export * from "./flightsDetailsActions";
export * from "./websocketActions";
export * from "./covidDocumentActions";
export * from "./darkModeOptionsActions";

export function clearAllState(): InitialisedSagaCall {
  return { type: CLEAR_ALL_STATE };
}
