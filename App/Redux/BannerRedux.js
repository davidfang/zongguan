import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { normalize, schema } from 'normalizr'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  bannerRequest: ['banner_type'],
  bannerSuccess: ['data', 'banner_type'],
  bannerFailure: null
})

export const BannerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  items: {},
  swiper: [],
  recommend: [],
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const BannerSelectors = {
  getItems: state => state.items,
  getSwiper: state => state.swiper,
  getRecommend: state => state.recommend
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({fetching: true})

// successful api lookup
export const success = (state, action) => {
  const {data, banner_type} = action

  const bannerSchema = new schema.Entity('items')
  const bannerData = normalize(data.items, [bannerSchema])
  const {entities: {items}, result} = bannerData
  const resultItems = Object.assign({}, state.items, items)
  return state.merge({fetching: false, error: null, data, items: resultItems, [banner_type]: result, payload: null})
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const {payload} = action
  return INITIAL_STATE
  //state.merge({fetching: false, error: true, payload})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANNER_REQUEST]: request,
  [Types.BANNER_SUCCESS]: success,
  [Types.BANNER_FAILURE]: failure
})
