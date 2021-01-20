import React, { useState, useEffect } from "react";
import Text from "../StyledText";
import ActiveTick from "../../../assets/icons/tick_enable.svg";
import DisableTick from "../../../assets/icons/tick_disable.svg";
import styles from "../../styles/AuthStyles";
import { View } from "react-native";
interface Props {
  password: string;
  setAllValid: (arg: boolean) => void;
}

const PasswordValidationsSection = (props: Props) => {
  const { password, setAllValid } = props;
  const [
    containsEightCharacters,
    setContainsEightCharacters,
  ] = useState<boolean>(false); // min 8 characters
  const [containsUpperCase, setContainsUpperCase] = useState<boolean>(false); // upper character
  const [
    containsSpecialCharacter,
    setContainsSpecialCharacter,
  ] = useState<boolean>(false); // special character

  const mustContainData = [
    "At least 8 characters)",
    "Contains a capital letter",
    "Contains a symbol (!, @, #, $, %, ^, &, *)",
  ];

  useEffect(() => {
    const temp = validatePassword();

    if (temp.eightCharacters && temp.specialCharacter && temp.upperCase) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const ValidateEightCharacters = () => {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };
  const ValidateUpperCase = () => {
    if (password.toLowerCase() !== password) {
      return true;
    } else {
      return false;
    }
  };
  const ValidateSpecialCharacter = () => {
    if (/[!,@,#,$,%,^,&,*]/g.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = () => {
    // has 8 characters
    const eightCharacters = ValidateEightCharacters();
    setContainsEightCharacters(eightCharacters);
    const upperCase = ValidateUpperCase();
    setContainsUpperCase(upperCase);
    const specialCharacter = ValidateSpecialCharacter();
    setContainsSpecialCharacter(specialCharacter);
    return { eightCharacters, upperCase, specialCharacter };
  };

  return (
    <View style={styles.passwordValidationSection}>
      {[
        containsEightCharacters,
        containsUpperCase,
        containsSpecialCharacter,
      ].map((isTrue, i) => (
        <View key={i} style={styles.passwordValidationMapChecks}>
          <View style={styles.passwordValidationCheckIcon}>
            {isTrue ? (
              <ActiveTick
                width={18}
                height={18}
                options={{ alignSelf: "center" }}
              />
            ) : (
              <DisableTick width={18} height={18} />
            )}
          </View>
          <View>
            <Text
              style={
                isTrue
                  ? styles.passwordValidationCheckedIconText
                  : styles.passwordValidationUncheckedIconText
              }
            >
              {mustContainData[i]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PasswordValidationsSection;
