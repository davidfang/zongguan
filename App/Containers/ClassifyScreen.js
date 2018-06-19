import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, SectionList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import GoodsCategoryActions, {GoodsCategorySelectors} from '../Redux/GoodsCategoryRedux'

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
      cat: item.id,
      title: item.name
    })
  }
  _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.classifyItem}
      onPress={() => this._redirect(item)}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <Image style={styles.image} source={{uri: item.image}}/>
    </TouchableOpacity>
  )

  renderLRow = (item) => {
    return (
      <TouchableOpacity
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
    let section = info.viewableItems[0].section
    if (section) {
      let index = this.props.goodsCategories.indexOf(section)
      if (index < 0) {
        index = 0
      }
      this._flatList.scrollToIndex({animated: true, index: index, viewPosition: 0.5})
      this.setState({cell: index})
    }
  }


  renderRRow = (item) => {
    return (
      <TouchableOpacity style={styles.rItem} onPress={() => this._redirect(item)}>
        <Image style={styles.icon} source={{uri: item.item.img}}/>
        <Text style={styles.categoryText}>{item.item.title}</Text>
      </TouchableOpacity>
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
      <View style={{height: 1, backgroundColor: 'gray'}}/>
    )
  }

  render () {
    if(this.props.goodsCategories.length > 0) {
      return (
        <View style={styles.container}>
          <SearchBar
            showLogo={true}
            onSubmit={key => {
              navigate('result', {
                keyworld: key
              })
            }}
          />
          <View style={styles.classify}>
            <FlatList
              ref={flat => (this._flatList = flat)}
              style={styles.leftList}
              data={this.props.goodsCategories}
              renderItem={(item) => this.renderLRow(item)}
              getItemLayout={this._itemLayout}
              ItemSeparatorComponent={() => this.separator()}
              keyExtractor={(item) => item.id}

            />
            <SectionList
              ref={flat => (this._sectionList = flat)}
              //style={styles.rightList}
              contentContainerStyle={styles.rightList}
              renderSectionHeader={(section) => this.sectionComp(section)}
              renderItem={(item) => this.renderRRow(item)}
              sections={this.props.goodsCategories}
              keyExtractor={(item) => item.id}
              onViewableItemsChanged={(info) => this.itemChange(info)}
            />
          </View>
        </View>
      )
    }else{
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
