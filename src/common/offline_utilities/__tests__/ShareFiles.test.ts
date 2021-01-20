import { sharePDF } from "../ShareFiles";
import OpenFile from "@quinaryio/react-native-doc-viewer";
import { Platform } from "react-native";

describe("sharePDF tests", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  it("should call the openDocb64 with the correct params when requesting document and the platform is IOS", async () => {
    jest.mock("react-native", () => ({
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ...jest.requireActual("react-native"),
      Platform: {
        OS: "ios",
      },
    }));

    await sharePDF("123", 0);

    expect(OpenFile.openDocb64).toBeCalledWith(
      [
        {
          base64: "12344566",
          fileName: "doc-123-counter-0.pdf",
          fileType: "pdf",
        },
      ],
      expect.any(Function)
    );
  });
  it("should call the openDocb64 with the correct params when requesting payslip and the platform is IOS", async () => {
    jest.mock("react-native", () => ({
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ...jest.requireActual("react-native"),
      Platform: {
        OS: "ios",
      },
    }));

    await sharePDF("123", undefined, "0");

    expect(OpenFile.openDocb64).toBeCalledWith(
      [
        {
          base64: "12344566",
          fileName: "doc-123-counter-0.pdf",
          fileType: "pdf",
        },
      ],
      expect.any(Function)
    );
  });

  it("should call the openDocb64 with the correct params when requesting document and the platform is Android", async () => {
    Platform.OS = "android";
    await sharePDF("123", 0);
    expect(OpenFile.openDocb64).toBeCalledWith(
      [
        {
          base64: "12344566",
          fileName: "doc-123-counter-0.pdf",
          fileType: "pdf",
          cache: false,
        },
      ],
      expect.any(Function)
    );
  });
});

it("should call the openDocb64 with the correct params when requesting payslip and the platform is Android", async () => {
  Platform.OS = "android";
  await sharePDF("123", undefined, "0");

  expect(OpenFile.openDocb64).toBeCalledWith(
    [
      {
        base64: "12344566",
        fileName: "doc-123-counter-0.pdf",
        fileType: "pdf",
      },
    ],
    expect.any(Function)
  );
});
