import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  listView: {
    flex: 1
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    margin: 10,
    padding: 5,
    paddingVertical: 10,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },

  child: {
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Metrics.screenWidth * 0.25
  },
  childText: {
    color: Colors.charcoal
  },
  childs: {
    //height: Metrics.screenHeight * 0.18,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeff1',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  childImage: {
    width: 35,
    height: 35
  }
})
