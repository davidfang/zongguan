import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  bg: {
    width: Metrics.width,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchBox: {
    height: 45,
    width: Metrics.width * 0.9,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginLeft: 10,
    marginRight: 5,
    resizeMode: 'stretch'
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: 5
  },
  searchButton: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#ffb300',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  cancel: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  }
})
