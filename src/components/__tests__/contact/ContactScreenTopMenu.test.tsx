import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import ContactScreenTopMenu from "../../contact/ContactScreenTopMenu";

describe("ContactScreenTopMenu snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render AssignmentBasicInformationComponent correctly as per the ui made and selectedType is Manning Agent", () => {
    const temp = jest.fn().mockImplementation((a: string) => {
      a;
    });
    const { toJSON, getAllByTestId } = render(
      <ContactScreenTopMenu
        handleSelection={temp}
        selectedType={"Manning Agent"}
      />
    );

    fireEvent.press(getAllByTestId("category-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    expect(temp).toHaveBeenCalledTimes(1);
  });
  it("should render AssignmentBasicInformationComponent correctly as per the ui made and selectedType is Crew Manager", () => {
    const wrapper = render(
      <ContactScreenTopMenu
        key={0}
        handleSelection={(a: string) => {
          a;
        }}
        selectedType={"Crew Manager"}
      />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it("should render AssignmentBasicInformationComponent correctly as per the ui made and selectedType is Port Agent", () => {
    const wrapper = render(
      <ContactScreenTopMenu
        key={0}
        handleSelection={(a: string) => {
          a;
        }}
        selectedType={"Port Agent"}
      />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
