/// <reference types="jest" />
import * as endpoints from "./index";

// describe(name, fn) creates a block that groups together several related tests.

describe("Function with two input parameters", () => {
  it("validate assignmentsEndpoint output string", () => {
    const endpoint = endpoints.assignmentsEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/all-assignments");
  });

  it("validate seafarerEndpoint output string", () => {
    const endpoint = endpoints.seafarerEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393");
  });

  it("validate seafarerDocumentsEndpoint output string", () => {
    const endpoint = endpoints.seafarerDocumentsEndpoint(
      "crewCompanion",
      112393
    );
    expect(endpoint).toBe("crewCompanion/seafarers/112393/seafarersdocuments");
  });

  it("validate workingClothesEndpoint output string", () => {
    const endpoint = endpoints.workingClothesEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/workingclothes");
  });

  it("validate checkVersionEndpoint output string", () => {
    const endpoint = endpoints.checkVersionEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/versions");
  });

  it("validate seaServiceEndpoint output string", () => {
    const endpoint = endpoints.seaServiceEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/seaservicerecords");
  });

  it("validate payslipEndpoint output string", () => {
    const endpoint = endpoints.payslipEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/salaries");
  });

  it("validate allotmentsEndpoint output string", () => {
    const endpoint = endpoints.allotmentsEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/allotments");
  });

  it("validate notificationsEndpoint output string", () => {
    const endpoint = endpoints.notificationsEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/notifications");
  });

  it("validate seafarerBadgesEndpoint output string", () => {
    const endpoint = endpoints.seafarerBadgesEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/badge");
  });

  it("validate contactEndpoint output string", () => {
    const endpoint = endpoints.contactEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/contacts");
  });

  it("validate flightsEndpoint output string", () => {
    const endpoint = endpoints.flightsEndpoint("crewCompanion", 112393);
    expect(endpoint).toBe("crewCompanion/seafarers/112393/flights");
  });

  it("validate validateWebsocketEndpoint output string", () => {
    const endpoint = endpoints.validateWebsocketEndpoint(
      "crewCompanion",
      112393
    );
    expect(endpoint).toBe("crewCompanion/chat/seafarers/112393/validate");
  });
});

describe("Function with one input parameter", () => {
  it("validate imprintEndpoint output string", () => {
    const endpoint = endpoints.imprintEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/imprint");
  });

  it("validate newsEndpoint output string", () => {
    const endpoint = endpoints.newsEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/news");
  });

  it("validate signUpEndpoint output string", () => {
    const endpoint = endpoints.signUpEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/register");
  });

  it("validate termsAndConditionsEndpoint output string", () => {
    const endpoint = endpoints.termsAndConditionsEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/termsconditions");
  });

  it("validate privacyPolicyEndpoint output string", () => {
    const endpoint = endpoints.privacyPolicyEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/privacypolicy");
  });

  it("validate notificationReadEndpoint output string", () => {
    const endpoint = endpoints.notificationReadEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/notificationread");
  });
});

describe("Function with more than two input parameters", () => {
  it("validate payslipDocumentsFileEndpoint output string when everything is defined", () => {
    const endpoint = endpoints.payslipDocumentsFileEndpoint(
      "crewCompanion",
      112393,
      "2",
      "19"
    );
    expect(endpoint).toBe("crewCompanion/seafarers/112393/salaries/2/19");
  });

  it("expect error when vesselCode is not defined", () => {
    expect(() =>
      endpoints.payslipDocumentsFileEndpoint(
        "crewCompanion",
        112393,
        undefined,
        "19"
      )
    ).toThrowError("vesselCode and payslipId cannot be undefined");
  });

  it("expect error when payslipId is not defined", () => {
    expect(() =>
      endpoints.payslipDocumentsFileEndpoint("crewCompanion", 112393, "19")
    ).toThrowError("vesselCode and payslipId cannot be undefined");
  });
  it("expect error when both vesselCode and payslipId are not defined", () => {
    expect(() =>
      endpoints.payslipDocumentsFileEndpoint("crewCompanion", 112393)
    ).toThrowError("vesselCode and payslipId cannot be undefined");
  });

  it("validate seafarerDocumentsFileEndpoint output string when everything is defined", () => {
    const endpoint = endpoints.seafarerDocumentsFileEndpoint(
      "crewCompanion",
      112393,
      5,
      88
    );
    expect(endpoint).toBe(
      "crewCompanion/seafarers/112393/seafarersdocuments/5/88"
    );
  });

  it("expect error when documentId is not defined", () => {
    expect(() =>
      endpoints.seafarerDocumentsFileEndpoint(
        "crewCompanion",
        112393,
        undefined,
        88
      )
    ).toThrowError("documentId and documentCounter cann be undefined");
  });

  it("expect error when documentCounter is not defined", () => {
    expect(() =>
      endpoints.seafarerDocumentsFileEndpoint("crewCompanion", 112393, 5)
    ).toThrowError("documentId and documentCounter cann be undefined");
  });

  it("expect error when both documentId and documentCounter are not defined", () => {
    expect(() =>
      endpoints.seafarerDocumentsFileEndpoint("crewCompanion", 112393)
    ).toThrowError("documentId and documentCounter cann be undefined");
  });

  it("validate covidDocumentEndpoint output string", () => {
    const endpoint = endpoints.covidDocumentEndpoint("crewCompanion");
    expect(endpoint).toBe("crewCompanion/covidfile/covid");
  });

  it("invalid type of input parameters", () => {
    const endpoint = endpoints.payslipDocumentsFileEndpoint(
      "crewCompanion",
      112393,
      "2",
      "19"
    );
    expect(endpoint).toBe("crewCompanion/seafarers/112393/salaries/2/19");
  });
});
