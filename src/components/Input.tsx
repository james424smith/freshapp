import React, { useState, forwardRef, Ref } from "react";
import { Input } from "react-native-elements";
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTheme } from "@react-navigation/native";
type AutoCapitalize = "none" | "sentences" | "words" | "characters";
interface Props {
  containerStyle: Record<string, any>;
  value: string;
  inputStyle: Record<string, any>;
  onChangeText: (arg: string) => void;
  placeholder: string;
  keyboardAppearance: "default" | "light" | "dark";
  autoFocus?: boolean;
  autoCapitalize: AutoCapitalize;
  autoCorrect: boolean;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  blurOnSubmit: boolean;
  placeholderTextColor: string;
  onSubmitEditing?: () => void;
  rightIcon?: JSX.Element;
  inputContainerStyle: Record<string, any>;
  shouldUseFocusedStyles: boolean;
  secureTextEntry?: boolean;
  passwordInput?: Record<string, any>;
  testID?: string;
  disabled?: boolean;
}
const InputElement = forwardRef((props: Props, ref: Ref<Input>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const theme = useTheme();
  const chooseContainerStyle = () => {
    if (props.shouldUseFocusedStyles) {
      return [
        props.containerStyle,
        {
          backgroundColor: isFocused
            ? Colors.white
            : theme.colors.colorInputText,
        },
      ];
    }
    return [props.containerStyle];
  };
  const chooseInputStyle = () => {
    if (props.shouldUseFocusedStyles) {
      return [
        props.inputStyle,
        {
          color: isFocused ? Colors.black : Colors.white,
        },
      ];
    }
    return [props.inputStyle];
  };
  return (
    <Input
      testID={props.testID}
      containerStyle={chooseContainerStyle()}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry ?? false}
      inputStyle={chooseInputStyle()}
      keyboardAppearance={props.keyboardAppearance}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      autoCapitalize={props.autoCapitalize}
      autoCorrect={props.autoCorrect}
      keyboardType={props.keyboardType}
      returnKeyType={props.returnKeyType}
      onSubmitEditing={props.onSubmitEditing}
      rightIcon={props.rightIcon}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      blurOnSubmit={props.blurOnSubmit}
      placeholderTextColor={props.placeholderTextColor}
      inputContainerStyle={props.inputContainerStyle}
      ref={ref}
      disabled={props.disabled}
    />
  );
});
export default InputElement;
