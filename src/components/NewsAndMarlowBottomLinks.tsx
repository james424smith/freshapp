import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "./StyledText";
import styles, { mainIconSize } from "../styles/AuthStyles";
import { NEWS_ROUTE, IMPRINT_ROUTE } from "../constants/routes";
import News from "../../assets/icons/more_screen/034-message in a bottle.svg";
import Anchor from "../../assets/icons/more_screen/008-anchor.svg";
import AnchorDark from "../../assets/icons/more_screen/darkanchor.svg";

import { useTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
type Props = { navigate: (arg: string) => void };

const NewsAndMarlowBottomLinks = (props: Props) => {
  const { navigate } = props;
  const theme = useTheme();
  const scheme = useColorScheme();

  const darkModeIconAnchor = () => {
    if (scheme === "dark") {
      return <AnchorDark width={mainIconSize} height={mainIconSize} />;
    } else {
      return <Anchor width={mainIconSize} height={mainIconSize} />;
    }
  };
  return (
    <View style={styles.footerStyle}>
      <View style={styles.footerContainer}>
        <View style={styles.bottomButtonArea}>
          <TouchableOpacity
            testID={"news-button"}
            onPress={() => navigate(NEWS_ROUTE)}
            style={{
              ...styles.touchableOpacityStyle,
              backgroundColor: theme.colors.newsAndMarlowBottomLinksColor,
            }}
          >
            <View style={styles.navigationIconsCentered}>
              <News width={mainIconSize} height={mainIconSize} />
              <Text style={{ ...styles.bottomLink, color: theme.colors.text }}>
                News
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtonArea}>
          <TouchableOpacity
            testID={"imprint-button"}
            onPress={() => navigate(IMPRINT_ROUTE)}
            style={{
              ...styles.touchableOpacityStyle,
              backgroundColor: theme.colors.newsAndMarlowBottomLinksColor,
            }}
          >
            <View style={styles.navigationIconsCentered}>
              {darkModeIconAnchor()}
              <Text style={{ ...styles.bottomLink, color: theme.colors.text }}>
                Marlow
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewsAndMarlowBottomLinks;
