import React from "react";
import { View } from "react-native";
import { registrationContent } from "./faqContent";
import FaqView from "../../../components/FaqView";
type Props = {
  selectedQuestion?: number;
};

const Registration = (props: Props) => {
  return (
    <View>
      <FaqView
        content={registrationContent}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default Registration;
