import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/CrewManagerStyles";
import { CmPhoto, ContactInfo } from "../../interfaces";
import { handleLink } from "../../common/handleLink";
import valueOrDefault from "../../common/valueOrDefault";
import { getTimeFromTimezone } from "../../common/dateUtils";
import { Avatar } from "react-native-elements";
import { useTheme, Theme, useNavigation } from "@react-navigation/native";

type Props = {
  crewingManagerDetails?: ContactInfo;
  photoSmall?: CmPhoto;
};

export const WebsiteView = (props: { website: string[] }) => {
  const theme = useTheme();
  return (
    <View>
      {props.website.map((website: string, i: number) => (
        <TouchableOpacity
          testID="website-button"
          key={i}
          onPress={() => handleLink("url", website)}
        >
          <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
            Web
          </Text>
          <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
            {valueOrDefault(website, "")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const renderCrewManagerDetails = (
  theme: Theme,
  crewingManager?: ContactInfo,
  photoSmall?: CmPhoto,
  currentTime?: Date
) => {
  const imageUri = photoSmall?.avatar
    ? {
        uri: `data:image/png;base64,${photoSmall?.avatar}`,
      }
    : undefined;

  return [
    <View style={styles.flexView}>
      <View style={styles.firstContainer}>
        <View style={styles.avatarContainerStyle}>
          <View style={styles.avatarViewStyle}>
            <Avatar
              rounded
              size="large"
              title={photoSmall?.initials}
              source={imageUri}
              avatarStyle={styles.avatarStyle}
            />
          </View>
        </View>
      </View>
      <View style={styles.secondContainer}>
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          Crew manager
        </Text>
        <Text
          style={{ ...styles.detailsValueManager, color: theme.colors.text }}
        >
          {valueOrDefault(crewingManager?.name, "-")}
        </Text>
        {currentTime && crewingManager?.timezone && (
          <View style={styles.localTimeView}>
            <Text style={{ ...styles.detailsValue, color: theme.colors.text }}>
              {getTimeFromTimezone(
                currentTime,
                crewingManager?.timezone,
                "HH:mm"
              )}
            </Text>
            <Text style={{ color: theme.colors.text }}> (local time 24hr)</Text>
          </View>
        )}
      </View>
    </View>,
    <View style={styles.firstLineStyle} />,
    <View style={styles.flexView}>
      <View style={styles.columnContainer}>
        {(valueOrDefault(
          crewingManager?.directTelephoneNumbers,
          []
        ) as string[]).map((directTelephoneNumber: string, i: number) => (
          <TouchableOpacity
            key={i}
            testID="directTelephoneNumber-button"
            onPress={() => handleLink("tel", directTelephoneNumber)}
          >
            <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
              Direct phone numbers
            </Text>
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(directTelephoneNumber, "")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.columnContainer}>
        {(valueOrDefault(
          crewingManager?.aohTelephoneNumbers,
          []
        ) as string[]).map((aohTelephoneNumber: string, i: number) => (
          <TouchableOpacity
            key={i}
            testID="aohTelephoneNumber-button"
            onPress={() => handleLink("tel", aohTelephoneNumber)}
          >
            <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
              AOH phone numbers
            </Text>
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(aohTelephoneNumber, "")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.lineStyle} />
    </View>,
    <View>
      {(valueOrDefault(crewingManager?.emailAddress, []) as string[]).map(
        (email: string, i: number) => (
          <TouchableOpacity
            testID="email-button"
            key={i}
            onPress={() => handleLink("mailto", email)}
          >
            <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
              Email
            </Text>
            <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
              {valueOrDefault(email, "")}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>,
    <View>
      <TouchableOpacity
        testID="skype-button"
        onPress={() => handleLink("skype", crewingManager?.skypeAddress)}
      >
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          Skype
        </Text>
        <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
          {valueOrDefault(crewingManager?.skypeAddress, "")}
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={styles.lineStyle} />,
    <WebsiteView
      website={valueOrDefault(crewingManager?.website, []) as string[]}
    />,
    <View>
      <TouchableOpacity
        testID="address-button"
        onPress={() => handleLink("url", crewingManager?.googleMapLink)}
      >
        <Text style={{ ...styles.detailsLabel, color: theme.colors.text }}>
          Address
        </Text>
        <Text style={{ ...styles.detailsValueU, color: theme.colors.text }}>
          {valueOrDefault(crewingManager?.address, "")}
        </Text>
      </TouchableOpacity>
    </View>,
    <View style={styles.endSpace} />,
  ];
};

const CrewManagerContactDetails = (props: Props) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { crewingManagerDetails, photoSmall } = props;
  const navigation = useNavigation();

  useEffect(() => {
    let timer: any;
    navigation.addListener("focus", () => {
      timer = setInterval(() => setCurrentTime(new Date()), 60000);
    });
    return () => {
      clearInterval(timer);
    };
  }, [navigation]);
  const theme = useTheme();

  const managerDetails = renderCrewManagerDetails(
    theme,
    crewingManagerDetails,
    photoSmall,
    currentTime
  );
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollbar}>
        {managerDetails.map((column, i) => (
          <View key={i}>{column}</View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CrewManagerContactDetails;
