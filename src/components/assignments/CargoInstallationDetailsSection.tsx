import React, { ReactElement } from "react";
import { View } from "react-native";
import Text from "../StyledText";
import styles from "../../styles/AssignmentScreenStyles";
import CargoInstallationComponent from "./CargoInstallationComponent";
import { CargoItemData, CargoDataTable } from "../../interfaces";
import valueOrDefault from "../../common/valueOrDefault";
import { useTheme } from "@react-navigation/native";
type Props = {
  cargoInstallationTable?: CargoDataTable[];
};

const CargoInstallationDetailsSection = (props: Props) => {
  const { cargoInstallationTable } = props;
  const theme = useTheme();
  return (
    <View
      style={{
        ...styles.cargoDetailsContainerAlignment,
        backgroundColor: theme.colors.primary,
      }}
    >
      <View>
        <View style={styles.row}>
          <Text style={{ ...styles.cargoTitle, color: theme.colors.text }}>
            Cargo Installation
          </Text>
        </View>
        <View style={styles.cargoDataContainer}>
          {(valueOrDefault(cargoInstallationTable, []) as CargoDataTable[]).map(
            (cargoItem: CargoDataTable, i: number) => (
              <View key={i}>
                {cargoItem.map(
                  (
                    cargoLineItem: CargoItemData,
                    item: number
                  ): ReactElement => (
                    <CargoInstallationComponent
                      key={item}
                      textLabel={cargoLineItem.label}
                      textValue={cargoLineItem.value}
                    />
                  )
                )}
                <Text />
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};

export default CargoInstallationDetailsSection;
