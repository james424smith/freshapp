import React from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/workingClothesStyles";
import { ClotheData } from "../../interfaces/workingClothesTypes";
import valueOrDefault from "../../common/valueOrDefault";
import { useTheme, Theme } from "@react-navigation/native";
type Props = { clothesTable: ClotheData[] };

const renderWorkingClothesItem = (
  theme: Theme,
  clotheItem: ClotheData,
  key: number
) => {
  return (
    <View
      key={key}
      style={{
        ...styles.clotheItemView,
        backgroundColor: theme.colors.primary,
      }}
    >
      <Text style={{ ...styles.dateValueSmall, color: theme.colors.text }}>
        {valueOrDefault(clotheItem.issueDate, "")}
      </Text>
      <View>
        <View style={styles.itemContainer}>
          <Text
            style={{ ...styles.detailsValueLarge, color: theme.colors.text }}
          >
            {valueOrDefault(clotheItem.item, "")}
          </Text>
        </View>
        <View style={styles.moreDetailsContainer}>
          <View style={styles.clotheLabels}>
            <Text
              style={{ ...styles.labelsValueBold, color: theme.colors.text }}
            >
              {"Qty:"}
            </Text>
            <Text
              style={{ ...styles.labelsValueBold, color: theme.colors.text }}
            >
              {"Agent:"}
            </Text>
            <Text
              style={{ ...styles.labelsValueBold, color: theme.colors.text }}
            >
              {"Vessel:"}
            </Text>
          </View>
          <View style={styles.moreDetailsValues}>
            <Text
              style={{ ...styles.detailsValueLarge, color: theme.colors.text }}
            >
              {valueOrDefault(clotheItem.quantity, "")}
            </Text>
            <Text
              style={{ ...styles.detailsValueLarge, color: theme.colors.text }}
            >
              {valueOrDefault(clotheItem.issuingAgentName, "")}
            </Text>
            <Text
              style={{ ...styles.detailsValueLarge, color: theme.colors.text }}
            >
              {valueOrDefault(clotheItem.vesselName, "")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
};

const ClotheItemsList = (props: Props) => {
  const { clothesTable } = props;
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.DataContainerRoot,
        backgroundColor: theme.colors.primary,
      }}
    >
      <View style={styles.clothesContainer}>
        <Text style={{ ...styles.clothesTitle, color: theme.colors.text }}>
          Clothes Allocation
        </Text>
        <View style={styles.clotheDataList}>
          {clothesTable.map((clotheItem: ClotheData, i: number) =>
            renderWorkingClothesItem(theme, clotheItem, i)
          )}
        </View>
      </View>
    </View>
  );
};

export default ClotheItemsList;
