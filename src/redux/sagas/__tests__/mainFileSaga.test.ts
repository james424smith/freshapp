import { all, fork } from "redux-saga/effects";
import seafarerDetails from "../seafarerDetailsSagas";
import assignmentDetails from "../assignmentDetailsSagas";
import imprintDetails from "../imprintDetailsSagas";
import termsAndConditionsDetails from "../termsAndConditionsSagas";
import workingClothesDetails from "../workingClothesDetailsSagas";
import news from "../newsSagas";
import privacyPolicyDetails from "../privacyPolicySagas";
import seafarerDocuments from "../seafarerDocumentsSagas";
import seaServiceDetails from "../seaServiceDetailsSagas";
import notificationsDetails from "../notificationsSagas";
import contactDetails from "../contactDetailsSagas";
import payslipDetails from "../salaryDetailsSagas";
import flightDetails from "../flightDetailsSaga";
import websocketSagas from "../websocketSagas";
import covidDocumentSagas from "../covidDocumentSagas";
import { networkSaga } from "react-native-offline";
import main from "../index";

describe("test main function", () => {
  it("should return appropriate values", () => {
    const generator = main();
    expect(generator.next().value).toEqual(
      all([
        seafarerDetails(),
        assignmentDetails(),
        imprintDetails(),
        news(),
        termsAndConditionsDetails(),
        workingClothesDetails(),
        privacyPolicyDetails(),
        seafarerDocuments(),
        seaServiceDetails(),
        notificationsDetails(),
        payslipDetails(),
        contactDetails(),
        flightDetails(),
        websocketSagas(),
        covidDocumentSagas(),
        fork(networkSaga, { pingInterval: 20000 }),
      ])
    );
  });
});
