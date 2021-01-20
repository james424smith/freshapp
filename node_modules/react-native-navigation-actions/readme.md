# react-native-navigation-actions
This library offer nice abstractions and flexibility around [react-navigation](https://reactnavigation.org/).


## Installation
If you use yarn:
```
yarn add react-native-navigation-actions
```

If you use npm:
```
npm install --save react-native-navigation-actions
```

Construct a AppNavigator object passing you main Navigator (root).
```js
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from 'react-native-navigation-actions';

const Stack = StackNavigator({
  ItemList: { screen: require('...').default },
  Item: { screen: require('...').default },
})

const AppNav = AppNavigator(Stack)

/*...*/

import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('RNTemplateProj', () => AppNav);
```

## Usage
react-native-navigation-actions provides `Actions` that's dispatch NavigationActions in a simple call, and a `navigatorRef` just because it might be needed at some point.

```js
import { Actions, navigatorRef } from 'react-nativenavigation-actions';

// At any point you can call:
Actions.navigate({ routeName: 'Item', params: { title: item.name }})
Actions.navigate('DrawerOpen')
```

## API functions:
Same API as https://reactnavigation.org/docs/navigation-actions.html:
- back
- reset
- setParams
- init
- reset
- replace
- push
- poppopToTop

