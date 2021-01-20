import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";
import { NativeModules } from "react-native";

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

jest.mock("@aws-amplify/pushnotification", () => ({
  default: jest.fn(() => {}),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  getInitialNotification: jest.fn(),
  onNotificationOpened: jest.fn(),
  onRegister: jest.fn(),
  then: jest.fn(),
}));

jest.mock("react-native-device-info", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {}),
    getVersion: jest.fn(() => Promise.resolve("1.0")),
    getApplicationName: jest.fn(() => Promise.resolve("Marlow CrewCompanion")),
  };
});
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useTheme: jest
    .fn()
    .mockImplementation(
      () => jest.requireActual("@react-navigation/native").DefaultTheme
    ),
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation(),
    replace: jest.fn().mockImplementation(),
    goBack: jest.fn().mockImplementation((x) => x),
    setOptions: jest.fn().mockImplementation((x) => x),
    addListener: jest.fn().mockImplementation((_x, a) => {
      a();
      return jest.fn();
    }),
  }),
  navigation: jest.fn().mockReturnValue({
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    goBack: jest.fn().mockImplementation((x) => x),
    setOptions: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  }),
  StackActions: {
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  },
}));
jest.mock("@quinaryio/react-native-doc-viewer", () => ({
  ...jest.requireActual("@quinaryio/react-native-doc-viewer"),
  openDocb64: jest.fn(),
}));

jest.mock("@react-navigation/stack", () => ({
  ...jest.requireActual("@react-navigation/stack"),
}));
jest.mock("@react-navigation/core", () => ({
  ...jest.requireActual("@react-navigation/core"),
  createRouter: jest.requireActual("@react-navigation/core").createRouter,
  useNavigationParam: jest.fn(
    jest.requireActual("@react-navigation/core").useNavigationParam
  ),
  StackActions: {
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  },
}));
jest.mock("react-native-fingerprint-scanner", () => ({
  release: () => jest.fn(),
  isSensorAvailable: jest.fn(),
  authenticate: jest.fn(),
}));

jest.mock("react-native-sensitive-info", () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    deleteItem: jest.fn(),
    getAllItems: jest.fn(),
  };
});

jest.mock("react-native-fs", () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn().mockResolvedValue(true),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn().mockResolvedValue(""),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: "c://",
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn(),
  };
});
jest.mock("react-native-ultimate-config", () => ({
  default: {
    ENV: "development",
    API_BASE_URL: "",
    IMAGES_PREFIX_URL: "",
    WEBSOCKET_BASE_URL: "",
    GOOGLE_MAPS_API_KEY: "",
    SSL_EXPIRATION_WARNING: "",
  },
  AWS_EXPORTS: JSON.stringify({
    aws_project_region: "eu-west-1",
    aws_cognito_identity_pool_id:
      "eu-west-1:0700dd4d-d3f1-47e8-aeca-c03a916aba97",
    aws_cognito_region: "eu-west-1",
    aws_user_pools_id: "eu-west-1_VdCn6sWLK",
    aws_user_pools_web_client_id: "3uc4kul2beqktthivc578jutfm",
    oauth: {},
    aws_mobile_analytics_app_id: "33c953d8b8a04972904e65148ea64665",
    aws_mobile_analytics_app_region: "eu-west-1",
  }),
}));

jest.mock("react-native-device-info", () => {
  return {
    getVersion: jest.fn().mockReturnValue("iphone"),
  };
});

jest.mock("react-native-code-push");

jest.mock("react-native-maps");
