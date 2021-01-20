import {
  CONTACT_ROUTE,
  NEWS_ROUTE,
  PROFILE_ROUTE,
  SALARY_ROUTE,
  SEA_SERVICE_RECORDS_ROUTE,
  WORKING_CLOTHES_ROUTE,
  DOCUMENTS_ROUTE,
  IMPRINT_ROUTE,
  SUPPORT_ROUTE,
  CREW_PORTAL_ROUTE,
  COVID_DOCUMENT_ROUTE,
  SETTINGS_ROUTE,
  FAQ_ROUTE,
} from "../constants/routes";
import { Document, NewNewsletter, PayslipRecord } from "../interfaces";
import React from "react";
import Text from "../components/StyledText";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles/AppStyles";
import { View } from "react-native";
import SeafarerDetailsScreen from "../screens/more_screens/SeafarerDetailsScreen";
import SeaServiceRecordsScreen from "../screens/more_screens/SeaServiceRecordsScreen";
import SalaryScreen from "../screens/more_screens/SalaryScreen";
import ReadMorePayslipScreen from "../screens/more_screens/salary/ReadMorePayslipScreen";
import ImprintScreen from "../screens/more_screens/ImprintScreen";
import NewsScreen from "../screens/more_screens/NewsScreen";
import ReadMoreScreen from "../screens/news/ReadMoreNewsScreen";
import WorkingClothesScreen from "../screens/more_screens/WorkingClothesScreen";
import ContactScreen from "../screens/more_screens/ContactScreen";
import SeafarerDocumentsFileScreen from "../screens/more_screens/seafarerDocuments/MoreSeafarerDocumentsScreen";
import SeafarerDocumentsExcelFileScreen from "../screens/more_screens/seafarerDocuments/ExcelRenderer";
import SeafarerDocumentsScreen from "../screens/more_screens/SeafarerDocumentsScreen";
import CovidDocumentScreen from "../screens/more_screens/CovidDocumentScreen";
import SettingsScreen from "../screens/more_screens/SettingsScreen";
import MoreScreen from "../screens/MoreScreen";
import Back from "../components/BackIcon";
import SupportScreen from "../screens/more_screens/SupportScreen";
import { useNavigation, useTheme } from "@react-navigation/native";
import FAQScreen from "../screens/FAQScreen";
import { Icon } from "react-native-elements";

const routes = [
  {
    name: "Profile",
    navigationName: PROFILE_ROUTE,
  },
  {
    name: "Documentation",
    navigationStack: "Documents",
    navigationName: DOCUMENTS_ROUTE,
  },
  {
    name: "Salary records",
    navigationName: SALARY_ROUTE,
  },
  {
    name: "Contact",
    navigationName: CONTACT_ROUTE,
  },
  {
    name: "Sea service records",
    navigationName: SEA_SERVICE_RECORDS_ROUTE,
  },
  {
    name: "Working clothes",
    navigationName: WORKING_CLOTHES_ROUTE,
  },
  {
    name: "News",
    navigationName: NEWS_ROUTE,
  },
  {
    name: "Crew Portal",
    navigationName: CREW_PORTAL_ROUTE,
    action: `https://rest2.marlow.com.cy:1240/marlowseafarerlogin/!marlowseafarerlogin.seafarerLogin`,
  },
  {
    name: "Marlow",
    navigationName: IMPRINT_ROUTE,
  },
  {
    name: "Support",
    navigationName: SUPPORT_ROUTE,
  },
  {
    name: "Covid-19",
    navigationName: COVID_DOCUMENT_ROUTE,
  },
  {
    name: "Settings",
    navigationName: SETTINGS_ROUTE,
  },
];

export type SalaryStackParamList = {
  SalaryScreen: undefined;
  ReadMorePayslip: {
    payslipDocument: PayslipRecord & {
      isOffline: boolean;
      payslipId: string;
      fileType: string;
    };
  };
};

const salary = () => {
  const SalaryStack = createStackNavigator<SalaryStackParamList>();
  return (
    <SalaryStack.Navigator>
      <SalaryStack.Screen
        component={SalaryScreen}
        name="SalaryScreen"
        options={{
          headerLeft: () => <Back goBack={false} path={"More"} />,
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          title: "Assignment records",
        }}
      />
      <SalaryStack.Screen
        component={ReadMorePayslipScreen}
        name="ReadMorePayslip"
        options={{
          title: "",
          headerLeft: () => <Back goBack={false} path={"SalaryScreen"} />,
        }}
      />
    </SalaryStack.Navigator>
  );
};

export type NewsStackParamList = {
  NewsScreen: undefined;
  ReadMoreNews: { newItem: NewNewsletter };
};

