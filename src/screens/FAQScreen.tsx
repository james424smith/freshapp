import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View } from "react-native";
import Text from "../components/StyledText";
import styles from "../styles/FAQStyles";
import { Input } from "react-native-elements";
import colors from "../constants/styles/colors";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  Assignment,
  LoginandPassword,
  PersonalInformation,
  Registration,
  Technical,
  General,
} from "./more_screens/FAQScreenContents";
import {
  assignmentContent,
  generalContent,
  loginAndPasswordContent,
  personalInfoContent,
  registrationContent,
  technicalContant,
} from "./more_screens/FAQScreenContents/faqContent";
import Back from "../components/BackIcon";
import { Auth } from "aws-amplify";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const allContent = [
  ...registrationContent.map((a) => ({ ...a, category: 0 })),
  ...loginAndPasswordContent.map((a) => ({ ...a, category: 1 })),
  ...personalInfoContent.map((a) => ({ ...a, category: 2 })),
  ...assignmentContent.map((a) => ({ ...a, category: 3 })),
  ...technicalContant.map((a) => ({ ...a, category: 4 })),
  ...generalContent.map((a) => ({ ...a, category: 5 })),
];

const tabs = [
  { name: "Registration" },
  { name: "Login and Password" },
  { name: "Personal Information" },
  { name: "Assignment" },
  { name: "Technical" },
  { name: "General" },
];

const useStyles = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user) {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: theme.colors.fromBlackToBlue,
            elevation: 0,
            shadowColor: "transparent",
          },
          headerLeft: () => (
            <Back fill={colors.white} goBack={false} path={"More"} />
          ),
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          title: "FAQs",
        });
      } else {
        navigation.setOptions({
          headerShown: false,
        });
      }
    });
  }, [navigation, theme]);

  const setStyle = (index: number) => {
    if (index === 0) {
      return [styles.tabItem, { marginRight: 20 }];
    } else if (index === 4) {
      return [styles.tabItem, { marginLeft: 20 }];
    }
    return [styles.tabItem, { marginLeft: 20, marginRight: 20 }];
  };

  const setSelectedStyle = (index: number) => {
    if (index === 0) {
      return [
        {
          ...styles.selectedTabItem,
          borderBottomColor: theme.colors.turquoiseToWhite,
        },
        { marginRight: 20 },
      ];
    } else if (index === 4) {
      return [
        {
          ...styles.selectedTabItem,
          borderBottomColor: theme.colors.turquoiseToWhite,
        },
        { marginLeft: 20 },
      ];
    }
    return [
      {
        ...styles.selectedTabItem,
        borderBottomColor: theme.colors.turquoiseToWhite,
      },
      { marginLeft: 20, marginRight: 20 },
    ];
  };
  return { setStyle, setSelectedStyle };
};

const calculateHeight = (searchOptionsLength: number) => {
  const height = hp("15%");
  if (searchOptionsLength < 5) {
    return height * searchOptionsLength;
  }
  return hp("50%");
};

const useSearch = (searchText: string) => {
  const [searchOptions, setSearchOptions] = useState<
    { category: number; question: string; id: number }[]
  >([]);
  useEffect(() => {
    if (searchText) {
      const searchTerm = searchText
        .split(" ")
        .map((a) => a.toLocaleLowerCase());
      setSearchOptions(
        allContent
          .filter((a) => {
            return (
              searchTerm.every((b) =>
                a.answer.toLocaleLowerCase().includes(b)
              ) ||
              searchTerm.every((b) =>
                a.question.toLocaleLowerCase().includes(b)
              )
            );
          })
          .map((a) => ({
            category: a.category,
            question: a.question,
            id: a.id,
          }))
      );
    } else {
      setSearchOptions([]);
    }
  }, [searchText]);

  return { searchOptions, setSearchOptions };
};

