import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, SectionList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import GoodsCategoryActions, { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'

// Styles
import styles from './Styles/ClassifyScreenStyle'

import SearchBar from '../Components/SearchBar'

class ClassifyScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell: 0
    }
  }

  componentDidMount () {
    if (this.props.goodsCategories.length < 1) {
      this.props.getGoodsCategory()
    }
  }

  /**
   * getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout用起来就既高效又简单
   */
  _itemLayout = (item, index) => {
    return {
      length: 20,
      offset: 20 * index,
      index
    }
  }
  _redirect = item => {
    const {navigate} = this.props.navigation
    navigate('ClassifyListScreen', {
      channelId: item.id,
      title: item.title
    })
  }
  renderLRow = (item) => {
    return (
      <TouchableOpacity
        key={item.index}
        style={[styles.lItem, {backgroundColor: item.index == this.state.cell ? 'white' : null}]}
        onPress={() => this.cellAction(item)}>
        <Text style={styles.lText}>{item.item.title}</Text>
      </TouchableOpacity>
    )
  }

  cellAction = (item) => {
    if (item.index <= this.props.goodsCategories.length) {
      this.setState({
        cell: item.index
      })
      this._sectionList.scrollToLocation({itemIndex: 0, sectionIndex: item.index, animated: true, viewOffset: 20})
    }
  }

  itemChange = (info) => {
    //alert(info)
    let section = info.viewableItems[0].section
    if (section) {
      let index = this.props.goodsCategories.indexOf(section)
      //alert(index)
      if (index < 0) {
        index = 0
      }
      this._flatList.scrollToIndex({animated: true, index: index, viewPosition: 0.5})
      this.setState({cell: index})
    }
  }
  _renderRItem = ({item}) => {
    return (
      <TouchableOpacity key={item.id} style={styles.rItem} onPress={() => this._redirect(item)}>
        <Image style={styles.icon} source={{uri: item.img}}/>
        <Text style={styles.categoryText}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  renderRRow = ({section, index}) => {
    if (index != 0) return null
    return (
      <FlatList
        key={section.id}
        numColumns={3}
        data={section.data}
        getItemLayout={(layoutData, index) => ({
          length: 50,
          offset: 50 * index,
          index
        })}
        renderItem={this._renderRItem}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  }

  sectionComp = (section) => {
    return (
      <View style={styles.rHeader}>
        <Text>{section.section.title}</Text>
      </View>
    )
  }

  separator = () => {
    return (
      <View />
    )
  }

  render () {
    const {navigate} = this.props.navigation
    if (this.props.goodsCategories.length > 0) {
      return (
        <View style={styles.container}>
          <SearchBar
            showLogo={true}
            onSubmit={key => {
              navigate('ResultScreen', {
                keyWord: key
              })
            }}
          />
          <View style={styles.classify}>
            <FlatList
              ref={flat => (this._flatList = flat)}
              style={styles.leftList}
              data={this.props.goodsCategories}
              renderItem={(item) => this.renderLRow(item)}
              initialNumToRender={15}
              getItemLayout={this._itemLayout}
              ItemSeparatorComponent={() => this.separator()}
              keyExtractor={(item) => item.id.toString()}

            />
            <SectionList
              ref={flat => (this._sectionList = flat)}
              //style={styles.rightList}
              contentContainerStyle={styles.rightList}
              renderSectionHeader={(section) => this.sectionComp(section)}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              //renderItem={(item) => this.renderRRow(item)}
              renderItem={this.renderRRow}
              sections={this.props.goodsCategories}
              keyExtractor={(item) => item.id.toString()}
              onViewableItemsChanged={(info) => this.itemChange(info)}
            />
          </View>
        </View>
      )
    } else {
      return <View style={styles.container}/>
    }
  }
}

const mapStateToProps = (state) => {
  const goodsCategories = GoodsCategorySelectors.getData(state.goodsCategory)
  return {
    goodsCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGoodsCategory: () => dispatch(GoodsCategoryActions.goodsCategoryRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyScreen)
