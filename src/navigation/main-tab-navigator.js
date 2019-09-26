import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import { colors } from '../config/theme'
import InstaFont from '../components/InstaFont'

import HomeScreen from '../screens/home-screen'
import SearchScreen from '../screens/search-screen'
// import LikesScreen from '../screens/likes-screen'
// import UserAvatar from '../components/common/user-avatar'
// import CreatePostStack from './create-post-stack'
// import ProfileStack from './profile-stack'

// const SearchScreen = () => <View />
const LikesScreen = () => <View />
const UserAvatar = () => <View />
const CreatePostStack = () => <View />
const ProfileStack = () => <View />

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
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     ...defaultNavigationOptions,
    //     tabBarIcon: createTabBarIconWrapper(InstaFont, {
    //       name: 'home',
    //       size: 30,
    //     }),
    //     headerLeft: (
    //       <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
    //         <InstaFont
    //           name="camera"
    //           size={30}
    //           style={{ marginLeft: 10, marginBottom: 10 }}
    //         />
    //       </TouchableOpacity>
    //     ),
    //     headerRight: (
    //       <TouchableOpacity onPress={() => {}}>
    //         <InstaFont
    //           name="plane"
    //           size={25}
    //           style={{ marginLeft: 15, marginBottom: 10 }}
    //         />
    //       </TouchableOpacity>
    //     ),
    //   }),
    // },
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
   
    // Likes: {
    //   screen: LikesScreen,
    //   navigationOptions: {
    //     ...defaultNavigationOptions,
    //     tabBarIcon: createTabBarIconWrapper(InstaFont, {
    //       name: 'heart',
    //       size: 25,
    //     }),
    //   },
    // },
    // Profile: {
    //   screen: ProfileStack,
    //   navigationOptions: {
    //     ...defaultNavigationOptions,
    //     tabBarIcon: <UserAvatar />,
    //   },
    // },
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
