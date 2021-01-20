import React from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/more_screens/workingClothesStyles";
import { Table, Row, Rows } from "react-native-table-component";
import valueOrDefault from "../../common/valueOrDefault";
import { useTheme } from "@react-navigation/native";

type Props = { headings: string[]; sizeData: (number | undefined)[][] };

const ShoeSizeTable = (props: Props) => {
  const theme = useTheme();
  const { headings, sizeData } = props;
  return (
    <View style={styles.DataContainerRoot}>
      <View
        style={{
          ...styles.shoesContainer,
          backgroundColor: theme.colors.fromBlackToBlue,
        }}
      >
        <View style={styles.tableMarginsStyle}>
          <Text style={styles.shoesTitle}>Shoe Size</Text>
          <View style={styles.tableContainer}>
            <Table
              borderStyle={styles.tableBorderStyle}
              style={{
                ...styles.tableFillStyle,
                backgroundColor: theme.colors.background,
              }}
            >
              <Row
                data={headings}
                style={styles.headingStyle}
                textStyle={{
                  ...styles.dataHeading,
                  color: theme.colors.darkColorOfTable,
                }}
              />
              <Rows
                data={valueOrDefault(sizeData, []) as (number | undefined)[][]}
                textStyle={{
                  ...styles.dataRow,
                  color: theme.colors.darkColorOfTable,
                }}
              />
            </Table>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShoeSizeTable;
