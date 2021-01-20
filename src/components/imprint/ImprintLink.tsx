import React from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/AuthStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const IMPRINT_SCREEN = "Imprint";

type Props = { navigate: (arg: string) => void };

const ImprintLink = (props: Props) => {
  const { navigate } = props;
  return (
    <View style={styles.imprintLinkContainer}>
      <View style={styles.imprintLinkView}>
        <TouchableOpacity
          testID="imprint-button"
          onPress={() => navigate(IMPRINT_SCREEN)}
        >
          <Text style={styles.imprintLink}>Imprint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImprintLink;
