import React from "react";
import { WebView } from "react-native-webview";
import { WebViewType } from "../interfaces";

type Props = { stringToRender: string; resourceType: WebViewType };

const chooseSource = (type: WebViewType, stringToRender: string) => {
  if (type === "html") {
    return { html: stringToRender };
  } else {
    return { uri: stringToRender };
  }
};

const WebRender = (props: Props) => {
  const { stringToRender, resourceType } = props;
  const typeToRender = chooseSource(resourceType, stringToRender);
  return <WebView originWhitelist={["*"]} source={typeToRender} />;
};

export default WebRender;
