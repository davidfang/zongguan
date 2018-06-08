import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    width: Metrics.width,
    backgroundColor: '#FFFFFF'
  },
  header: {
    backgroundColor: '#f5f5f5',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lanmu: {
    height: 22,
    width: '100%',
    resizeMode: 'contain'
  },
  body: {
    height: 200,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    borderRightColor: '#f5f5f5',
    borderRightWidth: 1
  },
  right: {
    flex: 2
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1
  },
  bottom: {
    flex: 1,
    flexDirection: 'row'
  },
  subLeft: {
    flex: 1,
    borderRightColor: '#f5f5f5',
    borderRightWidth: 1
  },
  subRight: {
    flex: 1
  }
})
