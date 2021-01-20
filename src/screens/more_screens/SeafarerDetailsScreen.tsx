import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, View, Image, Alert, RefreshControl } from "react-native";
import Text from "../../components/StyledText";
import styles from "../../styles/SeafarerDetailsStyles";
import { BasicInfo, NextOfKin, AvatarDetails, Badges } from "../../interfaces";
import _ from "lodash";
import { Avatar } from "react-native-elements";
import {
  getAllSeafarerDetails,
  setRefreshingSeafarerDetails,
} from "../../redux/actions";

import { IRootReducerType } from "../../redux/reducers";
import BADGE25YEARS_ICON from "../../../assets/icons/more_screen/years_25.png";
import BADGE10YEARS_ICON from "../../../assets/icons/more_screen/years_10.png";
import { useTheme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

const iconToUse = (badges?: Badges) => {
  if (badges && badges.length) {
    switch (badges[0].badge) {
      case "10YEARS":
        return BADGE10YEARS_ICON;
      case "25YEARS":
        return BADGE25YEARS_ICON;
      default:
        throw Error("Could not find appropriate badge");
    }
  } else {
    return null;
  }
};

const IconsView = ({
  photoSmall,
  imageUri,
  badgesDetails,
}: {
  photoSmall?: AvatarDetails;
  imageUri?: {
    uri: string;
  };
  badgesDetails?: Badges;
}) => {
  return (
    <View style={styles.iconsView}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarViewStyle}>
          <Avatar
            rounded
            title={photoSmall?.initials}
            size="large"
            source={imageUri}
            avatarStyle={styles.avatarStyle}
          />
        </View>
      </View>

      <View style={styles.badgeContainer}>
        <Image source={iconToUse(badgesDetails)} />
      </View>
    </View>
  );
};

const BmiInformation = ({ basicInfo }: { basicInfo: BasicInfo }) => {
  const theme = useTheme();
  return (
    <View style={styles.outerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.firstContainer}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>BMI</Text>
          <Text style={{ ...styles.information, color: theme.colors.text }}>
            {basicInfo.bmi}
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>
            Height
          </Text>
          <Text style={{ ...styles.information, color: theme.colors.text }}>
            {basicInfo.height} m
          </Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>
            Weight
          </Text>
          <Text style={{ ...styles.information, color: theme.colors.text }}>
            {basicInfo.weight} kg
          </Text>
        </View>
      </View>
    </View>
  );
};

const CommunicationInformation = ({ basicInfo }: { basicInfo: BasicInfo }) => {
  const theme = useTheme();
  return (
    <View style={styles.outerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.halfContainer}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>
            Mobile
          </Text>
          {(valueOrDefault(basicInfo.mobile, []) as string[]).map(
            (mobileNo: string, i: number) => (
              <Text
                key={i}
                style={{ ...styles.information, color: theme.colors.text }}
              >
                {mobileNo}
              </Text>
            )
          )}
        </View>
        <View style={styles.half2Container}>
          <Text style={{ ...styles.label, color: theme.colors.text }}>
            Address
          </Text>
          {(valueOrDefault(basicInfo.address, []) as string[]).map(
            (address: string, i: number) => (
              <Text
                key={i}
                style={{ ...styles.information, color: theme.colors.text }}
              >
                {address}
              </Text>
            )
          )}
        </View>
      </View>
    </View>
  );
};

