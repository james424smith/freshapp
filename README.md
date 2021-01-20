# Marlow CrewCompanion

![Unit test](https://github.com/Marlow-Navigation/aphrodite/workflows/Unit%20test/badge.svg)

[![Quality Gate Status](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=alert_status)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Reliability Rating](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=reliability_rating)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Security Rating](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=security_rating)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Bugs](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=bugs)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Coverage](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=coverage)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)

[![Lines of Code](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=ncloc)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Vulnerabilities](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=vulnerabilities)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Maintainability Rating](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=sqale_rating)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)
[![Duplicated Lines (%)](https://sonarqube.apps.marlow.naboocore.com/api/project_badges/measure?project=aphrodite&metric=duplicated_lines_density)](https://sonarqube.apps.marlow.naboocore.com/dashboard?id=aphrodite)

[![IOS Build status STAGING](https://build.appcenter.ms/v0.1/apps/35c3e7d8-cd25-4f5e-8a85-bea285537363/branches/dev/badge)](https://appcenter.ms)
[![IOS Build status PROD](https://build.appcenter.ms/v0.1/apps/35c3e7d8-cd25-4f5e-8a85-bea285537363/branches/prod/badge)](https://appcenter.ms)
[![ANDROID Build status STAGING](https://build.appcenter.ms/v0.1/apps/846b9c55-c486-4434-8db6-3dc7845df2c9/branches/dev/badge)](https://appcenter.ms)
[![ANDROID Build status PROD](https://build.appcenter.ms/v0.1/apps/846b9c55-c486-4434-8db6-3dc7845df2c9/branches/prod/badge)](https://appcenter.ms)

## :warning: :bangbang: Important

Every new component must have its associate stories and tests

## Requirements

- node version at least `v14.13.0`
- VS Code

### android

- java v1.8
- android studio

### iOS

- Homebrew
- yarn v1.22.x
- XCode

### :warning: Ask for environmental variables.

## Install and Run

To get started clone the repo and run

`yarn install`

This will download all the necessary packages to build the project. The project can be deployed using the simple command of `yarn start`. This will get your project running in development mode.

_note_: if you want to keep the `metro server` running on its own console just run `yarn start`

**Running on iOS:**

The project may be run from the directory using
`cd ios && pod install && cd ..`

`yarn start:ios`

**Running on Android:**

Like yarn start, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

`yarn start:android`

_note_: after any compilation (i.e. after linking a native library) please restart the metro server

## Debugging

Debug implies checking logs and be able to stop on specific breakpoints. For the first requirement (watch logs) there're two options. If you want to stop on breakpoints then only the first option is for you.

### React Native Debugger

First, you need to install the [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
`brew update && brew cask install react-native-debugger`

Press _⌘+D_ on iOS simulator, _⌘+M_ (OSX), _ctrl+M_ (Linux & windows) on Android emulator, or shake real devices, you will see the in-app developer menu. Tap “Debug JS Remotely”. The React Native Debugger will be opened automatically. Open source files in the Sources tab, you can set breakpoints here.

## Running the tests

You can run the test using

```bash
yarn test
```

## Known Issues:

### When an error is shown for /dev/kvm permissions, run:

```shell
sudo chown <Replace with username> /dev/kvm
```
