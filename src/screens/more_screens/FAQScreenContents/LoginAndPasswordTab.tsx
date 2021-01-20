import React from "react";
import { View } from "react-native";
import { loginAndPasswordContent } from "./faqContent";
import FaqView from "../../../components/FaqView";
type Props = {
  selectedQuestion?: number;
};

const LoginAndPassword = (props: Props) => {
  return (
    <View>
      <FaqView
        content={loginAndPasswordContent}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default LoginAndPassword;
