const sonarqubeScanner = require("sonarqube-scanner");

const exclusions = () =>
  [
    "**/android/**",
    "**/ios/**",
    "**/node_modules/**",
    "**/__test__/**",
    "**/__tests__/**",
    "**/*.spec.*",
    "**/*.test.*",
    "**/cypress/**",
    "**/__mocks__/**",
    "**/src/api/**",
    "**/assets/**",
  ].join(",");

const tests = () =>
  [
    "**/__test__/**",
    "**/__tests__/**",
    "**/*.spec.*",
    "**/*.test.*",
    "**/cypress/**",
  ].join(",");

const coverageExlusions = () =>
  [
    "analyze.js",
    "aws-exports.js",
    "babel.config.js",
    "index.js",
    "jest.config.js",
    "jest.setup.js",
    "metro.config.js",
    "react-native.config.js",
    "svgTransform.js",
    "transformer.js",
  ].join(",");

sonarqubeScanner(
  {
    serverUrl: "https://sonarqube.apps.marlow.naboocore.com",
    token: process.env.SONARQUBE_TOKEN_APHRODITE,
    options: {
      "sonar.projectName": "aphrodite",
      "sonar.projectKey": "aphrodite",
      "sonar.sources": ".",
      "sonar.coverage.exclusions": coverageExlusions(),
      "sonar.exclusions": exclusions(),
      "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
      "sonar.test.inclusions": tests(),
      "sonar.testExecutionReportPaths": "./reports/test-report.xml",
    },
  },
  () => {}
);
