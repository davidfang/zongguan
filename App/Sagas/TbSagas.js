/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put,select } from 'redux-saga/effects'
import TbActions,{ TbSelectors } from '../Redux/TbRedux'

export const indexRecommendPageNo = (state) => TbSelectors.getIndexRecommendPageNo(state.tb)
export const channelProductPageNo = (state,channelId) => TbSelectors.getChannelProductPageNo(state.tb,channelId)

export function * getTbIndexRecommend (api, action) {
  //const {page} = action
  const page = yield select(indexRecommendPageNo)
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbIndexRecommend, page)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbIndexRecommendSuccess(response.data.data))
    } else {
      yield put(TbActions.tbFailure(response.data.message, response))
    }
  } else {
    yield put(TbActions.tbFailure(response.problem, response))
  }
}

export function * getTbChannelProduct (api, action) {
  const {channelId, sortId} = action
  const page = yield select(channelProductPageNo, channelId)
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbChannelProduct, channelId, sortId, page)
  yield put(TbActions.tbFailure(response, response))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      yield put(TbActions.tbChannelProductSuccess(channelId, response.data.data))
    } else {
      yield put(TbActions.tbFailure(response.data.message, response))
    }
  } else {
    yield put(TbActions.tbFailure(response.problem, response))
  }
}

export function * getTbDetail (api, action) {
  const {goodsId} = action
  // get current data from Store
  // const currentData = yield select(TbSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTbDetail, goodsId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // yield put(TbActions.tbSuccess(response.data))
    if (response.data.status) {
      const {smallImages, detailImages, guessLike} = response.data.data
      yield put(TbActions.tbDetailSuccess(goodsId, smallImages, detailImages, guessLike, response.data.data))
    } else {
      yield put(TbActions.tbFailure(response.data.message, response))
    }
  } else {
    yield put(TbActions.tbFailure(response.problem, response))
  }
}
