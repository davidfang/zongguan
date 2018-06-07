import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  swiper: {
    width: Metrics.width,
    height: 150,
    padding: 0,
    margin: 0,
    backgroundColor: Colors.silver
  },
  swiperItem: {
    flex: 1,
    width: Metrics.width,
  },
  swiperImage: {
    flex: 1,
    width: Metrics.width,
    resizeMode: 'stretch'
  }
})
