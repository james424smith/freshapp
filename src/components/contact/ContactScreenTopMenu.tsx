import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import Text from "../StyledText";
import { ContactType } from "../../interfaces";
import styles from "../../styles/more_screens/ContactsStyles";
import {
  CREW_MANAGER,
  MANNING_AGENT,
  PORT_AGENT,
} from "../../constants/contactConstants";

const categories = [CREW_MANAGER, MANNING_AGENT, PORT_AGENT];

type Props = {
  handleSelection: (type: ContactType) => void;
  selectedType: ContactType;
};

function setStyleOfButton(type: ContactType, selectedType: ContactType) {
  if (type === selectedType) {
    return styles.activeOpacity;
  } else {
    return styles.inactiveOpacity;
  }
}
function setStyleOfText(type: ContactType, selectedType: ContactType) {
  return type === selectedType
    ? styles.activeTouchableOpacityLabel
    : styles.inactiveTouchableOpacityLabel;
}

const ContactScreenTopMenu = (props: Props) => {
  const { handleSelection, selectedType } = props;

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.horizontalScrollViewContainer}
    >
      <View style={styles.topContainer}>
        {categories.map((category, i) => (
          <TouchableOpacity
            testID={`category-button`}
            style={[
              styles.buttonStyle,
              setStyleOfButton(category, selectedType),
            ]}
            key={i}
            disabled={category === selectedType}
            onPress={() => {
              handleSelection(category);
            }}
          >
            <Text
              style={[
                styles.textButton,
                setStyleOfText(category, selectedType),
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ContactScreenTopMenu;
