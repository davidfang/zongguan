import React, { Component } from 'react'
import { TouchableOpacity, View, Image, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

import SelectItem from '../Components/SelectItem'
// Styles
import styles from './Styles/MeInfoScreenStyle'
import { Images } from '../Themes/'

class MeInfoScreen extends Component {
  render2 () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>MeInfoScreen</Text>
          {this.props.isLoggedIn || <Text style={styles.button} onPress={() => this.props.navigation.navigate('NotLoggedInStack')}>登录</Text>}
          {this.props.isLoggedIn && <Text style={styles.button} onPress={() => this.props.navigation.navigate('NotLoggedInStack')}>退出</Text>}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Image  source={Images.icHeadBg} style={styles.headbg} resizeMode={'cover'} />
        <TouchableOpacity activeOpacity={0.6}  style={styles.headContainer}>
          <Image
            source={Images.icHead}
            style={styles.head}
          />
          {this.props.isLoggedIn || <Text style={styles.button} onPress={() => this.props.navigation.navigate('NotLoggedInStack')}>登录</Text>}
          {this.props.isLoggedIn && <Text style={styles.button} onPress={() => this.props.logout()}>退出</Text>}
        </TouchableOpacity>
        <View style={styles.space} />
        <ScrollView>
          <SelectItem title='优惠券' icon={Images.icCoupon} showline={true} onPress={this._coupon.bind(this)} />
          <SelectItem title='我的收藏' icon={Images.icColl} showline={true} onPress={this._collection.bind(this)} />
          <SelectItem title='分享App' icon={Images.icShare} showline={true} onPress={this._share.bind(this)} />
          <SelectItem title='关于我' icon={Images.icAbout} showline={false} onPress={this._about.bind(this)} />
          <View style={styles.space} />
          <SelectItem title='设置' icon={Images.icSetting} onPress={this._setting.bind(this)} />
          <View style={styles.underline} />
        </ScrollView>
      </View>
    )
  }

  /**
   * 跳转到登录界面
   */
  _login () {

  }

  /**
   * 优惠券
   */
  _coupon () {

  }

  /**
   * 收藏
   */
  _collection () {

  }

  /**
   * 分享App
   */
  _share () {

  }

  /**
   * 关于我
   */
  _about () {

  }

  /**
   * 设置
   */
  _setting () {

  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeInfoScreen)
