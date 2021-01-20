import { useEffect, useState, RefObject } from "react";
import { FlatList } from "react-native";
import _ from "lodash";

export const useSelectedQuestion = (
  questionContent: {
    question: string;
    answer: string;
    opened: boolean;
    id: number;
    url?: string;
  }[],
  ref: RefObject<FlatList<{
    question: string;
    answer: string;
    opened: boolean;
    id: number;
    url?: string;
  }> | null>,
  selectedQuestionFromProps?: number
) => {
  const [answerAndquestions, setAnswerAndquestions] = useState<
    {
      question: string;
      answer: string;
      opened: boolean;
      id: number;
      url?: string;
    }[]
  >(questionContent);

  useEffect(() => {
    if (selectedQuestionFromProps) {
      const selectedQuestion = answerAndquestions.find(
        (qAnda) => qAnda.id === selectedQuestionFromProps
      );
      if (selectedQuestion) {
        setAnswerAndquestions(
          _.sortBy(
            [
              ...answerAndquestions.filter(
                (qAnda) => qAnda.id !== selectedQuestionFromProps
              ),
              { ...selectedQuestion, opened: true },
            ],
            (qa) => qa.id
          )
        );
        ref.current &&
          ref.current.scrollToIndex({
            animated: true,
            index: selectedQuestion.id,
          });
      }
    }
  }, [selectedQuestionFromProps]); //eslint-disable-line react-hooks/exhaustive-deps

  return { answerAndquestions, setAnswerAndquestions };
};