const newsStack = () => {
  const NewsStack = createStackNavigator<NewsStackParamList>();
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          title: "",
        }}
      />
      <NewsStack.Screen
        name="ReadMoreNews"
        component={ReadMoreScreen}
        options={{
          title: "",
          headerLeft: () => <Back goBack={false} path={"NewsScreen"} />,
        }}
      />
    </NewsStack.Navigator>
  );
};

export type DocumentsStackParamList = {
  SeafarerDocuments: undefined;
  SeafarerDocumentsFile: {
    documentDetails: Document & {
      isOffline: boolean;
      documentId: number;
      documentCounter: number;
      fileType: string;
      categoryNumber: string;
      isExpired: boolean;
    };
  };
  SeafarerDocumentsExcelFile: {
    documentDetails: Document & {
      isOffline: boolean;
      documentId: number;
      documentCounter: number;
      fileType: string;
      categoryNumber: string;
      isExpired: boolean;
    };
  };
};
const documents = () => {
  const DocumentsStack = createStackNavigator<DocumentsStackParamList>();
  return (
    <DocumentsStack.Navigator>
      <DocumentsStack.Screen
        name="SeafarerDocuments"
        component={SeafarerDocumentsScreen}
        options={{
          headerLeft: () => <Back goBack={false} path={"More"} />,
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          title: "Documentation",
        }}
      />
      <DocumentsStack.Screen
        name="SeafarerDocumentsFile"
        component={SeafarerDocumentsFileScreen}
        options={{
          title: "",
          headerLeft: () => <Back goBack={false} path={"SeafarerDocuments"} />,
        }}
      />
      <DocumentsStack.Screen
        name="SeafarerDocumentsExcelFile"
        component={SeafarerDocumentsExcelFileScreen}
        options={{
          title: "",
          headerLeft: () => <Back goBack={false} path={"SeafarerDocuments"} />,
        }}
      />
    </DocumentsStack.Navigator>
  );
};

const MoreStack = () => {
  type MoreStackInnerParamList = {
    Salary: undefined;
    News: undefined;
    Documents: undefined;
    More: { logOut: () => void };
    SeafarerDetails: undefined;
    Imprint: undefined;
    SeaServiceRecords: undefined;
    WorkingClothes: undefined;
    Contact: undefined;
    AppSupport: undefined;
    CovidDocument: undefined;
    Settings: undefined;
    FAQ: undefined;
  };
  const theme = useTheme();
  const navigation = useNavigation();
  const MoreStackInner = createStackNavigator<MoreStackInnerParamList>();
  return (
    <MoreStackInner.Navigator
      screenOptions={{
        headerTitleContainerStyle: {
          alignSelf: "center",
        },
      }}
    >
      <MoreStackInner.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.WhiteBackgroundToDarkBlue,
          },
          title: "",
          headerLeft: () => (
            <View style={styles.moreTitleContainer}>
              <View style={styles.moreContainer}>
                <Text
                  style={{
                    ...styles.moreTitleValue,
                    color: theme.colors.darkNavyToWhite,
                  }}
                >
                  More
                </Text>
              </View>
              <View style={styles.faqContainer}>
                <Icon
                  data-testId={"faq-icon-button"}
                  name="help-circle-outline"
                  type="ionicon"
                  color={theme.colors.blackAndWhite}
                  size={35}
                  onPress={() => navigation.navigate(FAQ_ROUTE)}
                />
              </View>
            </View>
          ),
        }}
      />
      <MoreStackInner.Screen
        name="Salary"
        component={salary}
        options={{ headerShown: false }}
      />

      <MoreStackInner.Screen
        name="News"
        component={newsStack}
        options={{ headerShown: false }}
      />
      <MoreStackInner.Screen
        name="Documents"
        component={documents}
        options={{ headerShown: false }}
      />
      <MoreStackInner.Screen
        name="SeafarerDetails"
        component={SeafarerDetailsScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          title: "Profile",
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
        }}
      />
      <MoreStackInner.Screen
        name="Imprint"
        component={ImprintScreen}
        options={{
          title: "Marlow",
        }}
      />
      <MoreStackInner.Screen
        name="SeaServiceRecords"
        component={SeaServiceRecordsScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Sea service records",
        }}
      />
      <MoreStackInner.Screen
        name="WorkingClothes"
        component={WorkingClothesScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Working clothes",
        }}
      />
      <MoreStackInner.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Contact",
        }}
      />
      <MoreStackInner.Screen
        name="AppSupport"
        component={SupportScreen}
        options={{
          title: "Support",
        }}
      />
      <MoreStackInner.Screen
        name="CovidDocument"
        component={CovidDocumentScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Covid-19",
        }}
      />
      <MoreStackInner.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Settings",
        }}
      />
      <MoreStackInner.Screen
        name="FAQ"
        component={FAQScreen}
        options={{ title: "" }}
      />
    </MoreStackInner.Navigator>
  );
};

export { MoreStack, routes, newsStack, salary, documents };
