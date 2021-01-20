import React from "react";
import { View } from "react-native";
import { assignmentContent } from "./faqContent";
import FaqView from "../../../components/FaqView";
type Props = {
  selectedQuestion?: number;
};

const Assignment = (props: Props) => {
  return (
    <View>
      <FaqView
        content={assignmentContent}
        selectedQuestion={props.selectedQuestion}
      />
    </View>
  );
};

export default Assignment;
