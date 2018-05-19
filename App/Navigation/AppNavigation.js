import { StackNavigator } from 'react-navigation'
import MeInfoScreen from '../Containers/MeInfoScreen'
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
  LoggedInStack: { screen: LoggedInStackNavigator },
  NotLoggedInStack: { screen: NotLoggedInStackNavigator },
  MainStack: { screen: MainTabNavigator },
  LaunchScreen: {screen: LaunchScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MainStack',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
