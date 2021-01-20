import React from "react";
import { View } from "react-native";
import { Flight } from "../../interfaces/assignmentDetailsTypes";
import styles from "../../styles/FlightCardStyles";
import Dash from "react-native-dash";
import Text from "../StyledText";

import FlightIcon from "../../../assets/icons/more_screen/flights.svg";
import { useTheme, Theme } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  flight: Flight;
};
const renderFlightNumber = (theme: Theme, flightNumber?: string) => {
  const isCancel = flightNumber?.includes(" (CANCEL)");

  return isCancel ? (
    <View style={styles.flightNumberContainer}>
      <Text style={{ ...styles.boldDetails, color: theme.colors.text }}>
        {flightNumber?.substr(0, flightNumber.indexOf(" (CANCEL)"))}
      </Text>
      <Text style={styles.boldDetailsCancel}> (CANCEL)</Text>
    </View>
  ) : (
    <Text style={{ ...styles.boldDetails, color: theme.colors.text }}>
      {flightNumber}
    </Text>
  );
};

export default (props: Props) => {
  const { flight } = props;
  const theme = useTheme();
  const flightsIcon = wp("50%");
  return (
    <View
      style={{ ...styles.ticketClass, backgroundColor: theme.colors.primary }}
    >
      <View style={styles.planeImgOnTop}>
        <FlightIcon
          fill={theme.colors.flightColorToDarkMode}
          width={flightsIcon}
        />
      </View>
      <View style={styles.rowView}>
        <View style={styles.airportDataView}>
          <Text style={{ ...styles.textAirportCode, color: theme.colors.text }}>
            {flight.fromAirport}
          </Text>
          <Text style={{ ...styles.textAirportName, color: theme.colors.text }}>
            {flight.fromAirportCity}
          </Text>
          <Text style={{ ...styles.timeStyle, color: theme.colors.text }}>
            {flight.departureTime}
          </Text>
        </View>
        <View style={styles.dashView}>
          <Text
            style={{
              ...styles.dashStyle,
              color: theme.colors.blackAndWhite,
            }}
          >
            -
          </Text>
        </View>
        <View style={styles.airportDataView}>
          <Text style={{ ...styles.textAirportCode, color: theme.colors.text }}>
            {flight.toAirport}
          </Text>
          <Text style={{ ...styles.textAirportName, color: theme.colors.text }}>
            {flight.toAirportCity}
          </Text>
          <Text style={{ ...styles.timeStyle, color: theme.colors.text }}>
            {flight.arrivalTime}
          </Text>
        </View>
      </View>
      <View style={styles.ticketLine}>
        <View
          style={{
            ...styles.leftHalfCircle,
            backgroundColor: theme.colors.newBackgroundColor,
          }}
        />
        <View style={styles.dashViewStyle}>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={2}
            dashColor={theme.colors.newBackgroundColor}
            style={styles.dashLineStyle}
          />
        </View>
        <View
          style={{
            ...styles.rightHalfCircle,
            backgroundColor: theme.colors.newBackgroundColor,
          }}
        />
      </View>
      <View style={styles.rowView}>
        <View style={styles.firstColumnDetails}>
          <View>
            <Text
              style={{
                ...styles.textDepArrLabel,
                color: theme.colors.fadedText,
              }}
            >
              Departure date
            </Text>
            <Text style={{ ...styles.boldDetails, color: theme.colors.text }}>
              {flight.departureDate}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.textOtherLabel,
                color: theme.colors.fadedText,
              }}
            >
              PNR
            </Text>
            {flight.passengerRegistrationNumber
              ?.split(",")
              .map((pnr: string, key: number) => (
                <Text
                  key={key}
                  style={{ ...styles.boldDetails, color: theme.colors.text }}
                >
                  {pnr}
                </Text>
              ))}
          </View>
        </View>
        <View style={styles.secondColumnDetails}>
          <View>
            <Text
              style={{
                ...styles.textDepArrLabel,
                color: theme.colors.fadedText,
              }}
            >
              Flight number
            </Text>
            {renderFlightNumber(theme, flight.flightNumber)}
          </View>
          <View>
            <Text
              style={{
                ...styles.textOtherLabel,
                color: theme.colors.fadedText,
              }}
            >
              PTA
            </Text>
            {flight.prepaidTicketInAdvance
              ?.split(",")
              .map((pta: string, key: number) => (
                <Text
                  key={key}
                  style={{ ...styles.boldDetails, color: theme.colors.text }}
                >
                  {pta}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};
