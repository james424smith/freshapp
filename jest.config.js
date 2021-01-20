process.env.TZ = "Europe/London";

module.exports = {
  preset: "react-native",
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["json-summary", "json", "html", "lcov"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testResultsProcessor: "jest-sonar-reporter",
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./jest.setup.js",
  ],
  transform: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./svgTransform.js",
  },
  transformIgnorePatterns: [
    "./node_modules/(?!(jest-)?react-native|native-base|@aws-amplify|@react-native-community|@react-native-picker|@react-navigation|toggle-switch-react-native|@quinaryio/react-native-doc-viewer|react-native-swiper|redux-persist-sensitive-storage|jail-monkey)",
  ],
};
