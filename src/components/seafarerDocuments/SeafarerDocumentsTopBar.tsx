import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Text from "../StyledText";
import { Categories } from "../../interfaces";
import styles from "../../styles/more_screens/SeafarerDocumentationStyles";
import { useTheme, Theme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

type Props = {
  categories?: Categories[];
  handleDocumentsToShow: (category: string) => void;
  selectedCategory: string;
};

function setStyleOfButton(category: string, selectedCategory: string) {
  if (category === selectedCategory) {
    return styles.activeOpacity;
  } else {
    return styles.inactiveOpacity;
  }
}
function setStyleOfText(
  theme: Theme,
  category: string,
  selectedCategory: string
) {
  return category === selectedCategory
    ? {
        ...styles.activeTouchableOpacityLabel,
        color: theme.colors.newAquaMarineColor,
      }
    : {
        ...styles.inactiveTouchableOpacityLabel,
        color: theme.colors.inactiveTouchableOpacityStyle,
      };
}

const SeafarerDocumentsTopBar = (props: Props) => {
  const { categories, handleDocumentsToShow, selectedCategory } = props;
  const theme = useTheme();
  return (
    <ScrollView horizontal={true}>
      <View
        style={{ ...styles.root, backgroundColor: theme.colors.background }}
      >
        <View style={styles.topContainer}>
          {(valueOrDefault(categories, []) as Categories[]).map(
            (category, i) => (
              <TouchableOpacity
                testID={`category-button-${i}`}
                style={[
                  styles.buttonStyle,
                  setStyleOfButton(category.id, selectedCategory),
                ]}
                key={i}
                disabled={category.id === selectedCategory}
                onPress={() => {
                  handleDocumentsToShow(category.id);
                }}
              >
                <Text
                  style={[setStyleOfText(theme, category.id, selectedCategory)]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
        <View style={styles.topSeparateLine} />
      </View>
    </ScrollView>
  );
};

export default SeafarerDocumentsTopBar;
