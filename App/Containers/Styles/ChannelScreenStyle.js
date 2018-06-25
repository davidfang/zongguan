import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import {Colors} from '../../Themes'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  /* scrollableTab  */
  scrollableTab: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  scrollableTabBarUnderlineStyle: {
    backgroundColor: Colors.fire
  }
})
