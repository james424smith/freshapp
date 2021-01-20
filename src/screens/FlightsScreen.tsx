import React, { useEffect } from "react";
import { Flight } from "../interfaces";
import { ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getFlightsDetails,
  setRefreshingFlightDetails,
} from "../redux/actions";
import Layout from "../constants/styles/Layout";
import Carousel from "react-native-snap-carousel";
import styles from "../styles/FlightCardStyles";
import FlightCard from "../components/flights/FlightCard";
import _ from "lodash";
import { IRootReducerType } from "../redux/reducers";
import { useTheme } from "@react-navigation/native";
import valueOrDefault from "../common/valueOrDefault";

const FlightsScreen = () => {
  const flights = useSelector<IRootReducerType, Flight[]>(
    ({ flightDetails }) =>
      valueOrDefault(flightDetails?.flights?.flights, []) as Flight[]
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ flightDetails }) => flightDetails?.loader
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlightsDetails());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(setRefreshingFlightDetails(true));
    dispatch(getFlightsDetails());
  };

  const renderItem = ({ item, index }: { item: Flight; index: number }) => {
    return <FlightCard key={index} flight={item} />;
  };

  const theme = useTheme();
  const flightsToUse =
    (valueOrDefault(flights, []) as Flight[]).filter(
      (flight: Flight) => !_.isEmpty(flight)
    ) ?? [];
  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.scrollViewStyle}
      contentContainerStyle={{
        ...styles.scrollViewContainer,
        backgroundColor: theme.colors.newBackgroundColor,
      }}
      refreshControl={
        <RefreshControl
          tintColor={"white"}
          refreshing={isLoading}
          onRefresh={refreshData}
        />
      }
    >
      <Carousel
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width - (15 * Layout.window.width) / 100}
        renderItem={renderItem}
        data={flightsToUse}
      />
    </ScrollView>
  );
};

export default FlightsScreen;
