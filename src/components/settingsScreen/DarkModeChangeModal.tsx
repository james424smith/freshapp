import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import styles from "../../styles/more_screens/DarkModeChangeModalStyles";
import colors from "../../constants/styles/colors";
import Text from "../StyledText";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { IRootReducerType } from "../../redux/reducers";
import { setDarkModeOptions } from "../../redux/actions";
type Props = {
  modalVisible: boolean;
  changeModalVisible: () => void;
};

const DarkModeChangeModal = (props: Props) => {
  const { modalVisible, changeModalVisible } = props;
  const dispatch = useDispatch();

  const selectedIndex = useSelector<IRootReducerType, string>(
    ({ darkModeOptionsReducer }) => darkModeOptionsReducer.darkModeOptionsValue
  );

  return (
    <Modal
      isVisible={modalVisible}
      style={styles.modal}
      onBackdropPress={() => {
        changeModalVisible();
      }}
    >
      <View style={styles.main}>
        <View style={styles.darkModeTextView}>
          <Text style={styles.text}>Dark Mode</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentItem}>
            <View style={styles.itemView}>
              <TouchableOpacity
                style={styles.item}
                testID={"change-color-dark-button"}
                onPress={async () => {
                  await AsyncStorage.setItem("colorScheme", "dark");
                  dispatch(setDarkModeOptions("dark"));
                }}
              >
                <Text style={styles.itemText}>On</Text>
              </TouchableOpacity>
              {selectedIndex === "dark" ? (
                <Icon name="check" color={colors.white} size={28} />
              ) : null}
            </View>
            <View style={styles.itemView}>
              <TouchableOpacity
                style={[styles.item, styles.touchableOpacityStyles]}
                testID={"change-color-light-button"}
                onPress={async () => {
                  await AsyncStorage.setItem("colorScheme", "light");
                  dispatch(setDarkModeOptions("light"));
                }}
              >
                <Text style={styles.itemText}>Off</Text>
              </TouchableOpacity>
              {selectedIndex === "light" ? (
                <Icon name="check" color={colors.white} size={28} />
              ) : null}
            </View>
            <View style={styles.itemView}>
              <TouchableOpacity
                style={styles.item}
                testID={"change-color-system-button"}
                onPress={async () => {
                  await AsyncStorage.setItem("colorScheme", "system");
                  dispatch(setDarkModeOptions("system"));
                }}
              >
                <Text style={styles.itemText}>System</Text>
              </TouchableOpacity>
              {selectedIndex === "system" ? (
                <Icon name="check" color={colors.white} size={28} />
              ) : null}
            </View>
          </View>
          <View style={styles.systemTextView}>
            <Text style={styles.systemText}>
              If system is selected, CrewCompanion will automatically adjust
              your appearance based on your device’s system settings.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DarkModeChangeModal;
