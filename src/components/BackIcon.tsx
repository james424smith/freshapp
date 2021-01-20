import React from "react";
import { TouchableOpacity } from "react-native";

import Back from "../../assets/icons/bottom_navigation/backArrow.svg";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";

interface Props {
  goBack: boolean;
  path?: string;
  fill?: string;
}

const size = 25;

export default (props: Props) => {
  const { goBack, path, fill } = props;
  const navigation = useNavigation();
  const theme: Theme = useTheme();
  const handleOnPress = (goBackLocal: boolean, pathLocal?: string) => {
    if (!goBackLocal && pathLocal) {
      navigation.navigate(pathLocal);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      testID={"back-button"}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      onPress={() => handleOnPress(goBack, path)}
    >
      <Back
        fill={fill ?? theme.colors.blackAndWhite}
        width={size}
        height={size}
      />
    </TouchableOpacity>
  );
};
