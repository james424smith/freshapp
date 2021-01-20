import React from "react";
import { View } from "react-native";
import constants from "../../constants/config";
import WebRender from "../../components/WebRender";
import styles, { stylesheet } from "../../styles/more_screens/NewsCardStyles";
import { NEWSLETTERS } from "../../constants/NewsConstants";
import { AssignmentStackParamList } from "../../navigation/MainTabNavigator";
import { RouteProp } from "@react-navigation/native";
import PdfRender from "../../components/PdfRender";
import Colors from "../../constants/styles/colors";

interface Props {
  route: RouteProp<AssignmentStackParamList, "LatestReleases">;
}

export default (props: Props) => {
  const { route } = props;
  const imagePrefix = constants().IMAGES_PREFIX_URL;

  const newItem = route.params?.newItem;
  return newItem.newItemType === NEWSLETTERS ? (
    <PdfRender document={newItem.document} resourceType={"url"} />
  ) : (
    <View
      style={{
        ...styles.containerWebRender,
        backgroundColor: Colors.white,
      }}
    >
      <WebRender
        stringToRender={`<html>${stylesheet}<body><img <href src="${imagePrefix}/${newItem?.imageUrl}" />${newItem?.text}<body></html>`}
        resourceType={"html"}
      />
    </View>
  );
};
