import { Auth } from "aws-amplify";
import axios, { chooseFetcher } from "./request";
import * as RNConfig from "../constants/config";
import assignmentApi from "../api/assignmentDetailsApi";
import * as ApiEndpoints from "../constants/api_endpoints";
import covidDocumentApi from "../api/covidDocumentApi";
import * as RequestHelpers from "./request";
import imprintApi from "../api/imprintDetailsApi";
import seafarerApi from "../api/seafarerDetailsApi";
import newsApi from "../api/newsApi";
import termsAndConditionsApi from "../api/termsAndConditionsApi";
import workingClothesApi from "../api/workingClothesApi";
import privacyPolicyApi from "../api/privacyPolicyApi";
import seafarerDocumentsApi from "../api/seafarerDocumentsApi";
import seaServiceApi from "../api/seaServiceApi";
import checkVersionsApi from "../api/versionCheckApi";
import notificationsApi from "../api/notificationsApi";
import { getAllotmentsDetails, getPayslipDetails } from "../api/salaryApi";
import seafarerBadgesApi from "../api/seafarerBadgesApi";
import contactApi from "../api/contactApi";
import flightsApi from "../api/flightDetailsApi";
import { getJwtToken } from "./request";

jest.spyOn(Auth, "currentSession").mockReturnValue(
  Promise.resolve({
    getAccessToken: () => ({
      payload: {
        username: "112393",
      },
      getJwtToken: () => "Secret-Token",
    }),
  } as any)
);

describe("test chooseFetcher", () => {
  it("should call fech and return valid data if there is no error", async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        ok: true,
        data: "temp",
      });
    });

    const res = await chooseFetcher({
      url: "https://www.google.com",
      method: "GET",
    });

    expect(res.data).toBe("temp");
  });

  it("should call fech and return valid data if there is no error and method is POST", async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        ok: true,
        data: "temp",
      });
    });

    const res = await chooseFetcher({
      url: "https://www.google.com",
      method: "POST",
      body: { temp: "value" },
      userData: { Authorization: "1234" },
    });

    expect(res.data).toBe("temp");
  });

  it("should call fech and return valid data if there is no error and header is defined", async () => {
    global.fetch = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        ok: true,
        data: "temp",
      });
    });

    const res = await chooseFetcher({
      url: "https://www.google.com",
      method: "GET",
      headers: { temp: "value" },
    });

    expect(res.data).toBe("temp");
  });

  it("should call fech and return valid data if there is an error", async () => {
    const data = {
      ok: false,
      data: "temp",
    };
    global.fetch = jest.fn().mockImplementation(async () => {
      return Promise.resolve(data);
    });

    const temp = chooseFetcher({
      url: "https://www.google.com",
      method: "GET",
    });

    expect(temp).rejects.toEqual({
      ok: false,
      data: "temp",
    });
  });
});

