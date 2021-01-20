import React from "react";
import { View } from "react-native";
import FaqView from "../../../components/FaqView";
import { personalInfoContent } from "./faqContent";

type Props = {
  selectedQuestion?: number;
};

const PersonalInformation = (props: Props) => {
  return (
    <View>
      <FaqView
        content={personalInfoContent}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default PersonalInformation;
