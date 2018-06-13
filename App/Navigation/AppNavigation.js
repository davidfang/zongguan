import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigator } from 'react-navigation'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import MeInfoScreen from '../Containers/MeInfoScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import WebScreen from '../Containers/WebScreen'
import TopicScreen from '../Containers/TopicScreen'
import SubjectScreen from '../Containers/SubjectScreen'
import SearchScreen from '../Containers/SearchScreen'
import ResultScreen from '../Containers/ResultScreen'
import DetailScreen from '../Containers/DetailScreen'
import ClassifyScreen from '../Containers/ClassifyScreen'
import ClassifyListScreen from '../Containers/ClassifyListScreen'
import ChannelScreen from '../Containers/ChannelScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoadingScreen from '../Containers/LoadingScreen'

import LoggedInStackNavigator from './LoggedInStackNavigator'
import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'
import MainTabNavigator from './MainTabNavigator'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: {screen: LoginScreen},
  RegisterScreen: {screen: RegisterScreen},
  ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  ChangePasswordScreen: {screen: ChangePasswordScreen},
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        title: '设置'
      }
    }
  },//{ screen: SettingsScreen },
  MeInfoScreen: {screen: MeInfoScreen},
  WebScreen: {screen: WebScreen},
  TopicScreen: {screen: TopicScreen},
  SubjectScreen: {screen: SubjectScreen},
  SearchScreen: {screen: SearchScreen},
  ResultScreen: {screen: ResultScreen},
  DetailScreen: {screen: DetailScreen},
  ClassifyScreen: {screen: ClassifyScreen},
  ClassifyListScreen: {screen: ClassifyListScreen},
  ChannelScreen: {screen: ChannelScreen},
  HomeScreen: {screen: HomeScreen},
  LoadingScreen: {screen: LoadingScreen},
  LoggedInStack: {screen: LoggedInStackNavigator},
  NotLoggedInStack: {screen: NotLoggedInStackNavigator},
  MainStack: {
    screen: MainTabNavigator,
    navigationOptions: ({navigation}) => {
      const {state} = navigation
      return {
        header: null
      }
    }
  },
  LaunchScreen: {screen: LaunchScreen}
}, {
  // Default config for all screens
  headerMode: 'screen',
  mode: 'card',
  initialRouteName: 'MainStack',
  navigationOptions: ({navigation}) => {
    let {goBack, navigate} = navigation
    return {
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: <Icon name='chevron-left' onPress={() => {goBack()}} size={24} color='#fff'
                        style={{marginLeft: 20}}/>,
      headerRight: <Icon name='home' onPress={() => {navigate('MainStack')}} size={24} color='#fff'
                         style={{marginRight: 20}}/>,
    }
  }
})

export default PrimaryNav
