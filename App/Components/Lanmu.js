import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity  } from 'react-native'
import styles from './Styles/LangmuStyle'

export default class Lanmu extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }


  render () {
    const _onPress = (item) => {
      const nav = item.nav != null ? item.nav : 'html'
      console.log(this.props.navigate)
      this.props.navigate &&
      this.props.navigate(nav, {
        title: item.Title,
        url: item.url,
        //...item.params
      })
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.lanmu} source={require('../Images/lanmu.png')} />
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() =>
              _onPress({
                ID: 5,
                Title: '今日上新'
              })
            }
            activeOpacity={1}
            style={styles.left}
          >
            <Image />
            <Text>今日上新</Text>
          </TouchableOpacity>
          <View style={styles.right}>
            <View style={styles.top}>
              <TouchableOpacity
                onPress={() =>
                  _onPress({
                    ID: 3,
                    Title: '海淘精选'
                  })
                }
                activeOpacity={1}
                style={styles.subLeft}
              >
                <Image />
                <Text>海淘精选</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  _onPress({
                    ID: 1,
                    Title: '聚划算'
                  })
                }
                activeOpacity={1}
                style={styles.subRight}
              >
                <Image />
                <Text>聚划算</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() =>
                  _onPress({
                    ID: 4,
                    Title: '天猫好货'
                  })
                }
                activeOpacity={1}
                style={styles.subLeft}
              >
                <Image />
                <Text>天猫好货</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  _onPress({
                    ID: 2,
                    Title: '淘抢购'
                  })
                }
                activeOpacity={1}
                style={styles.subRight}
              >
                <Image />
                <Text>淘抢购</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
