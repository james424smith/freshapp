import React from "react";
import { StyleProp, View } from "react-native";
import styles from "../../styles/AssignmentScreenStyles";
import AssignmentBasicInformationComponent from "./AssignmentBasicInformationComponent";
import { AssignmentBasicDetails, AssignmentType, News } from "../../interfaces";
import LatestReleasesSection from "../newsScreen/LatestReleasesSection";
import { splitArrayItems } from "../../common/array_utilities/splitArrayItems";
import { LATEST_RELEASES_ROUTE } from "../../constants/routes";
import { useNavigation, useTheme, Theme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

type Props = {
  availabilityDate: string;
  initials: string;
  imageUri?: { uri: string };
  assignmentType: AssignmentType;
  handleAssignmentType: (assignmentTypeLocal: AssignmentType) => void;
  assignmentDetails?: AssignmentBasicDetails;
  news?: News;
  hasEmployment: boolean;
};

type BasicInfo = {
  containerStyles: StyleProp<unknown>;
  labelStyles: StyleProp<unknown>;
  textValueStyles: StyleProp<unknown>;
  labelValue: string;
  textValue: string;
}[];

function setBasicInfoToShow(
  theme: Theme,
  assignmentDetails?: AssignmentBasicDetails
) {
  return [
    {
      containerStyles: {
        ...styles.joiningDateItem,
        borderColor: theme.colors.newAquaMarineColor,
      },

      labelStyles: {
        ...styles.textLabel,
        color: theme.colors.newAquaMarineColor,
      },
      textValueStyles: {
        ...styles.textValue,
        color: theme.colors.newAquaMarineColor,
      },
      labelValue: "Joining Date",
      textValue: valueOrDefault(assignmentDetails?.joiningDate, "") as string,
    },
    {
      containerStyles: {
        ...styles.endOfContractItem,
        borderColor: theme.colors.greenToDark,
      },
      labelStyles: {
        ...styles.textLabelOfEOC,
        color: theme.colors.greenToDark,
      },
      textValueStyles: {
        ...styles.textValueOfEOC,
        color: theme.colors.greenToDark,
      },
      labelValue: "EOC Date",
      textValue: valueOrDefault(
        assignmentDetails?.endOfContractDate,
        ""
      ) as string,
    },
    {
      containerStyles: {
        ...styles.secondaryItem,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.greyBorderToDark,
      },
      labelStyles: {
        ...styles.secondaryTextLabel,
        color: theme.colors.fadedText,
      },
      textValueStyles: {
        ...styles.secondaryTextValue,
        color: theme.colors.text,
      },
      labelValue: "Port (tentative)",
      textValue: valueOrDefault(assignmentDetails?.port, "") as string,
    },
    {
      containerStyles: {
        ...styles.secondaryItem,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.greyBorderToDark,
      },
      labelStyles: {
        ...styles.secondaryTextLabel,
        color: theme.colors.fadedText,
      },
      textValueStyles: {
        ...styles.secondaryTextValue,
        color: theme.colors.text,
      },
      labelValue: "Vessel Name",
      textValue: valueOrDefault(assignmentDetails?.vesselName, "") as string,
    },
    {
      containerStyles: {
        ...styles.secondaryItem,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.greyBorderToDark,
      },
      labelStyles: {
        ...styles.secondaryTextLabel,
        color: theme.colors.fadedText,
      },
      textValueStyles: {
        ...styles.secondaryTextValue,
        color: theme.colors.text,
      },
      labelValue: "Vessel Flag",
      textValue: valueOrDefault(assignmentDetails?.vesselFlag, "") as string,
    },
    {
      containerStyles: {
        ...styles.secondaryItem,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.greyBorderToDark,
      },
      labelStyles: {
        ...styles.secondaryTextLabel,
        color: theme.colors.fadedText,
      },
      textValueStyles: {
        ...styles.secondaryTextValue,
        color: theme.colors.text,
      },
      labelValue: "Vessel IMO No.",
      textValue: valueOrDefault(
        assignmentDetails?.vesselImoNumber,
        ""
      ) as string,
    },
  ];
}

const AssignmentDetails = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { assignmentDetails, news, hasEmployment } = props;

  const renderLatestNews = (newsLocal?: News) => {
    const pressReleases = newsLocal?.pressReleases ?? [];
    const { latestItems } = splitArrayItems(pressReleases, 3);
    return (
      <LatestReleasesSection
        items={latestItems}
        navigate={navigation.navigate}
        route={LATEST_RELEASES_ROUTE}
      />
    );
  };

  const basicInfo: BasicInfo = setBasicInfoToShow(theme, assignmentDetails);

  return (
    <View>
      <View style={styles.row}>
        {hasEmployment
          ? (valueOrDefault(basicInfo, []) as BasicInfo).map((info, key) => (
              <AssignmentBasicInformationComponent
                key={key}
                containerStyles={info.containerStyles}
                labelStyles={info.labelStyles}
                textValueStyles={info.textValueStyles}
                labelValue={info.labelValue}
                textValue={info.textValue}
              />
            ))
          : renderLatestNews(news)}
      </View>
    </View>
  );
};

export default AssignmentDetails;
