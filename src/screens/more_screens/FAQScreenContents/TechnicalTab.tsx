import React from "react";
import { View } from "react-native";
import FaqView from "../../../components/FaqView";
import { technicalContant } from "./faqContent";
type Props = {
  selectedQuestion?: number;
  url?: string;
};

const Technical = (props: Props) => {
  return (
    <View>
      <FaqView
        content={technicalContant}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default Technical;
