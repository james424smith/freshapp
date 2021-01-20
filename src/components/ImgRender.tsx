import React from "react";
import { Image, ScrollView } from "react-native";
import { RenderType } from "../interfaces";
import styles from "../styles/more_screens/ImgRenderStyles";

type Props = { document: string; resourceType: RenderType; fileType: string };

const chooseAppropriateFile = (
  type: RenderType,
  document: string,
  fileType: string
) => {
  if (type === "file") {
    return { uri: `file://${document}` };
  } else {
    return { uri: `data:application/${fileType};base64,${document}` };
  }
};

const ImageRender = (props: Props) => {
  const { resourceType, document, fileType } = props;
  const img = chooseAppropriateFile(resourceType, document, fileType);

  return (
    <ScrollView
      maximumZoomScale={2.5}
      minimumZoomScale={1}
      style={styles.scrollViewStyles}
      contentContainerStyle={styles.scrollViewContainerStyles}
    >
      {img && <Image source={img} resizeMode={"contain"} style={styles.img} />}
    </ScrollView>
  );
};

export default ImageRender;
