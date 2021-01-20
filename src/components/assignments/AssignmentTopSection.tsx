import React from "react";
import { Avatar } from "react-native-elements";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/AssignmentScreenStyles";
import { ASSIGNMENT_PROFILE_ROUTE } from "../../constants/routes";
import { useNavigation, useTheme } from "@react-navigation/native";

type Props = {
  initials: string;
  source?: { uri: string };
  availabilityDate: string;
};

const AssignmentTopSection = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { initials, source, availabilityDate } = props;
  return (
    <View style={styles.assignmentTopContainerAlignment}>
      <View style={styles.avatarViewStyle}>
        <Avatar
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          testID={"Avatar-press"}
          rounded
          title={initials}
          source={source}
          size="large"
          avatarStyle={styles.avatarStyle}
          onPress={() => navigation.navigate(ASSIGNMENT_PROFILE_ROUTE)}
        />
      </View>
      <View style={styles.availabilityDateContainer}>
        <Text
          style={{ ...styles.nextAvailabilityLabel, color: theme.colors.text }}
        >
          Next Availability Date
        </Text>
        <Text
          style={{ ...styles.nextAvailabilityValue, color: theme.colors.text }}
        >
          {availabilityDate}
        </Text>
      </View>
    </View>
  );
};

export default AssignmentTopSection;