const SeafarerDetailsScreen = () => {
  const [alreadyPressed, setAlreadyPressed] = useState<boolean>(false);

  const {
    basicInfo,
    isLoadingData,
    nextOfKin,
    photoSmall,
    badgesDetails,
  } = useSelector<
    IRootReducerType,
    {
      basicInfo?: BasicInfo;
      isLoadingData: boolean;
      nextOfKin?: NextOfKin;
      photoSmall?: AvatarDetails;
      badgesDetails?: Badges;
    }
  >(({ seafarerDetails }) => {
    return {
      basicInfo: seafarerDetails.seafarerDetails?.basicInfo,
      isLoadingData: seafarerDetails.loader,
      nextOfKin: seafarerDetails.seafarerDetails?.nextOfKin,
      photoSmall: seafarerDetails.seafarerDetails?.photoSmall,
      badgesDetails: seafarerDetails.seafarerBadgesDetails,
    };
  });

  const dispatch = useDispatch();
  const theme = useTheme();

  const refreshData = () => {
    dispatch(setRefreshingSeafarerDetails(true));
    dispatch(getAllSeafarerDetails());
  };

  useEffect(() => {
    if (!isLoadingData && !!_.isEmpty(nextOfKin) && !alreadyPressed) {
      setAlreadyPressed(true);
      Alert.alert(
        "",
        "Your NOK consent form is either not uploaded or approved. Please contact your local agent to arrange. Once done, you will be able to view your NOK details in the App.",
        [
          {
            text: "OK",
            onPress: () => setAlreadyPressed(true),
          },
        ]
      );
    }
  }, [nextOfKin, isLoadingData, alreadyPressed]);

  const renderSeafarerDetails = (): any => {
    const isNextOfKin = !_.isEmpty(nextOfKin);
    const imageUri = photoSmall?.avatar
      ? {
          uri: `data:image/png;base64,${photoSmall?.avatar}`,
        }
      : undefined;

    return (
      basicInfo && (
        <ScrollView>
          <View
            style={{
              ...styles.basicDataView,
              backgroundColor: theme.colors.primary,
            }}
          >
            <IconsView
              badgesDetails={badgesDetails}
              imageUri={imageUri}
              photoSmall={photoSmall}
            />
            <Text
              style={{ ...styles.informationBold, color: theme.colors.text }}
            >
              {basicInfo.firstName} {basicInfo.familyName}
            </Text>
            <Text style={{ ...styles.idStyle, color: theme.colors.text }}>
              {basicInfo.employeeId}
            </Text>
          </View>
          <BmiInformation basicInfo={basicInfo} />
          <View style={styles.lineStyle} />
          <View style={styles.outerContainer}>
            <View style={styles.columnContainer}>
              <View style={styles.halfContainer}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Date of birth
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {basicInfo.dateOfBirth}
                </Text>
              </View>
              <View style={styles.half2Container}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Place of birth
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {valueOrDefault(basicInfo.placeOfBirth, "")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.lineStyle} />

          <View style={styles.outerContainer}>
            <View style={styles.columnContainer}>
              <View style={styles.halfContainer}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Marital status
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {basicInfo.maritalStatus}
                </Text>
              </View>
              <View style={styles.half2Container}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Children
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {basicInfo.numberOfChildren}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.lineStyle} />

          <CommunicationInformation basicInfo={basicInfo} />

          <View style={styles.lineStyle} />

          <View style={styles.outerContainer}>
            <View style={styles.columnContainer}>
              <View style={styles.halfContainer}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Nearest Airport
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {basicInfo.nearestAirport}
                </Text>
              </View>
              <View style={styles.half2Container}>
                <Text style={{ ...styles.label, color: theme.colors.text }}>
                  Alternative Airports
                </Text>
                <Text
                  style={{ ...styles.information, color: theme.colors.text }}
                >
                  {basicInfo.alternateAirport}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              ...styles.spaceBetweenSections,
              backgroundColor: theme.colors.background,
            }}
          />

          {isNextOfKin && (
            <View
              style={{
                ...styles.NoKview,
                backgroundColor: theme.colors.primary,
              }}
            >
              <View style={styles.outerContainer}>
                <Text style={{ ...styles.NoKtitle, color: theme.colors.text }}>
                  Next of kin
                </Text>
                <View style={styles.fullContainer}>
                  <Text style={{ ...styles.label, color: theme.colors.text }}>
                    Name
                  </Text>
                  <Text
                    style={{ ...styles.information, color: theme.colors.text }}
                  >
                    {nextOfKin?.firstName} {nextOfKin?.familyName}
                  </Text>
                </View>

                <View style={styles.fullContainer}>
                  <Text style={{ ...styles.label, color: theme.colors.text }}>
                    Relationship
                  </Text>
                  <Text
                    style={{ ...styles.information, color: theme.colors.text }}
                  >
                    {nextOfKin?.relationship}
                  </Text>
                </View>
              </View>
              <View style={styles.NoKvalueSpace} />

              <View style={styles.outerContainer}>
                <View style={styles.columnContainer}>
                  <View style={styles.halfContainer}>
                    <Text style={{ ...styles.label, color: theme.colors.text }}>
                      Telephone
                    </Text>
                    <Text
                      style={{
                        ...styles.information,
                        color: theme.colors.text,
                      }}
                    >
                      {nextOfKin?.telephone}
                    </Text>
                  </View>
                  <View style={styles.half2Container}>
                    <Text style={{ ...styles.label, color: theme.colors.text }}>
                      Mobile
                    </Text>
                    <Text
                      style={{
                        ...styles.information,
                        color: theme.colors.text,
                      }}
                    >
                      {nextOfKin?.mobile}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.endSpace} />
            </View>
          )}
        </ScrollView>
      )
    );
  };

  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.root}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingData}
          onRefresh={() => refreshData()}
        />
      }
    >
      {renderSeafarerDetails()}
    </ScrollView>
  );
};

export default SeafarerDetailsScreen;
