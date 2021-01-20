import React, { useLayoutEffect, useEffect, useCallback, useRef } from "react";
import {
  initializeWs,
  openWs,
  onMessageWs,
  closeWs,
} from "../common/websocketFunctions";
import {
  setWebsocketData,
  getNotificationsDetails,
  clearSentMessage,
} from "../redux/actions";
import ReconnectingWebSocket from "reconnecting-websocket";
import { getNotificationOnForeground } from "../common/pushNotifications";

import { useSelector, useDispatch } from "react-redux";
import { IRootReducerType } from "../redux/reducers";
import {
  WebsocketEvent,
  UPDATE_WHO_IS_AROUND,
  UpdateWhoIsAroundRequest,
  SeafarerDetails,
  SuccessRestReturn,
  Notification,
  InitialisedSagaCall,
} from "../interfaces";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Platform, Alert, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { Auth } from "aws-amplify";
import _ from "lodash";

type Props = {
  getNotificationsDetails: () => Promise<SuccessRestReturn<Notification>>;
  setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall;
  message?: WebsocketEvent;
  isOnline: boolean;
} & BottomTabBarProps;

const NEW_PASSWORD_CHALLENGE = "NEW_PASSWORD_REQUIRED";

const BottomTabMainScreen = (props: Props) => {
  const ws = useRef<ReconnectingWebSocket | undefined>(undefined);
  const watchId = useRef<number | undefined>(undefined);
  const message = useSelector<IRootReducerType, WebsocketEvent | undefined>(
    ({ websocketReducer }) => websocketReducer.message
  );
  const isOnline = useSelector<IRootReducerType, boolean>(
    ({ websocketReducer }) => websocketReducer.isOnline ?? false
  );

  const dispatch = useDispatch();
  const { navigation } = props;

  const networkIsConnected = useSelector<IRootReducerType, boolean>(
    ({ network }) => network.isConnected ?? false
  );
  const detailsOfSeafarer = useSelector<
    IRootReducerType,
    SeafarerDetails | undefined
  >(({ seafarerDetails }) => seafarerDetails.seafarerDetails);

  const handleWebSockets = useCallback(async () => {
    ws.current = await initializeWs();
    const wsCurrent = ws.current;
    openWs(wsCurrent)
      .then(() => ({}))
      .catch((e) => console.log("error in websocket", e));
    onMessageWs(wsCurrent, setWebsocketData, dispatch as () => void);
    closeWs(wsCurrent, setWebsocketData, dispatch);
    return wsCurrent;
  }, [dispatch]);

  const geoSuccess = async (position: any) => {
    if (isOnline) {
      const user = await Auth.currentUserInfo();
      const whoIsAroundData: UpdateWhoIsAroundRequest = {
        seafarerId: `${user.username}`,
        pin: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      };

      dispatch(
        setWebsocketData({
          messageType: UPDATE_WHO_IS_AROUND,
          payload: whoIsAroundData,
        })
      );
    }
  };

  const geoFailure = async (err: any) => {
    const user = await Auth.currentUserInfo();
    console.error("Error Message", err.message);
    const whoIsAroundData: UpdateWhoIsAroundRequest = {
      seafarerId: `${user.username}`,
      pin: {
        lat: 0,
        lon: 0,
      },
      onlineUntil: 0,
    };
    dispatch(
      setWebsocketData({
        messageType: UPDATE_WHO_IS_AROUND,
        payload: whoIsAroundData,
      })
    );
    Alert.alert(
      "We couldn't get your location at the moment. Please check your settings in order to be online"
    );
  };

  const handleWatchGeolocation = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );
    }
    return Geolocation.watchPosition(geoSuccess, geoFailure, {
      distanceFilter: 1000,
      enableHighAccuracy: true,
    });
  };

  useEffect(() => {
    if (isOnline) {
      handleWatchGeolocation().then((w) => {
        watchId.current = w;
      });
    } else {
      watchId.current && Geolocation.clearWatch(watchId.current);
      watchId.current = undefined;
      Geolocation.stopObserving();
    }
    return () => {
      watchId.current !== undefined && Geolocation.clearWatch(watchId.current);
      Geolocation.stopObserving();
      watchId.current = undefined;
    };
  }, [isOnline]); //eslint-disable-line react-hooks/exhaustive-deps

  //handle push notifications
  useEffect(() => {
    if (networkIsConnected || _.isEmpty(detailsOfSeafarer)) {
      Auth.currentAuthenticatedUser()
        .then((userToken) => {
          if (userToken.challengeName === NEW_PASSWORD_CHALLENGE) {
            navigation.navigate("Auth", { screen: "ForceUpdate" });
          }
        })
        .catch((e) => {
          console.log(e);
          navigation.navigate("Auth", { screen: "SignIn" });
        });
    }
    getNotificationOnForeground({
      getNotificationsDetails,
      dispatch,
      navigation,
      setWebsocketData,
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ws.current && message) {
      ws.current.send(JSON.stringify(message));
      clearSentMessage();
    }
  }, [message, ws]);

  // initialize websocket
  useLayoutEffect(() => {
    handleWebSockets()
      .then((wsLocal: ReconnectingWebSocket) => {
        ws.current = wsLocal;
        wsLocal.addEventListener("close", (e: { code: number }) => {
          if (e.code === 201) {
            wsLocal.close();
          }
        });
      })
      .catch((error: any) => console.warn(error));
    return () => {
      if (ws.current) {
        ws.current.close(201);
      }
    };
  }, [handleWebSockets]);
  return <BottomTabBar {...props} />;
};

export default BottomTabMainScreen;
