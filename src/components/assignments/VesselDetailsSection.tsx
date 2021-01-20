import React from "react";
import { View, Image } from "react-native";
import styles from "../../styles/AssignmentScreenStyles";
import Text from "../StyledText";
import { VesselDetails } from "../../interfaces";
import { Theme, useTheme } from "@react-navigation/native";
type Props = {
  vesselDetails?: VesselDetails;
};

const renderVesselDetails = (theme: Theme, vesselDetails?: VesselDetails) => {
  return (
    <View>
      <View style={styles.vesselDetails}>
        <View style={styles.columnsContainer}>
          <View>
            <Text
              style={{
                ...styles.vesselDetailsLabel,
                color: theme.colors.text,
              }}
            >
              {"Vessel Name"}
            </Text>
            <Text
              style={{
                ...styles.vesselDetailsValue,
                color: theme.colors.text,
              }}
            >
              {vesselDetails?.name}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"IMO"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.vesselImoNumber}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Flag"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.flag}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"GT"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.grossTonnage}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"DWT"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.deadWeightTonnage}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Draught"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.draught}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Beam"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.beam}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Length o.a."}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.lengthOverall}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Length b.p."}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.lengthBetweenPerpendiculars}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.lineStyle} />
      <View style={styles.vesselDetails}>
        <View style={styles.columnsContainer}>
          <View>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Main engine series"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.mainEngineSeries}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Main engine marker"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.mainEngineMaker}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"Main engine output"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.mainEngineOutput}
            </Text>
          </View>
        </View>
        <View style={styles.columnsContainer}>
          <View style={styles.firstContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"ECDIS Manufacturer"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.ecdisManufacture}
            </Text>
          </View>

          <View style={styles.secondContainerWidth}>
            <Text
              style={{ ...styles.vesselDetailsLabel, color: theme.colors.text }}
            >
              {"ECDIS Model"}
            </Text>
            <Text
              style={{ ...styles.vesselDetailsValue, color: theme.colors.text }}
            >
              {vesselDetails?.ecdisModel}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const VesselDetailsSection = (props: Props) => {
  const { vesselDetails } = props;
  const theme = useTheme();
  const imageUri =
    vesselDetails?.vesselImage &&
    `data:image/png;base64,${vesselDetails?.vesselImage}`;

  return (
    <View
      style={{
        ...styles.outerContainer,
        backgroundColor: theme.colors.background,
      }}
    >
      <Image
        style={styles.vesselImageStyle}
        source={{
          uri: imageUri,
        }}
      />
      <View style={styles.row}>
        <Text style={{ ...styles.vesselTitle, color: theme.colors.text }}>
          Vessel
        </Text>
        <Text style={styles.vesselTitle} />
      </View>
      <View style={styles.vesselDetailsContainer}>
        {renderVesselDetails(theme, vesselDetails)}
      </View>
    </View>
  );
};

export default VesselDetailsSection;
