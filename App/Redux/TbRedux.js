import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import union from 'lodash/union'
import { normalize, schema } from 'normalizr'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  tbRequest: ['data'],
  tbSuccess: ['payload'],
  tbFailure: null,
  tbIndexRecommendRequest: ['page'],
  tbIndexRecommendSuccess: ['payload'],
  tbIndexRecommendFailure: null
})

export const TbTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  productLists: {}, // 产品表
  indexRecommend: [], // 首页推荐产品集
  indexRecommendMore: true, // 首页推荐产品集是否有更多
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const TbSelectors = {
  getData: state => state.data,
  getProductLists: state => state.productLists,
  getIndexRecommend: state => state.indexRecommend
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
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null})

// request the data from an api
export const indexRecommendRequest = (state, {page}) =>
  state.merge({fetching: true,  payload: null})

// successful api lookup
export const indexRecommendSuccess = (state, action) => {
  const {payload} = action
  const productSchema = new schema.Entity('items', {}, {idAttribute: 'num_iid'})
  const productsData = normalize(payload.n_tbk_item, [productSchema])
  const {entities: {items}, result} = productsData
  Object.assign(items, state.productLists)

  return state.merge({
    fetching: false,
    error: null,
    productLists: items,
    indexRecommendMore: result.length < 20,
    indexRecommend: union(result, state.indexRecommend),
    payload
  })
}

// Something went wrong somewhere.
export const indexRecommendFailure = state =>
  INITIAL_STATE
  //state.merge({fetching: false, error: true, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TB_REQUEST]: request,
  [Types.TB_SUCCESS]: success,
  [Types.TB_FAILURE]: failure,
  [Types.TB_INDEX_RECOMMEND_REQUEST]: indexRecommendRequest,
  [Types.TB_INDEX_RECOMMEND_SUCCESS]: indexRecommendSuccess,
  [Types.TB_INDEX_RECOMMEND_FAILURE]: indexRecommendFailure
})
