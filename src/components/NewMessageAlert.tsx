import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import { IRootReducerType } from "../redux/reducers";
import { ChatPushNotificationToSet } from "../interfaces";

const NewMessageAlert = () => {
  const dropdownRef = useRef<DropdownAlert | null>(null);
  const notificationToShow = useSelector<
    IRootReducerType,
    ChatPushNotificationToSet | undefined
  >(({ websocketReducer }) => websocketReducer.notificationToShow);

  useEffect(() => {
    if (notificationToShow && dropdownRef.current) {
      const body = notificationToShow.notification.notificationBody;
      const splitter = body.lastIndexOf("says:") + 6;
      dropdownRef.current.alertWithType(
        "info",
        body.substr(0, splitter),
        body.substr(splitter)
      );
    }
  }, [notificationToShow]);

  return (
    <DropdownAlert ref={dropdownRef} closeInterval={6000} zIndex={1000000} />
  );
};

export default NewMessageAlert;
