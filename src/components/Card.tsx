import React from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styles from "../styles/more_screens/NewsCardStyles";
import Text from "./StyledText";
import { useTheme, Theme } from "@react-navigation/native";

type Props = {
  title: string;
  description?: string;
  containerStyles?: any;
  titleStyles?: any;
  descriptionStyle?: any;
  hasReadMore?: boolean;
  screen?: string;
  summary?: string;
  navigate: (arg: string) => void;
  item: any;
};

function handlePress(
  navigate: (arg1: string, arg2: unknown) => void,
  item: any,
  hasReadMore = false,
  screen?: string
) {
  if (hasReadMore && screen) {
    navigate(screen, {
      newItem: { ...item },
    });
  }
}

function showReadMore(
  navigate: (arg: string) => void,
  theme: Theme,
  item: any,
  hasReadMore = false,
  screen?: string
) {
  return screen && hasReadMore ? (
    <TouchableOpacity
      testID={"read-more-card-button"}
      onPress={() => handlePress(navigate, item, hasReadMore, screen)}
    >
      <Text
        style={{
          ...styles.readMoreText,
          color: theme.colors.newAquaMarineColor,
        }}
      >
        Read More
      </Text>
    </TouchableOpacity>
  ) : undefined;
}

const Card = (props: Props) => {
  const { item, navigate, title, hasReadMore, screen, summary } = props;
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback
      testID={"card-button"}
      style={styles.rowContainer}
      onPress={() => handlePress(navigate, item, hasReadMore, screen)}
    >
      <View
        style={{
          ...styles.newsContainer,
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text style={{ ...styles.titleHeader, color: theme.colors.text }}>
          {title}
        </Text>
        <Text
          numberOfLines={4}
          style={{ ...styles.summaryText, color: theme.colors.text }}
        >
          {summary}
        </Text>
        {showReadMore(navigate, theme, item, hasReadMore, screen)}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
