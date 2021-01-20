import { Platform } from "react-native";
import { IOS } from "../../constants/Platforms";
import axiosRequest from "../request";
import OpenFile from "@quinaryio/react-native-doc-viewer";

export const sharePDF = async (
  fileId: string | number,
  fileCounter?: number,
  vesselCode?: string
) => {
  const file = async () => {
    const res = await axiosRequest({
      requestMethod: "GET",
      payslipId: fileId as string,
      documentId: fileId as number,
      vesselCode,
      documentCounter: fileCounter,
      endpoint:
        fileCounter || fileCounter === 0
          ? "seafarerDocumentsFile"
          : "payslipDocumentsFile",
    });
    const json = await res.json();
    return {
      document: json.document ? json.document : json.payslip,
      fileType: json.fileType ? json.fileType : json.documentType,
    };
  };

  const d = await file();

  if (Platform.OS === IOS) {
    OpenFile.openDocb64(
      [
        {
          base64: d.document,
          fileName: `doc-${fileId}-counter-${fileCounter}.${d.fileType.toLowerCase()}`,
          fileType: d.fileType.toLowerCase(),
        },
      ],
      () => {}
    );
  } else {
    OpenFile.openDocb64(
      [
        {
          base64: d.document,
          fileName: `doc-${fileId}-counter-${fileCounter}.${d.fileType.toLowerCase()}`,
          fileType: d.fileType.toLowerCase(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cache: false,
        },
      ],
      () => {}
    );
  }
};
