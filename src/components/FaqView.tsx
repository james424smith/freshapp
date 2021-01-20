import React, { useRef } from "react";
import { FlatList, Linking, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/FAQStyles";
import Text from "./StyledText";
import colors from "../constants/styles/colors";
import { useTheme } from "@react-navigation/native";
import { useSelectedQuestion } from "../hooks/useSelectedQuestion";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Props {
  content: {
    question: string;
    answer: string;
    opened: boolean;
    id: number;
    url?: string;
  }[];
  selectedQuestion?: number;
}

const FaqView = (props: Props) => {
  const theme = useTheme();
  const flatlistRef = useRef<FlatList<{
    question: string;
    answer: string;
    opened: boolean;
    id: number;
    url?: string;
  }> | null>(null);

  const { answerAndquestions, setAnswerAndquestions } = useSelectedQuestion(
    props.content,
    flatlistRef,
    props.selectedQuestion
  );

  const setOpenedQuestion = (index: any) => {
    const temp = answerAndquestions.map((item, arrayIndex) => {
      if (index === arrayIndex) {
        return { ...item, opened: !item.opened };
      } else {
        return { ...item, opened: false };
      }
    });
    setAnswerAndquestions(temp);
  };

  const _renderAnswerAndQuestions = ({
    item,
    index,
  }: {
    item: {
      question: string;
      answer: string;
      opened: boolean;
      id: number;
      url?: string;
    };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        testID={`faq-button-${item.id}`}
        style={styles.questionPress}
        onPress={() => {
          setOpenedQuestion(index);
        }}
      >
        <View style={styles.questionView}>
          <Text
            style={{
              ...styles.questionText,
              color: theme.colors.FAQQuestionToDark,
            }}
          >
            {item.question}
          </Text>
          <Icon
            name={item.opened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            color={colors.darkInputText}
            size={30}
          />
        </View>
        {item.opened ? (
          <TouchableOpacity
            testID={"open-url-button"}
            onPress={() => {
              item.url && Linking.openURL(item.url);
            }}
            disabled={!item.url}
            style={styles.answerView}
          >
            <Text
              style={{
                ...styles.answerText,
                color: theme.colors.FAQQuestionToDark,
              }}
            >
              {item.answer}
            </Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={flatlistRef}
      getItemLayout={(_data, index) => ({
        length: hp("3%"),
        offset: hp("3%") * index,
        index,
      })}
      data={answerAndquestions}
      renderItem={_renderAnswerAndQuestions}
      keyExtractor={(_item, i) => i.toString()}
    />
  );
};
export default FaqView;
