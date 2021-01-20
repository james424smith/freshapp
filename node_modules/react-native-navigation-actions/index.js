module.exports = {
  // Core
  get AppNavigator() {
    return require('./src/navigator').AppNavigator;
  },
  get Actions() {
    return require('./src/navigator').Actions;
  },
  get navigatorRef() {
    return require('./src/navigator').navigatorRef;
  },
}

