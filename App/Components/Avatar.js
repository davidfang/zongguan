import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './Styles/AvatarStyle'

export default class Avatar extends React.Component {

  render () {
    const {width, name, backgroundColor, avatar} = this.props
    if (avatar) {
      return (
        <Image source={{uri: avatar}}
               style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}/>
      )
    } else {
      return (
        <View style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}>
          <Text>{name}</Text>
        </View>
      )
    }
  }
}

// Prop type warnings
Avatar.propTypes = {
  width: PropTypes.number,
  name: PropTypes.string,
  backgroundColor: PropTypes.string,
  avatar: PropTypes.string
}

// Defaults for props
Avatar.defaultProps = {
  width: 60,
  backgroundColor: 'skyblue'
}