const FAQScreen = () => {
  const { setSelectedStyle, setStyle } = useStyles();
  const theme = useTheme();

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const { searchOptions, setSearchOptions } = useSearch(searchText);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const flatlistRef = useRef<FlatList<{
    name: string;
  }> | null>(null);

  const _renderTabs = ({ item, index }: any) => {
    const getStyles = () => {
      if (selectedTabIndex === index) {
        return {
          tabItemStyle: setSelectedStyle(index),
          textStyle: {
            ...styles.selectedTabNameText,
            color: theme.colors.turquoiseToWhite,
          },
        };
      }
      return { tabItemStyle: setStyle(index), textStyle: styles.tabNameText };
    };

    const { tabItemStyle, textStyle } = getStyles();

    return (
      <TouchableOpacity
        testID={`tab${index}`}
        key={index}
        style={tabItemStyle}
        onPress={() => {
          flatlistRef.current &&
            flatlistRef.current.scrollToIndex({ animated: true, index });
          setSelectedTabIndex(index);
        }}
      >
        <Text testID={`tabText${index}`} style={textStyle}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAvailableOptions = ({ item, index }: any) => {
    return (
      <View
        style={styles.queryQuestionView}
        key={`c:${item.category}a:${item.id}`}
      >
        <TouchableOpacity
          testID={`tab${index}`}
          key={index}
          onPress={() => {
            flatlistRef.current &&
              flatlistRef.current.scrollToIndex({
                animated: true,
                index: item.category,
              });
            setSelectedTabIndex(item.category);
            setSearchOptions([]);
            setSearchText("");
            setSelectedQuestion(item.id);
          }}
        >
          <Text style={styles.queryAnswerText}>{item.question}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Divider = () => {
    return <View style={styles.dividerStyles} />;
  };

  const AvailableOptions = () => {
    return (
      <View
        style={[
          styles.safeAreaContainer,
          { height: calculateHeight(searchOptions.length) },
        ]}
      >
        <FlatList
          data={searchOptions}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={renderAvailableOptions}
          keyExtractor={(item) => `c:${item.category}a:${item.id}`}
        />
      </View>
    );
  };

  const returnSelectedTabContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <Registration selectedQuestion={selectedQuestion} />;
      case 1:
        return <LoginandPassword selectedQuestion={selectedQuestion} />;
      case 2:
        return <PersonalInformation selectedQuestion={selectedQuestion} />;
      case 3:
        return <Assignment selectedQuestion={selectedQuestion} />;
      case 4:
        return <Technical selectedQuestion={selectedQuestion} />;
      case 5:
        return <General selectedQuestion={selectedQuestion} />;
      default:
        throw Error("Screen path not found");
    }
  };

  const display = searchOptions.length === 0 && !searchText ? "flex" : "none";

  return (
    <View
      style={{
        ...styles.mainViewStyle,
        backgroundColor: theme.colors.darkModeMain,
      }}
    >
      <View
        style={{
          ...styles.header,
          backgroundColor: theme.colors.marlowBlueToDarkMode,
        }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerMiddle}>
            <Input
              testID="faq-search"
              style={{
                ...styles.input,
                color: colors.white,
              }}
              containerStyle={{
                ...styles.inputBoxStyle,
                backgroundColor: theme.colors.searchBarFAQBackground,
              }}
              selectionColor={colors.white}
              placeholder={"Search the FAQs"}
              blurOnSubmit={true}
              placeholderTextColor={colors.white}
              value={searchText}
              onChangeText={(value) => setSearchText(value)}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={styles.removeUnderline}
              rightIcon={{
                name: "search",
                color: colors.white,
              }}
            />
            {searchOptions.length > 0 && (
              <View style={styles.queryQuestionBox}>
                <AvailableOptions />
              </View>
            )}
            {searchOptions.length === 0 && searchText !== "" ? (
              <View style={styles.queryQuestionBox}>
                <View
                  style={[
                    styles.safeAreaContainer,
                    {
                      height: hp("20%"),
                    },
                  ]}
                >
                  <View style={styles.queryQuestionViewOfNotFound}>
                    <Text style={styles.queryAnswerTitleTextOfNotFound}>
                      No Results found.
                    </Text>
                    <Text style={[styles.queryAnswerText]}>
                      Check the spelling or try again with a less specific
                      search term.
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ ...styles.headerBottom, display }}>
            <FlatList
              ref={flatlistRef}
              data={tabs}
              getItemLayout={(_data, index) => ({
                length: 120,
                offset: 120 * index,
                index,
              })}
              horizontal
              renderItem={_renderTabs}
              contentContainerStyle={styles.flatlist}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
      <View style={{ ...styles.content, display }}>
        {returnSelectedTabContent()}
      </View>
    </View>
  );
};

export default FAQScreen;
