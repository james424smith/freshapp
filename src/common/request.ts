import config from "../constants/config";
import { RequestMethods } from "../interfaces";
import * as RequestHelpers from "./request";
import {
  assignmentsEndpoint,
  imprintEndpoint,
  seafarerEndpoint,
  signUpEndpoint,
  workingClothesEndpoint,
  newsEndpoint,
  termsAndConditionsEndpoint,
  privacyPolicyEndpoint,
  seafarerDocumentsEndpoint,
  seafarerDocumentsFileEndpoint,
  seaServiceEndpoint,
  notificationsEndpoint,
  notificationReadEndpoint,
  seafarerBadgesEndpoint,
  contactEndpoint,
  payslipEndpoint,
  allotmentsEndpoint,
  payslipDocumentsFileEndpoint,
  flightsEndpoint,
  validateWebsocketEndpoint,
  covidDocumentEndpoint,
  endpointOptions,
  checkVersionEndpoint,
} from "../constants/api_endpoints";
import assignmentApi from "../api/assignmentDetailsApi";
import imprintApi from "../api/imprintDetailsApi";
import seafarerApi from "../api/seafarerDetailsApi";
import { Auth } from "aws-amplify";
import newsApi from "../api/newsApi";
import termsAndConditionsApi from "../api/termsAndConditionsApi";
import workingClothesApi from "../api/workingClothesApi";
import privacyPolicyApi from "../api/privacyPolicyApi";
import seafarerDocumentsApi from "../api/seafarerDocumentsApi";
import seaServiceApi from "../api/seaServiceApi";
import notificationsApi from "../api/notificationsApi";
import { getAllotmentsDetails, getPayslipDetails } from "../api/salaryApi";
import seafarerBadgesApi from "../api/seafarerBadgesApi";
import contactApi from "../api/contactApi";
import flightsApi from "../api/flightDetailsApi";
import covidDocumentApi from "../api/covidDocumentApi";
import versionCheckApi from "../api/versionCheckApi";

type RequestParams = {
  requestMethod: RequestMethods;
  endpoint: endpointOptions;
  documentId?: number;
  documentCounter?: number;
  payload?: any;
  headers?: any;
  navigation?: any;
  vesselCode?: string;
  payslipId?: string;
};

export const getJwtToken = async () => {
  const session = await Auth.currentSession();
  return {
    Authorization: session.getAccessToken().getJwtToken(),
    seafarerId: session.getAccessToken().payload.username,
  };
};

const handleErrors = (response: any) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const chooseFetcher = async (request: {
  url: string;
  userData?: Record<string, string>;
  method: RequestMethods;
  headers?: Record<string, unknown>;
  body?: any;
}) => {
  return fetch(request.url, {
    body: request.body ? JSON.stringify(request.body) : undefined,
    method: request.method,
    headers: {
      ...(request.headers ?? {}),
      Authorization: request.userData ? request.userData.Authorization : "",
      "Content-Type": "application/json",
    },
  }).then(handleErrors);
};

