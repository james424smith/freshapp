import { combineReducers, Reducer } from "redux";
import seafarerDetails, {
  SeafarerDetailsState,
  defaultState as seafarerDetailsState,
} from "./seafarerDetailsReducer";
import assignmentDetails, {
  AssignmentDetailsState,
  defaultState as assignmentDetailsState,
} from "./assignmentDetailsReducer";
import imprintDetails, {
  ImprintState,
  defaultState as imprintDetailsState,
} from "./imprintDetailsReducer";
import termsAndConditionsDetails, {
  TermsAndConditionsState,
  defaultState as termsAndConditionsDetailsState,
} from "./termsAndConditionsReducer";
import newsDetails, {
  NewsState,
  defaultState as newsDetailsState,
} from "./newsReducer";
import workingClothesDetails, {
  WorkingClothesState,
  defaultState as workingClothesDetailsState,
} from "./workingClothesReducer";
import privacyPolicyDetails, {
  PrivacyPolicyState,
  defaultState as privacyPolicyDetailsState,
} from "./privacyPolicyReducer";
import seafarerDocuments, {
  DocumentsDetailsState,
  defaultState as seafarerDocumentsState,
} from "./seafarerDocumentsReducer";
import seaServiceDetails, {
  SeaServiceRecordsState,
  defaultState as seaServiceDetailsState,
} from "./seaServiceDetailsReducer";
import notificationsDetails, {
  NotificationState,
  defaultState as notificationsDetailsState,
} from "./notificationsReducer";
import payslipDetails, {
  SalaryDetailsState,
  defaultState as payslipDetailsState,
} from "./salaryDetailsReducer";
import contactDetails, {
  ContactDetailsState,
  defaultState as contactDetailsState,
} from "./contactDetailsReducer";
import flightDetails, {
  FlightsDetailsState,
  defaultState as flightDetailsState,
} from "./flightDetailsReducer";
import covidDocument, {
  CovidDocumentState,
  defaultState as covidDocumentState,
} from "./covidDocumentReducer";
import websocketReducer, {
  WebsocketState,
  defaultState as websocketReducerState,
} from "./websocketReducer";
import darkModeOptionsReducer, {
  DarkModeOptionsState,
  defaultState as darkModeOptionsReducerState,
} from "./darkModeOptionsReducer";
import { reducer as network } from "react-native-offline";

export type IRootReducerType = {
  seafarerDetails: SeafarerDetailsState;
  assignmentDetails: AssignmentDetailsState;
  imprintDetails: ImprintState;
  workingClothesDetails: WorkingClothesState;
  newsDetails: NewsState;
  termsAndConditionsDetails: TermsAndConditionsState;
  privacyPolicyDetails: PrivacyPolicyState;
  seafarerDocuments: DocumentsDetailsState;
  seaServiceDetails: SeaServiceRecordsState;
  notificationsDetails: NotificationState;
  payslipDetails: SalaryDetailsState;
  contactDetails: ContactDetailsState;
  flightDetails: FlightsDetailsState;
  covidDocument: CovidDocumentState;
  websocketReducer: WebsocketState;
  darkModeOptionsReducer: DarkModeOptionsState;
  network: any;
};

export const defaultState = {
  seafarerDetails: seafarerDetailsState,
  assignmentDetails: assignmentDetailsState,
  imprintDetails: imprintDetailsState,
  workingClothesDetails: workingClothesDetailsState,
  newsDetails: newsDetailsState,
  termsAndConditionsDetails: termsAndConditionsDetailsState,
  privacyPolicyDetails: privacyPolicyDetailsState,
  seafarerDocuments: seafarerDocumentsState,
  seaServiceDetails: seaServiceDetailsState,
  notificationsDetails: notificationsDetailsState,
  payslipDetails: payslipDetailsState,
  contactDetails: contactDetailsState,
  flightDetails: flightDetailsState,
  covidDocument: covidDocumentState,
  websocketReducer: websocketReducerState,
  darkModeOptionsReducer: darkModeOptionsReducerState,
  network: { isConnected: true },
};

const combined: Reducer = combineReducers({
  network,
  seafarerDetails,
  assignmentDetails,
  imprintDetails,
  workingClothesDetails,
  newsDetails,
  termsAndConditionsDetails,
  privacyPolicyDetails,
  seafarerDocuments,
  seaServiceDetails,
  notificationsDetails,
  payslipDetails,
  contactDetails,
  flightDetails,
  covidDocument,
  websocketReducer,
  darkModeOptionsReducer,
});

export default () => combined;
