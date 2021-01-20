import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import { IRootReducerType } from "../redux/reducers";

const NoInternetHeader = () => {
  const dropdownRef = useRef<DropdownAlert | null>(null);

  const networkDetails = useSelector<IRootReducerType, any>(
    ({ network }) => network
  );

  useEffect(() => {
    if (networkDetails && !networkDetails.isConnected && dropdownRef.current) {
      dropdownRef.current.alertWithType(
        "error",
        "Error",
        "You are not connected to the internet",
        {},
        1000
      );
    }
  }, [networkDetails]);

  return (
    <DropdownAlert ref={dropdownRef} defaultContainer={{ marginTop: 20 }} />
  );
};

export default NoInternetHeader;
