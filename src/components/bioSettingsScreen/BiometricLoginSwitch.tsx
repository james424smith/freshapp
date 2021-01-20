import React from "react";
import { View, Switch } from "react-native";
import styles from "../../styles/more_screens/BiometricLoginStyle";
import colors from "../../constants/styles/colors";
import Text from "../../components/StyledText";
import { Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";

type Props = {
  isEnabled: boolean;
  toggleSwitch: any;
};

const BiometricLoginSwitch = (props: Props) => {
  const theme = useTheme();
  const { isEnabled, toggleSwitch } = props;
  return (
    <View style={styles.mainStyle}>
      <Icon
        name="fingerprint"
        size={25}
        color={colors.white}
        style={styles.iconStyle}
      />
      <View style={styles.content}>
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          Enable Biometrics
        </Text>
        <Switch
          trackColor={{ false: colors.inactiveGrey, true: colors.marlowBlue }}
          thumbColor={isEnabled ? colors.white : colors.grey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
export default BiometricLoginSwitch;
