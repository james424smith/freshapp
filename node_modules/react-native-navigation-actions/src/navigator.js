
import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation'

// API Reference:
// https://reactnavigation.org/docs/navigation-actions.html
// Based on this debate:
// https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-340293063
// And docs:
// https://reactnavigation.org/docs/navigating-without-navigation-prop.html

let navigatorRef;
function setTopLevelNavigator(navRef) {
  navigatorRef = navRef;
}

const AppNavigator = (RootNavigator) => {
  const TopLevelNavigator = StackNavigator({
    __root__: { screen: RootNavigator },
  }, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });

  return (props) => { 
    return (
      <TopLevelNavigator {...props} ref={navRef => {setTopLevelNavigator(navRef)}} />
    ); 
  } 
};

const Actions = {
  navigate: (routeName, params) => {
    if (typeof(routeName) === 'string') {
      navigatorRef.dispatch(
        NavigationActions.navigate({ type: NavigationActions.NAVIGATE, routeName, params })
      );
    } else {
      navigatorRef.dispatch(NavigationActions.navigate(routeName))
    }
  },
  back: (...params) => navigatorRef.dispatch(NavigationActions.back(...params)),
  setParams: (...params) => navigatorRef.dispatch(NavigationActions.setParams(...params)),
  init: (...params) => navigatorRef.dispatch(NavigationActions.init(...params)),
  reset: (...params) => navigatorRef.dispatch(NavigationActions.reset(...params)),
  replace: (...params) => navigatorRef.dispatch(NavigationActions.replace(...params)),
  push: (...params) => navigatorRef.dispatch(NavigationActions.push(...params)),
  pop: (...params) => navigatorRef.dispatch(NavigationActions.pop(...params)),
  popToTop: (...params) => navigatorRef.dispatch(NavigationActions.popToTop(...params)),
};

export { AppNavigator, Actions, navigatorRef };
export default module.exports;
