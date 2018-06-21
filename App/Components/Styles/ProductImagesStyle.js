import { StyleSheet } from 'react-native'
import {Metrics} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  swiper: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.5,
    padding: 0,
    margin: 0
  },
  swiperImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.5
  }
})
