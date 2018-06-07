import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginTop: Metrics.isIOS ? 20 : 0,
    backgroundColor: '#fff'
  },
  logo: {
    height: 24,
    width: 80,
    resizeMode: 'stretch' // 拉伸模式
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#eeeff1',
    alignItems: 'center'
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'stretch'
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: 5,
    height: 32
  },
  searchButton: {
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancel: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
