import { useTheme } from "@react-navigation/native";
import React from "react";
import InputElement from "./Input";
import Colors from "../constants/styles/colors";
import styles from "../styles/AuthStyles";

interface Props {
  employeeId: string;
  setEmployeeId: (arg: string) => void;
}

const EmployeeIdInput = ({ employeeId, setEmployeeId }: Props) => {
  const theme = useTheme();
  return (
    <InputElement
      testID={"employee-input"}
      containerStyle={{
        ...styles.inputBoxStyle,
        backgroundColor: theme.colors.colorInputText,
      }}
      onChangeText={(newEmployeeId: string) => setEmployeeId(newEmployeeId)}
      value={employeeId}
      inputStyle={{
        ...styles.inputValueStyle,
        color: Colors.white,
      }}
      keyboardAppearance="light"
      placeholder="Employee ID"
      autoFocus={false}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="numeric"
      returnKeyType="default"
      blurOnSubmit={false}
      placeholderTextColor={Colors.FAQInactiveColor}
      inputContainerStyle={styles.removeUnderline}
      shouldUseFocusedStyles={true}
    />
  );
};
export default EmployeeIdInput;
