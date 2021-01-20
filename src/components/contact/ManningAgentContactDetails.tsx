import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/ManningAgentStyles";
import { ManningAgent } from "../../interfaces";
import { handleLink } from "../../common/handleLink";
import { useTheme, Theme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";
type Props = { manningAgentDetails?: ManningAgent };

const renderManningAgentDetails = (
  theme: Theme,
  manningAgent?: ManningAgent
) => {
  const renderPhoneNumber = (
    phoneNumber: string,
    i: number,
    testID: string
  ) => (
    <TouchableOpacity
      testID={testID}
      key={i}
      onPress={() => handleLink("tel", phoneNumber)}
    >
      <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
        {valueOrDefault(phoneNumber, "")}
      </Text>
    </TouchableOpacity>
  );

  return [
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Manning Agent Name
      </Text>
      <Text style={{ ...styles.detailsValue, color: theme.colors.text }}>
        {valueOrDefault(manningAgent?.name, "-")}
      </Text>
    </View>,
    <View style={styles.numbersView}>
      <View style={styles.columnContainer}>
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          Direct Phone Numbers
        </Text>
        {(valueOrDefault(
          manningAgent?.directTelephoneNumbers,
          []
        ) as string[]).map((phoneNumber: string, i: number) =>
          renderPhoneNumber(phoneNumber, i, "directTelephoneNumber-button")
        )}
      </View>
      <View style={styles.columnContainer}>
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          AOH Phone Numbers
        </Text>
        {(valueOrDefault(
          manningAgent?.aohTelephoneNumbers,
          []
        ) as string[]).map((phoneNumber: string, i: number) =>
          renderPhoneNumber(phoneNumber, i, "aohTelephoneNumber-button")
        )}
      </View>
    </View>,
    <View style={styles.lineStyle} />,
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Email
      </Text>
      {(valueOrDefault(manningAgent?.emailAddress, []) as string[]).map(
        (email: string, i: number) => (
          <TouchableOpacity
            testID="email-button"
            key={i}
            onPress={() => handleLink("mailto", email)}
          >
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(email, "")}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>,
    <TouchableOpacity
      testID="skype-button"
      onPress={() => handleLink("skype", manningAgent?.skypeAddress)}
    >
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Skype
      </Text>
      <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
        {valueOrDefault(manningAgent?.skypeAddress, "")}
      </Text>
    </TouchableOpacity>,
    <View style={styles.lineStyle} />,
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Web
      </Text>
      {(valueOrDefault(manningAgent?.website, []) as string[]).map(
        (website: string, i: number) => (
          <TouchableOpacity
            testID="website-button"
            key={i}
            onPress={() => handleLink("url", website)}
          >
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(website, "")}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>,
    <TouchableOpacity
      testID="address-button"
      onPress={() => handleLink("url", manningAgent?.googleMapLink)}
    >
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Address
      </Text>
      <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
        {valueOrDefault(manningAgent?.address, "")}
      </Text>
    </TouchableOpacity>,
    <View style={styles.endSpace} />,
  ];
};

const ManningAgentContactDetails = (props: Props) => {
  const { manningAgentDetails } = props;
  const theme = useTheme();
  const agentDetails = renderManningAgentDetails(theme, manningAgentDetails);

  return (
    <ScrollView style={styles.root}>
      {agentDetails.map((column, i) => (
        <View key={i}>{column}</View>
      ))}
    </ScrollView>
  );
};

export default ManningAgentContactDetails;
