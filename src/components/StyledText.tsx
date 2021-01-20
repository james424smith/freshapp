import React from "react";
import { Text, StyleSheet, StyleProp } from "react-native";
import colors from "../constants/styles/colors";

type Props = {
  style?: StyleProp<any>;
  numberOfLines?: number;
  children?: any;
  testID?: string;
};

const styles: StyleProp<any> = StyleSheet.create({
  selectedFont: {
    fontFamily: "Roboto-Regular",
    color: colors.darkNavy,
  },
});

export default (props: Props) => {
  const { children, style, ...otherProps } = props;
  return (
    <Text {...otherProps} style={[styles.selectedFont, style]}>
      {children}
    </Text>
  );
};
