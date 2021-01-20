import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/ManningAgentStyles";
import { PortAgent } from "../../interfaces";
import { handleLink } from "../../common/handleLink";
import { useTheme, Theme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";
import { WebsiteView } from "./CrewManagerContactDetails";
type Props = { portAgentDetails?: PortAgent };

const renderPortAgentDetails = (theme: Theme, portAgent?: PortAgent) => {
  return [
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Port Agent Name
      </Text>
      <Text style={{ ...styles.detailsValue, color: theme.colors.text }}>
        {valueOrDefault(portAgent?.name, "-")}
      </Text>
    </View>,
    <View style={styles.numbersView}>
      <View style={styles.columnContainer}>
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          Direct Phone Numbers
        </Text>
        {(valueOrDefault(
          portAgent?.directTelephoneNumbers,
          []
        ) as string[]).map((directTelephoneNumber: string, i: number) => (
          <TouchableOpacity
            key={i}
            testID="directTelephoneNumber-button"
            onPress={() => handleLink("tel", directTelephoneNumber)}
          >
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(directTelephoneNumber, "")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.columnContainer}>
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          AOH Phone Numbers
        </Text>
        {(valueOrDefault(portAgent?.aohTelephoneNumbers, []) as string[]).map(
          (aohTelephoneNumber: string, i: number) => (
            <TouchableOpacity
              key={i}
              testID="aohTelephoneNumber-button"
              onPress={() => handleLink("tel", aohTelephoneNumber)}
            >
              <Text
                style={{ ...styles.detailsValueU, color: theme.colors.text }}
              >
                {valueOrDefault(aohTelephoneNumber, "")}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>,
    <View style={styles.lineStyle} />,
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Email
      </Text>
      {(valueOrDefault(portAgent?.emailAddress, []) as string[]).map(
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
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Skype
      </Text>
      <TouchableOpacity
        testID="skype-button"
        onPress={() => handleLink("skype", portAgent?.skypeAddress)}
      >
        <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
          {valueOrDefault(portAgent?.skypeAddress, "")}
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={styles.lineStyle} />,
    <WebsiteView
      website={valueOrDefault(portAgent?.website, []) as string[]}
    />,
    <View>
      <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
        Address
      </Text>
      <TouchableOpacity
        testID="address-button"
        onPress={() => handleLink("url", portAgent?.googleMapLink)}
      >
        <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
          {valueOrDefault(portAgent?.address, "")}
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={styles.endSpace} />,
  ];
};

const PortAgentContactDetails = (props: Props) => {
  const { portAgentDetails } = props;
  const theme = useTheme();
  const agentDetails = renderPortAgentDetails(theme, portAgentDetails);

  return (
    <ScrollView style={styles.root}>
      {agentDetails.map((column, i) => (
        <View key={i}>{column}</View>
      ))}
    </ScrollView>
  );
};

export default PortAgentContactDetails;
