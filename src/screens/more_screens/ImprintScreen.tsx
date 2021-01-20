import React, { useEffect, useLayoutEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../components/StyledText";
import styles from "../../styles/more_screens/ImprintStyles";
import { Imprint, Manager } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { getImprintDetails } from "../../redux/actions";

import { handleLink } from "../../common/handleLink";
import { IRootReducerType } from "../../redux/reducers";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import Back from "../../components/BackIcon";
import valueOrDefault from "../../common/valueOrDefault";

const useIsAuthenticated = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user) {
        navigation.setOptions({
          headerLeft: () => <Back goBack={true} />,
          // headerTitleStyle: { fontWeight: "300" },
          headerRight: () => <View />,
          title: "Marlow",
        });
      } else {
        navigation.setOptions({
          headerShown: false,
        });
      }
    });
  }, [navigation]);
};

const ImprintScreen = () => {
  useIsAuthenticated();

  const theme = useTheme();
  const imprint = useSelector<IRootReducerType, Imprint | undefined>(
    ({ imprintDetails }) => imprintDetails.imprintDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImprintDetails());
  }, [dispatch]);

  const renderImprintDetails = () => {
    return [
      <View style={{ backgroundColor: theme.colors.primary }}>
        <Text style={{ ...styles.detailsLightStyle, color: theme.colors.text }}>
          Marlow Navigation Co. Ltd
        </Text>
        <Text style={{ ...styles.detailsBoldValue, color: theme.colors.text }}>
          Crew & Ship Management
        </Text>
        <View
          style={{
            ...styles.contactPartView,
            backgroundColor: theme.colors.primary,
          }}
        >
          <View style={styles.columnContainer}>
            <View>
              <Text
                style={{
                  ...styles.detailsLightStyle,
                  color: theme.colors.text,
                }}
              >
                Address
              </Text>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.physicalAddress.addressLine1, "")}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.physicalAddress.addressLine2, "")}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.physicalAddress.postCode, "")}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.physicalAddress.city, "")}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.physicalAddress.country, "")}
              </Text>
            </View>
          </View>
          <View style={styles.columnContainer}>
            <View>
              <Text
                style={{
                  ...styles.detailsLightStyle,
                  color: theme.colors.text,
                }}
              >
                Mailing Address
              </Text>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {`P.O. Box ${valueOrDefault(
                  imprint?.mailingAddress.poBox,
                  ""
                )}`}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {`CY-${valueOrDefault(imprint?.mailingAddress.postCode, "")}`}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {valueOrDefault(imprint?.mailingAddress.city, "")}
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.addressLine, color: theme.colors.text }}>
                {(valueOrDefault(
                  imprint?.mailingAddress.country,
                  ""
                ) as string).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>,
      <View style={styles.lineStyle} />,
      <View style={styles.contactPartView}>
        <View style={styles.columnContainer}>
          <TouchableOpacity
            testID={"phone-button"}
            onPress={() => handleLink("tel", imprint?.contact.phone)}
          >
            <Text
              style={{ ...styles.detailsLightStyle, color: theme.colors.text }}
            >
              Phone
            </Text>
            <Text
              style={{ ...styles.detailsClickValue, color: theme.colors.text }}
            >
              {valueOrDefault(imprint?.contact.phone, "")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columnContainer}>
          <TouchableOpacity
            testID={"fax-button"}
            onPress={() => handleLink("tel", imprint?.contact.fax)}
          >
            <Text
              style={{ ...styles.detailsLightStyle, color: theme.colors.text }}
            >
              Fax
            </Text>
            <Text
              style={{ ...styles.detailsClickValue, color: theme.colors.text }}
            >
              {valueOrDefault(imprint?.contact.fax, "")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>,
      <View>
        <TouchableOpacity
          testID={"email-button"}
          onPress={() => handleLink("mailto", imprint?.contact.email)}
        >
          <Text
            style={{ ...styles.detailsLightStyle, color: theme.colors.text }}
          >
            General email
          </Text>
          <Text
            style={{ ...styles.detailsClickValue, color: theme.colors.text }}
          >
            {valueOrDefault(imprint?.contact.email, "")}
          </Text>
        </TouchableOpacity>
      </View>,
      <View>
        <TouchableOpacity
          testID={"contactEmail-button"}
          onPress={() => handleLink("mailto", imprint?.contact.contactEmail)}
        >
          <Text
            style={{ ...styles.detailsLightStyle, color: theme.colors.text }}
          >
            Contact Email
          </Text>
          <Text
            style={{ ...styles.detailsClickValue, color: theme.colors.text }}
          >
            {valueOrDefault(imprint?.contact.contactEmail, "")}
          </Text>
        </TouchableOpacity>
      </View>,
      <View>
        <TouchableOpacity
          testID={"website-button"}
          onPress={() => handleLink("url", imprint?.contact.website)}
        >
          <Text
            style={{ ...styles.detailsLightStyle, color: theme.colors.text }}
          >
            Web
          </Text>
          <Text
            style={{ ...styles.detailsClickValue, color: theme.colors.text }}
          >
            {valueOrDefault(imprint?.contact.website, "")}
          </Text>
        </TouchableOpacity>
      </View>,
      <View style={styles.lineStyle} />,

      <>
        <View style={{ backgroundColor: theme.colors.primary }}>
          {(valueOrDefault(imprint?.contact.managers, []) as Manager[])
            .sort((a) => a.order)
            .map((m, i) => (
              <View style={styles.chairmanViewSpace} key={i}>
                <Text
                  style={{
                    ...styles.detailsLightStyle,
                    color: theme.colors.text,
                  }}
                >
                  {m.label}
                </Text>
                <Text
                  style={{
                    ...styles.detailsBoldValue,
                    color: theme.colors.text,
                  }}
                >
                  {valueOrDefault(m.value, "")}
                </Text>
              </View>
            ))}
        </View>
      </>,

      <View>
        <Text style={{ ...styles.detailsLightStyle, color: theme.colors.text }}>
          Cyprus VAT No
        </Text>
        <Text
          style={{
            ...styles.detailsBoldValue,
            color: theme.colors.text,
          }}
        >
          {valueOrDefault(imprint?.contact.vatNumber, "")}
        </Text>
      </View>,
      <View style={styles.endSpace} />,
    ];
  };

  const details = !_.isEmpty(imprint) ? renderImprintDetails() : [];
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollbar}>
        {details.map((column, i) => (
          <View key={i}>{column}</View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImprintScreen;
