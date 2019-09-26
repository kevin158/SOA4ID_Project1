import React from 'react'
import { StackNavigator } from 'react-navigation'

import MainTabNavigator from './main-tab-navigator'
import { colors } from '../config/theme'

const navigationOptions = {
  headerStyle: {
    backgroundColor: colors.backgroundGrey,
  },
  headerTintColor: colors.tintColor
}

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions,
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal'
      }
    })
  }
)

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />
  }
}

