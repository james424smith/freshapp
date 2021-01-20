import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import { Newsletters, PressReleases, NewsType } from "../../interfaces";
import styles from "../../styles/more_screens/NewsCardStyles";
import { READ_MORE_NEWS } from "../../constants/NewsConstants";
import { useTheme } from "@react-navigation/native";

type Props = {
  title: string;
  summary: string;
  navigate: (arg1: string, arg2?: unknown) => void;
  newItemType: NewsType;
  newItem: Newsletters | PressReleases;
};

const MoreNewsSection = (props: Props) => {
  const { navigate, newItem, newItemType, summary, title } = props;
  const theme = useTheme();

  const navigateToReadMore = () => {
    navigate(READ_MORE_NEWS, {
      newItem: {
        ...newItem,
        newItemType: newItemType,
      },
    });
  };

  return (
    <View
      style={{
        ...styles.prenewsListContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          ...styles.opacityStyle,
          backgroundColor: theme.colors.primary,
        }}
      >
        <TouchableOpacity
          testID="news-button"
          onPress={() => navigateToReadMore()}
          style={styles.textMargin}
        >
          <Text style={{ ...styles.prenewsHeader, color: theme.colors.text }}>
            {title}
          </Text>
          <Text style={{ ...styles.prenewssummary, color: theme.colors.text }}>
            {summary}
          </Text>
          <TouchableOpacity
            testID={"readmore-button"}
            onPress={() => navigateToReadMore()}
          >
            <Text
              style={{
                ...styles.readMoreText,
                color: theme.colors.newAquaMarineColor,
              }}
            >
              Read more
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreNewsSection;
