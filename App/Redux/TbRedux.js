import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import union from 'lodash/union'
import { normalize, schema } from 'normalizr'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  tbRequest: ['data'],
  tbSuccess: ['payload'],
  tbFailure: ['error', 'payload'],
  tbInit: null,
  tbIndexRecommendRequest: ['page'],
  tbIndexRecommendSuccess: ['payload'],
  tbIndexRecommendFailure: ['error', 'payload'],
  tbDetailRequest: ['goodsId'],
  tbDetailSuccess: ['goodsId', 'smallImages', 'detailImages', 'guessLike', 'payload'],
  tbDetailFailure: ['error', 'payload']
})

export const TbTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  productLists: {}, // 产品表
  productSmallImages: {}, // 产品小图 轮播
  productDetailImages: {}, // 产品详情图
  productGuessLike: {}, // 产品推荐关联
  indexRecommend: [], // 首页推荐产品集
  indexRecommendMore: true, // 首页推荐产品集是否有更多
  fetching: false,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const TbSelectors = {
  getData: state => state.data,
  getProductLists: state => state.productLists, // 选择产品列表
  getIndexRecommendIds: state => state.indexRecommend, // 选择首页推荐ID列表
  getIndexRecommendPrds: state => { // 选择首页推荐产品列表
    return state.indexRecommend.length ? state.indexRecommend.map(id => state.productLists[id]) : []
  },
  // 获得产品小图 轮播图
  getSmallImages: (state, goodsId) => state.productSmallImages.hasOwnProperty(goodsId) ? state.productSmallImages[goodsId] : [],
  // 获得产品详情图
  getDetailImages: (state, goodsId) => state.productDetailImages.hasOwnProperty(goodsId) ? state.productDetailImages[goodsId] : [],
  // 获得产品相关推荐产品的ID列表
  getGuessLikeIds: (state, goodsId) => state.productGuessLike.hasOwnProperty(goodsId) ? state.productGuessLike[goodsId] : [],
  // 获得产品相关推荐产品的数据列表
  getGuessLikePrds: (state, goodsId) => {
    let ids = TbSelectors.getGuessLikeIds(state, goodsId)
    return ids.length ? ids.map(id => state.productLists[id]) : []
  },
  getProductInfo: (state, productId) => state.productLists.hasOwnProperty(productId) ? state.productLists[productId] : null
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: null})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}

// Something went wrong somewhere.
export const tbInit = state => INITIAL_STATE
export const failure = (state, {payload, error}) =>
  state.merge({fetching: false, error, payload})

// request the data from an api
export const indexRecommendRequest = (state, {page}) =>
  state.merge({fetching: true, payload: null})

// successful api lookup
export const indexRecommendSuccess = (state, action) => {
  const {payload} = action
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'goodsId'})
  const productsData = normalize(payload, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    productLists,
    indexRecommendMore: result.length < 20,
    indexRecommend: union(result, state.indexRecommend),
    payload
  })
}

// Something went wrong somewhere.
export const indexRecommendFailure = (state, {payload, error}) =>
  state.merge({fetching: false, error, payload})

// request the data from an api
export const tbDetailRequest = (state, {goodsId}) =>
  state.merge({fetching: true, payload: null})

// successful api lookup
export const tbDetailSuccess = (state, action) => {
  const {payload, goodsId, smallImages, detailImages, guessLike} = action

  // 处理推荐产品
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'goodsId'})
  const productsData = normalize(guessLike, [productSchema])
  const {entities: {items}, result} = productsData
  const productLists = Object.assign({}, items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    payload,
    productLists,
    productSmallImages: Object.assign({}, state.productSmallImages, {[goodsId]: smallImages}),
    productDetailImages: Object.assign({}, state.productDetailImages, {[goodsId]: detailImages}),
    productGuessLike: Object.assign({}, state.productGuessLike, {[goodsId]: result})
  })
}

// Something went wrong somewhere.
export const tbDetailFailure = state =>
  state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TB_REQUEST]: request,
  [Types.TB_SUCCESS]: success,
  [Types.TB_FAILURE]: failure,
  [Types.TB_INIT]: tbInit,
  [Types.TB_INDEX_RECOMMEND_REQUEST]: indexRecommendRequest,
  [Types.TB_INDEX_RECOMMEND_SUCCESS]: indexRecommendSuccess,
  [Types.TB_INDEX_RECOMMEND_FAILURE]: indexRecommendFailure,
  [Types.TB_DETAIL_REQUEST]: tbDetailRequest,
  [Types.TB_DETAIL_SUCCESS]: tbDetailSuccess,
  [Types.TB_DETAIL_FAILURE]: tbDetailFailure
})
