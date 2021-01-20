import React, { useState, useEffect, useCallback, useRef } from "react";
import { TouchableOpacity, View, Image, Platform } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import Text from "../../components/StyledText";
import { Icon } from "react-native-elements";
import mapPin from "../../../assets/images/ic_pin_small.png";
import styles from "../../styles/more_screens/VesselTrackerStyles";
import { useSelector } from "react-redux";
import { Assignment, VesselDetails } from "../../interfaces";
import { Region } from "../../interfaces/MapViewTypes";
import { IOS } from "../../constants/Platforms";

import { IRootReducerType } from "../../redux/reducers";
import valueOrDefault from "../../common/valueOrDefault";

const VesselTrackerScreen = () => {
  const map = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 34.665199,
    longitude: 33.008535,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });
  const [, updateState] = useState<number | undefined>();
  const forceUpdate = useCallback(() => updateState(1), []);
  const currentVesselDetails = useSelector<
    IRootReducerType,
    VesselDetails | undefined
  >(
    ({ assignmentDetails }) =>
      (valueOrDefault(
        assignmentDetails.assignmentDetails,
        []
      ) as Assignment[])[0]?.vesselDetails
  );
  const getVesselRegion = useCallback((): Region => {
    return {
      latitude: currentVesselDetails?.latitude ?? 34.665199,
      longitude: currentVesselDetails?.longitude ?? 33.008535,
      latitudeDelta: 3,
      longitudeDelta: 3,
    };
  }, [currentVesselDetails?.latitude, currentVesselDetails?.longitude]);

  useEffect(() => {
    setRegion(getVesselRegion());
  }, [getVesselRegion]);

  useEffect(() => {
    if (Platform.OS === IOS && map.current) {
      map.current.animateToRegion(getVesselRegion());
    }
  }, [getVesselRegion, map]);

  const animateToInitialRegion = (): void => {
    if (map.current) {
      map.current.animateToRegion(getVesselRegion());
    }
  };

  const onRegionChange = (regionLocal: Region): void => {
    setRegion(regionLocal);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={map}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        onRegionChange={(regionOnChange: Region) =>
          onRegionChange(regionOnChange)
        }
      >
        {currentVesselDetails?.latitude && currentVesselDetails?.longitude && (
          <Marker
            coordinate={{
              latitude: currentVesselDetails?.latitude,
              longitude: currentVesselDetails?.longitude,
            }}
            title={currentVesselDetails?.name}
          >
            <Image
              style={styles.img}
              source={mapPin}
              onLoad={() => forceUpdate()}
            />
          </Marker>
        )}
      </MapView>
      <View style={[styles.bubble, styles.latlng]}>
        <Text style={styles.textFormat}>
          {region.latitude.toPrecision(7)},{region.longitude.toPrecision(7)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID={"go-to-current-position"}
          onPress={() => animateToInitialRegion()}
          style={[styles.bubble, styles.button]}
        >
          <Icon name="my-location" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VesselTrackerScreen;
