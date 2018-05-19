import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { isLoggedIn } from '../Redux/LoginRedux'
// Styles
import styles from './Styles/MeInfoScreenStyle'

class MeInfoScreen extends Component {
  render () {
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
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeInfoScreen)
