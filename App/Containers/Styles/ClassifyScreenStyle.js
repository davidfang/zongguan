import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: '#FFFFFF'
  },
  classify: {
    flexDirection: 'row'
  },
  classifyItem: {
    width: Metrics.width / 2 - 15,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eeeff1'
  },
  info: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  name: {
    color: '#333',
    fontWeight: '700'
  },
  desc: {
    fontSize: 14,
    color: '#a6a4b2'
  },
  image: {
    height: 70,
    width: 70
  },

  leftList: {
    width: 1 * Metrics.screenWidth / 4,
    backgroundColor: '#E9E9EF'
  },
  lItem: {
    minHeight: 44,
    justifyContent: 'center'
  },
  lText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16
  },
  rightList: {
    width: 3 * Metrics.screenWidth / 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  rItem: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rHeader: {
    height: 30,
    width: Metrics.screenWidth * 3 / 4,
    backgroundColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 80,
    width: 80,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#999999'
  },
  categoryText: {
    fontSize: 13
  },
  moneyText: {
    color: 'orange'
  }
})
