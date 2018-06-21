import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './Styles/ProductImagesStyle'

export default class ProductImages extends Component {
  // Prop type warnings
  static propTypes = {
    source: PropTypes.array.isRequired
  }

  // Defaults for props
  static defaultProps = {
    source: []
  }

  render () {
    const {source} = this.props
    return (
      <View style={styles.swiper}>
        <Swiper
          height={140}
          loop={true}
          index={0}
          autoplay={true}
          horizontal={true}
        >
          {source && source.length >= 1 ? (
            source.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={styles.swiperImage}
                  source={{
                    uri: item.imgUrl
                  }}
                  resizeMode='cover'
                />
              )
            })
          ) : (
            <View/>
          )}
        </Swiper>
      </View>
    )
  }
}
