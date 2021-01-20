import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "../../styles/AuthStyles";

type Props = {
  children: JSX.Element;
};

const GradientBackground = (props: Props) => {
  const theme = useTheme();

  if (theme.dark) {
    return (
      <View
        style={{
          ...styles.signUpContainer,
          backgroundColor: theme.colors.signInPageBackground,
        }}
      >
        {props.children}
      </View>
    );
  } else {
    return (
      <LinearGradient
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0, y: 1.5 }}
        locations={[0, 0.5]}
        style={styles.signUpContainer}
        colors={["#099BBD", "#005AA5"]}
      >
        {props.children}
      </LinearGradient>
    );
  }
};

export default GradientBackground;
