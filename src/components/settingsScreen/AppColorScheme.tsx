import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../../styles/more_screens/AppColorSchemeStyles";
import colors from "../../constants/styles/colors";
import Text from "../StyledText";
import { Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { IRootReducerType } from "../../redux/reducers";
import { useSelector } from "react-redux";
type Props = {
  changeModalVisible: () => void;
};
const AppColorScheme = (props: Props) => {
  const { changeModalVisible } = props;
  const theme = useTheme();

  const selectedIndex = useSelector<IRootReducerType, string>(
    ({ darkModeOptionsReducer }) => darkModeOptionsReducer.darkModeOptionsValue
  );

  return (
    <TouchableOpacity
      testID={"change-theme"}
      style={styles.mainStyle}
      onPress={changeModalVisible}
    >
      <Icon
        name="brightness-2"
        size={25}
        color={colors.white}
        style={styles.iconStyle}
      />
      <View style={styles.content}>
        <View>
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            Dark Mode
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, { color: colors.darkInputText }]}>
            {selectedIndex}
          </Text>
          <Icon name="chevron-right" color={colors.darkInputText} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppColorScheme;
