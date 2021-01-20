import React from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles, {
  arrowHeight,
  arrowWidth,
} from "../../styles/more_screens/SeaServiceDetailsStyles";
import { SeaServiceRecord } from "../../interfaces/seaServiceDetailsTypes";
import Arrow from "../../../assets/icons/more_screen/long-arrow.svg";
import { useTheme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

type Props = { seaServiceTable: SeaServiceRecord[]; isMarlow: boolean };

const NonMarlowSeaServiceList = (props: Props) => {
  const { seaServiceTable, isMarlow } = props;
  const theme = useTheme();

  const renderSeaServiceItem = (
    seaServiceItem: SeaServiceRecord,
    key: number
  ) => {
    const marlowSpecificData = isMarlow
      ? {
          styles: styles.dateValueSmall,
          fallback: "",
          arrowContainerStyles: styles.arrowContainer,
        }
      : {
          styles: styles.dateValueBold,
          fallback: "N/A",
          arrowContainerStyles: styles.nonMarlowArrowContainer,
        };

    return (
      <View key={key}>
        <View style={styles.serviceDataContainer}>
          <View style={styles.topViewContainer}>
            <View style={styles.leftContainer}>
              <Text
                style={{
                  ...marlowSpecificData.styles,
                  color: theme.colors.text,
                }}
              >
                {valueOrDefault(
                  seaServiceItem.signOnDate,
                  marlowSpecificData.fallback
                )}
              </Text>
              {isMarlow && (
                <Text
                  style={{ ...styles.portValueBold, color: theme.colors.text }}
                >
                  {valueOrDefault(
                    seaServiceItem.signOnPort,
                    marlowSpecificData.fallback
                  )}
                </Text>
              )}
            </View>
            <View style={marlowSpecificData.arrowContainerStyles}>
              <Arrow
                height={arrowHeight}
                width={arrowWidth}
                fill={theme.colors.blackAndWhite}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text
                style={{
                  ...marlowSpecificData.styles,
                  color: theme.colors.text,
                }}
              >
                {valueOrDefault(
                  seaServiceItem.signOffDate,
                  marlowSpecificData.fallback
                )}
              </Text>
              {isMarlow && (
                <Text
                  style={{ ...styles.portValueBold, color: theme.colors.text }}
                >
                  {!seaServiceItem.signOffPort
                    ? "To be determined"
                    : seaServiceItem.signOffPort}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.bottomViewContainer}>
            <View style={styles.labelsContainer}>
              <Text style={{ ...styles.labelsValue, color: theme.colors.text }}>
                {"Rank:"}
              </Text>
              <Text style={{ ...styles.labelsValue, color: theme.colors.text }}>
                {"IMO:"}
              </Text>
              <Text style={{ ...styles.labelsValue, color: theme.colors.text }}>
                {"Vessel:"}
              </Text>
            </View>
            <View style={styles.otherDataContainer}>
              <Text
                style={{ ...styles.detailsValueBold, color: theme.colors.text }}
              >
                {valueOrDefault(
                  seaServiceItem.rank,
                  marlowSpecificData.fallback
                )}
              </Text>
              <Text
                style={{ ...styles.detailsValueBold, color: theme.colors.text }}
              >
                {valueOrDefault(
                  seaServiceItem.vesselIMONumber,
                  marlowSpecificData.fallback
                )}
              </Text>
              <Text
                style={{ ...styles.detailsValueBold, color: theme.colors.text }}
              >
                {valueOrDefault(
                  seaServiceItem.vesselName,
                  marlowSpecificData.fallback
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.lineStyle}>
          <Text />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.DataContainerRoot}>
      <View style={styles.seaServiceContainer}>
        <View>
          {seaServiceTable.map((seaServiceItem: SeaServiceRecord, i: number) =>
            renderSeaServiceItem(seaServiceItem, i)
          )}
        </View>
      </View>
    </View>
  );
};

export default NonMarlowSeaServiceList;
