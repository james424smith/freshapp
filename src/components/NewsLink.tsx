import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "./StyledText";
import styles from "../styles/AuthStyles";
import { NEWS_ROUTE } from "../constants/routes";

type Props = { navigate: (arg: string) => void };

const NewsLink = (props: Props) => {
  const { navigate } = props;

  return (
    <View>
      <View style={styles.newsLinkView}>
        <TouchableOpacity
          testID={"news-button"}
          onPress={() => navigate(NEWS_ROUTE)}
        >
          <Text style={styles.newsLink}>News</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsLink;
