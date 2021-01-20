import React from "react";
import { View } from "react-native";
import FaqView from "../../../components/FaqView";
import { generalContent } from "./faqContent";
type Props = {
  selectedQuestion?: number;
};

const General = (props: Props) => {
  return (
    <View>
      <FaqView
        content={generalContent}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default General;
