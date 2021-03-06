import React, { PureComponent } from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import { View, StyleSheet, Image } from 'react-native'

import MeInfoScreen from '../Containers/MeInfoScreen'
import SearchScreen from '../Containers/SearchScreen'
import ClassifyScreen from '../Containers/ClassifyScreen'
import HomeScreen from '../Containers/HomeScreen'
import TopicScreen from '../Containers/TopicScreen'
import MyCenter from '../Containers/MyCenter'

import  SearchBar from '../Components/SearchBar'

class SaleHot extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    return <TopicScreen sid={2} navigation={this.props.navigation}/>
  }
}

class SaleToday extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    return <TopicScreen sid={3} navigation={this.props.navigation}/>
  }
}

const TabNav = TabNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        header: (
          <SearchBar
            showLogo={true}
            onSubmit={key => {
              navigate('result', {
                keyWord: key
              })
            }}
          />
        ),
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    classify: {
      screen: ClassifyScreen,
      navigationOptions: {
        tabBarLabel: '分类',
        title: '优惠券分类',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_classify.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: '超级搜',
        title: '超级搜',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/search_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    hot: {
      screen: SaleHot,
      navigationOptions: {
        tabBarLabel: '销量爆款',
        title: '销量爆款',
        initialRouteParams: {
          id: 1
        },
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_hot.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    today: {
      screen: SaleToday,
      navigationOptions: {
        tabBarLabel: '今日必拍',
        title: '今日必拍',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_today.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    },
    me: {
      screen: MyCenter,
      navigationOptions: {
        tabBarLabel: '我的',
        title: '我的',
        headerLeft: <View/>,
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={require('../Images/nav_today.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#FF3C3C',
      inactiveTintColor: '#666'
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
})

export default TabNav