const chooseDummyData = (requestParams: RequestParams) => {
  switch (requestParams.endpoint) {
    case "assignment":
      return assignmentApi().then((assignment) => assignment);
    case "imprint":
      return imprintApi().then((imprint) => imprint);
    case "news":
      return newsApi().then((news) => news);
    case "versionCheck":
      return versionCheckApi().then((versions) => versions);
    case "termsAndConditions":
      return termsAndConditionsApi().then(
        (termsAndConditions) => termsAndConditions
      );
    case "workingClothes":
      return workingClothesApi().then((workingClothes) => workingClothes);
    case "seafarerDocuments":
      return seafarerDocumentsApi().then(
        (seafarerDocuments) => seafarerDocuments
      );
    case "privacyPolicy":
      return privacyPolicyApi().then((privacyPolicy) => privacyPolicy);
    case "seaService":
      return seaServiceApi().then((seaService) => seaService);
    case "payslip":
      return getPayslipDetails().then((payslip) => payslip);
    case "allotments":
      return getAllotmentsDetails().then((allotments) => allotments);
    case "notifications":
      return notificationsApi().then((notifications) => notifications);
    case "seafarerBadges":
      return seafarerBadgesApi().then((seafarerBadges) => seafarerBadges);
    case "seafarerDocumentsFile":
      return Promise.resolve({
        json: () => Promise.resolve({ document: "12344566", fileType: "pdf" }),
      });
    case "payslipDocumentsFile":
      return Promise.resolve({
        json: () =>
          Promise.resolve({ payslip: "12344566", documentType: "pdf" }),
      });
    case "contact":
      return contactApi().then((contact) => contact);
    case "flights":
      return flightsApi().then((contact) => contact);
    case "covid":
      return covidDocumentApi().then((covidDocument) => covidDocument);
    case "validateWebsocket":
      return Promise.resolve(true);
    default:
      return seafarerApi().then((seafarer) => seafarer);
  }
};

export default async (requestParams: RequestParams): Promise<any> => {
  const { ENV, API_BASE_URL } = config();
  if (ENV === "DUMMY") {
    return chooseDummyData(requestParams);
  } else {
    switch (requestParams.endpoint) {
      case "assignment": {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = assignmentsEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "imprint": {
        const url = imprintEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      case "signup": {
        const url = signUpEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          body: requestParams.payload,
        });
      }
      case "news": {
        const url = newsEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      case "workingClothes": {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = workingClothesEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "termsAndConditions": {
        const url = termsAndConditionsEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      case "privacyPolicy": {
        const url = privacyPolicyEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      case "seaService": {
        const userData = await RequestHelpers.getJwtToken();
        const url = seaServiceEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "seafarerBadges": {
        const userData = await RequestHelpers.getJwtToken();
        const url = seafarerBadgesEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "payslip": {
        const userData = await RequestHelpers.getJwtToken();
        const url = payslipEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "payslipDocumentsFile": {
        const userData = await RequestHelpers.getJwtToken();
        const url = payslipDocumentsFileEndpoint(
          API_BASE_URL,
          userData.seafarerId,
          requestParams.vesselCode,
          requestParams.payslipId
        );
        return RequestHelpers.chooseFetcher({
          url: url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "allotments": {
        const userData = await RequestHelpers.getJwtToken();
        const url = allotmentsEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "notifications": {
        const userData = await RequestHelpers.getJwtToken();
        const url = notificationsEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "notificationRead": {
        const userData = await RequestHelpers.getJwtToken();
        const url = notificationReadEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          headers: {
            Accept: "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          userData,
          body: {
            ...requestParams.payload,
            seafarerId: userData.seafarerId,
          },
        });
      }
      case "seafarerDocuments": {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = seafarerDocumentsEndpoint(
          API_BASE_URL,
          userData.seafarerId
        );
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "flights": {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = flightsEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "seafarerDocumentsFile": {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = seafarerDocumentsFileEndpoint(
          API_BASE_URL,
          userData.seafarerId,
          requestParams.documentId,
          requestParams.documentCounter
        );
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "contact": {
        const userData = await RequestHelpers.getJwtToken();
        const url = contactEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "covid": {
        const url = covidDocumentEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      case "validateWebsocket": {
        const userData = await RequestHelpers.getJwtToken();
        const url = validateWebsocketEndpoint(
          API_BASE_URL,
          userData.seafarerId
        );
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
      case "versionCheck": {
        const url = checkVersionEndpoint(API_BASE_URL);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
        });
      }
      default: {
        // call the function to get username and JWT Tokens
        const userData = await RequestHelpers.getJwtToken();
        const url = seafarerEndpoint(API_BASE_URL, userData.seafarerId);
        return RequestHelpers.chooseFetcher({
          url,
          method: requestParams.requestMethod,
          userData,
        });
      }
    }
  }
};
