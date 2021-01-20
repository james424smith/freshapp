import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IOS } from "../../constants/Platforms";
import styles from "../../styles/AuthStyles";
import GradientBackground from "./GradientBackground";

type Props = {
  children: JSX.Element;
};

const AuthMainView = (props: Props) => {
  return (
    <KeyboardAvoidingView
      style={styles.signUpContainer}
      behavior={Platform.OS === IOS ? "height" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContainerStyles}
      >
        <GradientBackground>{props.children}</GradientBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthMainView;