describe("test getJwtToken function", () => {
  it("should return valid payload", async () => {
    const payload = await getJwtToken();

    expect(payload).toStrictEqual({
      Authorization: "Secret-Token",
      seafarerId: "112393",
    });
  });
});
describe("test get data", () => {
  process.env.ENV = "DUMMY";
  it("should get the correct data when the endpoint call is assignment", async () => {
    const data = (await assignmentApi()).json();
    const res = await axios({
      endpoint: "assignment",
      requestMethod: "GET",
    });
    expect(data).toEqual(res.json());
  });
  it("should get the correct data when the endpoint call is imprint", async () => {
    const data = (await imprintApi()).json();
    const res = await axios({ endpoint: "imprint", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is covid", async () => {
    const data = ((await covidDocumentApi()) as { text: () => string }).text();
    const res = await axios({ endpoint: "covid", requestMethod: "GET" });
    expect(data).toBe(res.text());
  });
  it("should return undefined when the endpoint call is covid and calls the json function", async () => {
    const data = (await covidDocumentApi()).json();
    expect(data).toBe(undefined);
  });
  it("should get the correct data when the endpoint call is seafarer", async () => {
    const data = (await seafarerApi()).json();
    const res = await axios({ endpoint: "seafarer", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is version check", async () => {
    const data = (await checkVersionsApi()).json();
    const res = await axios({ endpoint: "versionCheck", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is news", async () => {
    const data = (await newsApi()).json();
    const res = await axios({ endpoint: "news", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is termsAndConditions", async () => {
    const data = (await termsAndConditionsApi()).json();
    const res = await axios({
      endpoint: "termsAndConditions",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is workingClothes", async () => {
    const data = (await workingClothesApi()).json();
    const res = await axios({
      endpoint: "workingClothes",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is privacyPolicy", async () => {
    const data = (await privacyPolicyApi()).json();
    const res = await axios({
      endpoint: "privacyPolicy",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is seafarerDocuments", async () => {
    const data = (await seafarerDocumentsApi()).json();
    const res = await axios({
      endpoint: "seafarerDocuments",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is seaService", async () => {
    const data = (await seaServiceApi()).json();
    const res = await axios({
      endpoint: "seaService",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is notifications", async () => {
    const data = (await notificationsApi()).json();
    const res = await axios({
      endpoint: "notifications",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is payslip", async () => {
    const data = (await getPayslipDetails()).json();
    const res = await axios({ endpoint: "payslip", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is allotments", async () => {
    const data = (await getAllotmentsDetails()).json();
    const res = await axios({
      endpoint: "allotments",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is seafarerBadges", async () => {
    const data = (await seafarerBadgesApi()).json();
    const res = await axios({
      endpoint: "seafarerBadges",
      requestMethod: "GET",
    });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is contact", async () => {
    const data = (await contactApi()).json();
    const res = await axios({ endpoint: "contact", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is flights", async () => {
    const data = (await flightsApi()).json();
    const res = await axios({ endpoint: "flights", requestMethod: "GET" });
    expect(data).toBe(res.json());
  });
  it("should get the correct data when the endpoint call is validateWebsocket", async () => {
    const res = axios({
      endpoint: "validateWebsocket",
      requestMethod: "GET",
    });
    expect(res).toBeTruthy();
  });
});

describe("test request default function when ENV is not dummy", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should call chooseFetcher when requestParams.endpoint is assignment", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "assignmentsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "assignment", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.assignmentsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is imprint", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "imprintEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({
      endpoint: "imprint",
      requestMethod: "GET",
      headers: { temp: "value" },
    });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.imprintEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is versionCheck", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "checkVersionEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({
      endpoint: "versionCheck",
      requestMethod: "GET",
      headers: { temp: "value" },
    });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.checkVersionEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is signup", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "signUpEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "signup", requestMethod: "POST", payload: {} });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.signUpEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "POST",
      body: {},
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is news", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "newsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "news", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.newsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is workingClothes", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "workingClothesEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "workingClothes", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.workingClothesEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is termsAndConditions", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "termsAndConditionsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "termsAndConditions", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.termsAndConditionsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is privacyPolicy", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "privacyPolicyEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "privacyPolicy", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.privacyPolicyEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is seaService", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "seaServiceEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "seaService", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.seaServiceEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is seafarerBadges", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "seafarerBadgesEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "seafarerBadges", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.seafarerBadgesEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is payslip", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "payslipEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "payslip", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.payslipEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is payslipDocumentsFile", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "payslipDocumentsFileEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "payslipDocumentsFile", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.payslipDocumentsFileEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is allotments", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "allotmentsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "allotments", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.allotmentsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is notifications", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "notificationsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "notifications", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.notificationsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is notificationRead", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "notificationReadEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({
      endpoint: "notificationRead",
      requestMethod: "POST",
      payload: {},
    });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.notificationReadEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "POST",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
      headers: {
        Accept: "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: { seafarerId: "1234" },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is seafarerDocuments", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "seafarerDocumentsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "seafarerDocuments", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.seafarerDocumentsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is flights", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "flightsEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "flights", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.flightsEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is seafarerDocumentsFile", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "seafarerDocumentsFileEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "seafarerDocumentsFile", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.seafarerDocumentsFileEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is contact", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "contactEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "contact", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.contactEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is covid", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "covidDocumentEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "covid", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(0);
    expect(ApiEndpoints.covidDocumentEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is validateWebsocket", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "validateWebsocketEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "validateWebsocket", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.validateWebsocketEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
  it("should call chooseFetcher when requestParams.endpoint is seafarerDetails", async () => {
    const spy = jest
      .spyOn(RequestHelpers, "chooseFetcher")
      .mockResolvedValue({});
    const spy2 = jest
      .spyOn(RequestHelpers, "getJwtToken")
      .mockResolvedValue({ Authorization: "1234", seafarerId: "1234" });
    const spy3 = jest
      .spyOn(ApiEndpoints, "seafarerEndpoint")
      .mockReturnValue("url");

    const spy4 = jest.spyOn(RNConfig, "default").mockReturnValue({
      ENV: "development",
      API_BASE_URL: "",
      IMAGES_PREFIX_URL: "",
      WEBSOCKET_BASE_URL: "",
      GOOGLE_MAPS_API_KEY: "",
      SSL_EXPIRATION_WARNING: "",
    });

    await axios({ endpoint: "seafarer", requestMethod: "GET" });

    expect(RequestHelpers.getJwtToken).toHaveBeenCalledTimes(1);
    expect(ApiEndpoints.seafarerEndpoint).toHaveBeenCalledTimes(1);
    expect(RequestHelpers.chooseFetcher).toHaveBeenCalledWith({
      url: "url",
      method: "GET",
      userData: {
        Authorization: "1234",
        seafarerId: "1234",
      },
    });

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
});
