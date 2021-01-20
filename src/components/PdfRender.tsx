import React from "react";
import { View } from "react-native";
import { PdfResourceType } from "../interfaces";
import PDFView from "react-native-view-pdf";
import styles from "../styles/more_screens/PdfRenderStyles";

type Props = { document: string; resourceType: PdfResourceType };

const PdfRender = (props: Props) => {
  const { resourceType, document } = props;
  return (
    <View style={styles.root}>
      <PDFView
        fadeInDuration={10.0}
        style={styles.pdf}
        resource={document}
        resourceType={resourceType}
      />
    </View>
  );
};

export default PdfRender;
