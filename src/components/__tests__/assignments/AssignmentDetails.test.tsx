import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import AssignmentDetails from "../../assignments/AssignmentDetails";
import { assignmentDetails } from "../../../../__mocks__/fake-data/assignmentDetails.json";
import news from "../../../../__mocks__/fake-data/news.json";

describe("AssignmentDetails test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render AssignmentDetails correctly as per the ui made when the employmentOffer is false and pressReleases are more than 3 ", () => {
    const { toJSON } = render(
      <AssignmentDetails
        availabilityDate={"01-01-2021"}
        initials={"GI"}
        imageUri={{ uri: "1234" }}
        assignmentType={"current"}
        handleAssignmentType={() => {}}
        assignmentDetails={assignmentDetails}
        news={news}
        hasEmployment={false}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render AssignmentDetails correctly as per the ui made when the employmentOffer is false and pressReleases are less than 3 ", () => {
    const { toJSON } = render(
      <AssignmentDetails
        availabilityDate={"01-01-2021"}
        initials={"GI"}
        imageUri={{ uri: "1234" }}
        assignmentType={"current"}
        handleAssignmentType={() => {}}
        assignmentDetails={assignmentDetails}
        news={{ newsletters: news.newsletters, pressReleases: [] }}
        hasEmployment={false}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render AssignmentDetails correctly as per the ui made when the employmentOffer is false and pressReleases  is undefined", () => {
    const { toJSON } = render(
      <AssignmentDetails
        availabilityDate={"01-01-2021"}
        initials={"GI"}
        imageUri={{ uri: "1234" }}
        assignmentType={"current"}
        handleAssignmentType={() => {}}
        assignmentDetails={assignmentDetails}
        news={{ newsletters: news.newsletters }}
        hasEmployment={false}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render AssignmentDetails correctly as per the ui made when the employmentOffer is true", () => {
    const { toJSON } = render(
      <AssignmentDetails
        availabilityDate={"01-01-2021"}
        initials={"GI"}
        imageUri={{ uri: "1234" }}
        assignmentType={"current"}
        handleAssignmentType={() => {}}
        assignmentDetails={assignmentDetails}
        news={news}
        hasEmployment={true}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
