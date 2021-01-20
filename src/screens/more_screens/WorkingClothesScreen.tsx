import React, { useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import styles from "../../styles/more_screens/workingClothesStyles";
import { ClotheData, WorkingClothes } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  getWorkingClothesDetails,
  setRefreshingWorkingClothesDetails,
} from "../../redux/actions";
import ShoeSizeTable from "../../components/workingClothes/ShoeSizeTable";
import ClotheItemList from "../../components/workingClothes/ClothesList";
import valueOrDefault from "../../common/valueOrDefault";
import { IRootReducerType } from "../../redux/reducers";
import { useTheme } from "@react-navigation/native";

const headings = ["PHL", "US", "EU", "UK"];

const WorkingClothesScreen = () => {
  const theme = useTheme();

  const workingClothes = useSelector<IRootReducerType, WorkingClothes>(
    ({ workingClothesDetails }) => workingClothesDetails.workingClothesDetails
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ workingClothesDetails }) => workingClothesDetails.loader
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkingClothesDetails());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(setRefreshingWorkingClothesDetails(true));
    dispatch(getWorkingClothesDetails());
  };

  const renderWorkingClothesDetails = (
    workingClothesLocal?: WorkingClothes
  ) => {
    const shoeSize = [
      [
        workingClothesLocal?.shoeSizePhl,
        workingClothesLocal?.shoeSizeUs,
        workingClothesLocal?.shoeSizeEu,
        workingClothesLocal?.shoeSizeUk,
      ],
    ];

    return (
      <View>
        <ShoeSizeTable
          headings={headings}
          sizeData={valueOrDefault(shoeSize, [[]]) as [[]]}
        />

        <ClotheItemList
          clothesTable={
            valueOrDefault(workingClothes?.workingClothes, []) as ClotheData[]
          }
        />
      </View>
    );
  };

  return (
    <ScrollView
      testID={"scrollview"}
      style={{
        ...styles.scrollViewStyle,
        backgroundColor: theme.colors.primary,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => refreshData()}
        />
      }
    >
      {renderWorkingClothesDetails(workingClothes)}
    </ScrollView>
  );
};

export default WorkingClothesScreen;
