import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import { colors } from '../config/theme'
import InstaFont from '../components/InstaFont'

import HomeScreen from '../screens/home-screen'
import SearchScreen from '../screens/search-screen'

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.backgroundGrey,
  },
  headerTintColor: colors.tintColor,
}

const createTabBarIconWrapper = (
  TabBarIconComponent,
  defaultProps,
) => props => <TabBarIconComponent {...defaultProps} color={props.tintColor} />

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        ...defaultNavigationOptions,
        tabBarIcon: createTabBarIconWrapper(Entypo, {
          name: 'home',
          size: 30,
        }),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        ...defaultNavigationOptions,
        tabBarIcon: createTabBarIconWrapper(InstaFont, {
          name: 'search',
          size: 45,
        }),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({}),
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'screen',

    tabBarOptions: {
      inactiveTintColor: colors.tabIconDefault,
      activeTintColor: colors.tabIconSelected,
      showLabel: false,
      style: {
        backgroundColor: colors.backgroundGrey,
      },
    },
  },
)
