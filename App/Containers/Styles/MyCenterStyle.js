import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  // container: {
  //   flex: 1,
  //   marginTop: Metrics.navBarHeight,
  //   backgroundColor: Colors.steel
  // },
  intro: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 3,
    backgroundColor: Colors.steel,
    // paddingLeft: Metrics.doubleBaseMargin,
    // paddingRight: Metrics.doubleBaseMargin,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // flexDirection: 'column'
  },
  headbg: {
    width: Metrics.screenWidth,
    height: 230
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  introLeft: {
    // flex: 2,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  introRight: {
    // flex: 8,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: Colors.ember
  },
  rowItemGroup: {
    marginTop: Metrics.baseMargin,
    // marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.silver
  },
  title: {
    color: Colors.silver
  }
})
