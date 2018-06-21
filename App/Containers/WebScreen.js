import React, { Component } from 'react'
import { ScrollView, Text, WebView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WebScreenStyle'

class WebScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {state} = this.props.navigation

    return (
      <WebView
        style={styles.container}
        javaScriptEnabled={true}
        source={{uri: state.params.url}}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen)
