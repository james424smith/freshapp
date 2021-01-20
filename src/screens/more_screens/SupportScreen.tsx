import React, { useLayoutEffect } from "react";
import { View, Linking } from "react-native";
import Text from "../../components/StyledText";
import { Button } from "react-native-elements";
import styles from "../../styles/more_screens/SupportStyles";
import Support from "../../../assets/icons/more_screen/017-lifesaver.svg";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import Back from "../../components/BackIcon";

const svgIcon = 80;
const titleText = "Your feedback is valuable";
const paragraphText =
  "Feel free to answer our questionnaire to help us make your experience even better.\nFor troubleshooting help or guidance contact our support team.";

export default () => {
  const navigation = useNavigation();

  const handleLink = async (path: string) => {
    await Linking.openURL(path);
  };
  const theme = useTheme();

  useLayoutEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user) {
        navigation.setOptions({
          headerLeft: () => <Back goBack={true} />,
          headerRight: () => <View />,
          title: "Support",
        });
      } else {
        navigation.setOptions({
          headerShown: false,
        });
      }
    });
  }, [navigation]);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <View style={styles.svgContainer}>
          <Support width={svgIcon} height={svgIcon} />
        </View>
        <Text style={{ ...styles.title, color: theme.colors.text }}>
          {titleText}
        </Text>
        <Text style={{ ...styles.paragraph, color: theme.colors.text }}>
          {paragraphText}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          testID={"questionnaire-button"}
          title="Questionnaire"
          onPress={async () => {
            await handleLink("https://www.surveymonkey.com/r/crewcompanion");
          }}
          disabledTitleStyle={{ color: theme.colors.whiteAndBlack }}
          titleStyle={styles.textOnQuestionnaireButton}
          containerStyle={styles.linkContainer}
          disabledStyle={{
            backgroundColor: theme.colors.DisableSignInButtonColor,
          }}
          buttonStyle={{
            ...styles.questionnaireButton,
            backgroundColor: theme.colors.signInButtonColor,
          }}
        />
        <Button
          testID={"email-button"}
          onPress={async () => {
            await handleLink("mailto:feedback.app@marlowgroup.com");
          }}
          title="Support Team"
          titleStyle={{
            ...styles.textOnSupportTeamButton,
            color: theme.colors.darkColorOfTable,
          }}
          buttonStyle={{
            ...styles.supportTeamButton,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          }}
        />
      </View>
    </View>
  );
};
