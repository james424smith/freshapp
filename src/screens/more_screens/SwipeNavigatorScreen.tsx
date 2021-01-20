import React from "react";
import { View, StatusBar } from "react-native";
import Swiper from "react-native-swiper";
import FAQScreen from "../FAQScreen";
import ImprintScreen from "./ImprintScreen";
import { newsStack as ReadMoreScreen } from "../../navigation/MoreScreenNavigation";
import SupportScreen from "./SupportScreen";
import styles from "../../styles/more_screens/SwipeNavigatorStyles";

import CustomHeaderNotAuth from "../../components/customHeaders";

const SwipeNavigator = () => {
  const screens = [
    { name: "News" },
    { name: "FAQs" },
    { name: "Support" },
    { name: "Marlow" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Swiper
        style={styles.wrapper}
        dot={<View style={styles.dotStyles} />}
        activeDot={<View style={styles.activeDotStyles} />}
        paginationStyle={styles.paginationStyles}
        loop={false}
      >
        <View testID={"ReadMoreScreen"} style={styles.slide}>
          <CustomHeaderNotAuth screenTitle={screens[0].name} />
          <ReadMoreScreen />
        </View>

        <View testID={"FAQScreen"} style={styles.slide}>
          <CustomHeaderNotAuth screenTitle={screens[1].name} />
          <FAQScreen />
        </View>

        <View testID={"SupportScreen"} style={styles.slide}>
          <CustomHeaderNotAuth screenTitle={screens[2].name} />
          <SupportScreen />
        </View>

        <View testID={"ImprintScreen"} style={styles.slide}>
          <CustomHeaderNotAuth screenTitle={screens[3].name} />
          <ImprintScreen />
        </View>
      </Swiper>
    </View>
  );
};
export default SwipeNavigator;
