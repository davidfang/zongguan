import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'column'
  },

  headContainer: {
    position: 'absolute',
    top: 100,
    left: (Metrics.screenWidth - 50) / 2
  },

  head: {
    width: 60,
    height: 60,
    borderRadius: 30

  },

  headbg: {
    width: Metrics.screenWidth,
    height: 230
  },

  space: {
    height: 10,
    backgroundColor:'#E6E6E6'
  }
})
