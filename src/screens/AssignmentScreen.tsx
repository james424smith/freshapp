import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import Text from "../components/StyledText";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssignmentDetails,
  getAllSeafarerDetails,
  setRefreshingAssignmentDetails,
  getAllNews,
} from "../redux/actions";
import styles from "../styles/AssignmentScreenStyles";
import {
  AssignmentBasicDetails,
  AssignmentType,
  AvatarDetails,
  VesselDetails,
  News,
  Assignment,
} from "../interfaces";
import AssignmentDetails from "../components/assignments/AssignmentDetails";
import VesselDetailsSection from "../components/assignments/VesselDetailsSection";
import CargoInstallationDetailsSection from "../components/assignments/CargoInstallationDetailsSection";
import { EMPLOYMENT_OFFER_ROUTE } from "../constants/routes";
import { IRootReducerType } from "../redux/reducers";
import { useNavigation, useTheme } from "@react-navigation/native";
import TouchableOpacitiesSection from "../components/TouchableOpacitiesSection";
import { CURRENT, NEXT } from "../constants/assignmentConstants";
import AssignmentTopSection from "../components/assignments/AssignmentTopSection";
import valueOrDefault from "../common/valueOrDefault";
import AsyncStorage from "@react-native-community/async-storage";
import FingerprintScanner from "react-native-fingerprint-scanner";

const AssignmentScreen = () => {
  const avatar = useSelector<IRootReducerType, AvatarDetails | undefined>(
    ({ seafarerDetails }) => seafarerDetails.seafarerDetails?.photoSmall
  );

  const {
    currentAssignmentBasicDetails,
    nextAssignmentBasicDetails,
    currentVesselDetails,
    nextVesselDetails,
    currentEmploymentOffer,
    nextEmploymentOffer,
  } = useSelector<
    IRootReducerType,
    {
      currentAssignmentBasicDetails?: AssignmentBasicDetails;
      nextAssignmentBasicDetails?: AssignmentBasicDetails;
      currentVesselDetails?: VesselDetails;
      nextVesselDetails?: VesselDetails;
      currentEmploymentOffer?: string;
      nextEmploymentOffer?: string;
    }
  >(({ assignmentDetails }) => {
    const assignmentDetailsOrEmpty = valueOrDefault(
      assignmentDetails.assignmentDetails,
      []
    ) as Assignment[];
    const currentAssignment = assignmentDetailsOrEmpty[0];
    const nextAssignment = assignmentDetailsOrEmpty[1];
    return {
      currentAssignmentBasicDetails: currentAssignment?.assignmentBasicDetails,
      nextAssignmentBasicDetails: nextAssignment?.assignmentBasicDetails,
      currentVesselDetails: currentAssignment?.vesselDetails,
      nextVesselDetails: nextAssignment?.vesselDetails,
      currentEmploymentOffer:
        currentAssignment?.employmentOfferDocument?.document,
      nextEmploymentOffer: nextAssignment?.employmentOfferDocument?.document,
    };
  });

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    const getBiometricStatus = valueOrDefault(
      await AsyncStorage.getItem("isBiometricEnabled"),
      ""
    ) as string;

    const biometricStatus = getBiometricStatus
      ? JSON.parse(getBiometricStatus)
      : false;

    if (!biometricStatus) {
      await FingerprintScanner.isSensorAvailable().then((biometryType) => {
        Alert.alert(
          `Turn on ${biometryType} ?`,
          `Enabling ${biometryType} allows you quick and secure access to your account`,
          [
            {
              text: "Don't Allow",
              onPress: async () => {
                await AsyncStorage.setItem("isBiometricEnabled", "false");
              },
            },
            {
              text: "Enable",
              onPress: async () => {
                await AsyncStorage.setItem("isBiometricEnabled", "true");
              },
            },
          ]
        );
      });
    }
  };

  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ assignmentDetails }) => assignmentDetails.loader
  );
  const news = useSelector<IRootReducerType, News | undefined>(
    ({ newsDetails }) => newsDetails.news
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Initialize data to use
  useEffect(() => {
    dispatch(getAssignmentDetails());
    dispatch(getAllSeafarerDetails());
    dispatch(getAllNews());
  }, [dispatch]);

  const [assignmentType, setAssignmentType] = useState<AssignmentType>(
    "current"
  );

  const refreshData = () => {
    dispatch(setRefreshingAssignmentDetails(true));
    dispatch(getAssignmentDetails());
  };

  const handleAssignmentType = (assignmentTypeLocal: AssignmentType) => {
    setAssignmentType(assignmentTypeLocal);
  };

  const hasEmployment =
    assignmentType === CURRENT
      ? !!currentEmploymentOffer
      : !!nextEmploymentOffer;

  const hasBoth: boolean = !!currentEmploymentOffer && !!nextEmploymentOffer;

  const imageUri = {
    uri: `data:image/png;base64,${avatar?.avatar}`,
  };
  const theme = useTheme();

  const showTabsForNextAssignment = (
    handleTheAssignmentType: (assignment: AssignmentType) => void,
    type: AssignmentType,
    shouldShow: boolean
  ) => {
    return hasEmployment !== undefined && hasBoth
      ? shouldShow && (
          <TouchableOpacitiesSection
            handleSelectedOption={
              handleTheAssignmentType as (arg: unknown) => void
            }
            selectedOptionFromProps={type}
            firstOption={CURRENT}
            firstOptionLabel={"Current Assignment"}
            secondOption={NEXT}
            secondOptionLabel={"Next Assignment"}
          />
        )
      : null;
  };

  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => refreshData()}
        />
      }
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View
        style={{
          ...styles.assignmentTopContainerColor,
          backgroundColor: theme.colors.primary,
        }}
      >
        <AssignmentTopSection
          availabilityDate={
            valueOrDefault(
              currentAssignmentBasicDetails?.availabilityDate,
              ""
            ) as string
          }
          initials={valueOrDefault(avatar?.initials, "") as string}
          source={imageUri}
        />
        {showTabsForNextAssignment(handleAssignmentType, assignmentType, true)}
      </View>
      <AssignmentDetails
        availabilityDate={
          valueOrDefault(
            currentAssignmentBasicDetails?.availabilityDate,
            ""
          ) as string
        }
        initials={valueOrDefault(avatar?.initials, "") as string}
        imageUri={imageUri}
        hasEmployment={hasEmployment}
        assignmentType={assignmentType}
        handleAssignmentType={handleAssignmentType}
        assignmentDetails={
          assignmentType === CURRENT
            ? currentAssignmentBasicDetails
            : nextAssignmentBasicDetails
        }
        news={news}
      />
      {hasEmployment && (
        <View>
          <TouchableOpacity
            testID={"employment-offer-button"}
            style={styles.employmentOfferContainer}
            onPress={() =>
              navigation.navigate(EMPLOYMENT_OFFER_ROUTE, { assignmentType })
            }
          >
            <Text
              style={{
                ...styles.employmentOfferText,
                color: theme.colors.forgotPasswordLink,
              }}
            >
              Employment Offer
            </Text>
          </TouchableOpacity>
          <VesselDetailsSection
            vesselDetails={
              assignmentType === CURRENT
                ? currentVesselDetails
                : nextVesselDetails
            }
          />
          <CargoInstallationDetailsSection
            cargoInstallationTable={
              assignmentType === CURRENT
                ? currentVesselDetails?.cargoInstallation
                : nextVesselDetails?.cargoInstallation
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AssignmentScreen;
