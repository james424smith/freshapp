import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, RefreshControl } from "react-native";
import styles from "../../styles/more_screens/SeaServiceDetailsStyles";
import { SeaService, SeaServiceType, SeaServiceRecord } from "../../interfaces";
import {
  getSeaServiceDetails,
  setRefreshingSeaServiceDetails,
} from "../../redux/actions";
import MarlowSeaServiceList from "../../components/seaService/SeaServiceList";
import TouchableOpacitiesSection from "../../components/TouchableOpacitiesSection";
import {
  MARLOW_SERVICE,
  NON_MARLOW_SERVICE,
} from "../../constants/seaServiceConstants";

import { IRootReducerType } from "../../redux/reducers";
import { useTheme } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

const SeaServiceScreen = () => {
  const theme = useTheme();
  const [seaServiceType, setSeaServiceType] = useState<SeaServiceType>(
    MARLOW_SERVICE
  );

  const seaServices = useSelector<IRootReducerType, SeaService>(
    ({ seaServiceDetails }) => seaServiceDetails.seaServiceDetails
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ seaServiceDetails }) => seaServiceDetails.loader
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeaServiceDetails());
  }, [dispatch]);

  const handleSeaServiceType = (type: SeaServiceType) =>
    setSeaServiceType(type);

  const handleRefresh = () => {
    dispatch(setRefreshingSeaServiceDetails(true));
    dispatch(getSeaServiceDetails());
  };

  const renderSeaServiceDetails = (
    fromMarlowService: SeaServiceRecord[],
    nonFromMarlowService: SeaServiceRecord[]
  ) => {
    return seaServiceType === MARLOW_SERVICE ? (
      <MarlowSeaServiceList
        seaServiceTable={fromMarlowService}
        isMarlow={true}
      />
    ) : (
      <MarlowSeaServiceList
        seaServiceTable={nonFromMarlowService}
        isMarlow={false}
      />
    );
  };

  const marlowService = valueOrDefault(
    seaServices?.marlowSeaServices,
    []
  ) as SeaServiceRecord[];
  const nonMarlowService = valueOrDefault(
    seaServices?.nonMarlowSeaServices,
    []
  ) as SeaServiceRecord[];

  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.opacitiesView}
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacitiesSection
        handleSelectedOption={handleSeaServiceType as (arg: unknown) => void}
        selectedOptionFromProps={seaServiceType}
        firstOption={MARLOW_SERVICE}
        firstOptionLabel={"Marlow"}
        secondOption={NON_MARLOW_SERVICE}
        secondOptionLabel={"Non Marlow"}
        backgroundColor={theme.colors.background}
        fontColor={theme.colors.newAquaMarineColor}
        fontWeight={"bold"}
      />
      <View style={styles.stableLineStyle} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {renderSeaServiceDetails(marlowService, nonMarlowService)}
      </ScrollView>
    </ScrollView>
  );
};

export default SeaServiceScreen;
