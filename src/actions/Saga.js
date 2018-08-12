import {put, call, takeEvery, all} from 'redux-saga/effects';
import request from 'superagent';
import {SERVER_URL} from '../config'

// =======================================================POST==================================================
// =============================================================================================================

export const trigger = (data) => {
  return {type: 'TRIGGER_TURN_ON', data}
};

const initialProcess = () => {
  return {type: 'INITIAL_PROCESS'}
};

const processOK = (newData) => {
  return {type: 'PROCESS_SUCCESS', newData} // to reducer 'data'
};

const processEnd = () => {
  return {type: 'PROCESS_END'}
}

const processFail = () => {
  return {type: 'PROCESS_FAIL'}
};

const newUser = (user) => {
  return {type: 'USER_LOGGED_IN', user}
}

const tokenExpired = () => {
  return {type: 'TOKEN_EXPIRED'}
}

export const parseUserToken = (token) => {
  return {type: 'PARSE_TOKEN', token}
}

export function logoutAttempt(){
  localStorage.removeItem('token')
  return {type: 'REMOVE_USER'}
}

const stoper = () => {
  console.log('lol');
  return {type: 'RESET_STATUS'}
}

// =======================================================GET===================================================
// =============================================================================================================

export const getData = () => {
  return {type: 'REQUEST_START'}
}

const getOk = (data) => {
  return {type: 'GET_OK', data}  // to reducer 'data'
}

const getEnd = () => {
  return {type: 'GET_END'}
}

const getFail = () => {
  return {type: 'GET_FAIL'}
}

// ======================== WORKER & WATCHER ==========================

function* watcherGet(){
  yield takeEvery('REQUEST_START', workerGet)
}

function* workerGet(){
  try {
    var response = yield call(() =>{
      return request
              .get(`${SERVER_URL}get-visitor`)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .then(function(res){
                return res
              })
    })
    var data = JSON.parse(response.text)
    yield put(getOk(data))
    yield put(getEnd())
  } catch (error) {
    yield put(getFail())
  }
}

function* watcherPost(data){
  yield takeEvery('TRIGGER_TURN_ON', workerPost)
};

function* workerPost(data){
  try {
    yield put(initialProcess());
    var response = yield call(() => {
      return request
              .post(`${SERVER_URL}submit-visitor-facebook`)
              .send({data: data})
              .then(function(res){
                return res
              })
    })
    var newData = JSON.parse(response.text)
    localStorage.setItem('token', newData.token)
    yield put(processOK(newData))
    yield put(newUser(newData))
    yield put(processEnd())
  } catch (error) {
    yield put(processFail())
    yield put(processEnd())
  }
}

function* checkUserWatcher(token){
  yield takeEvery('PARSE_TOKEN', checkUserWorker)
}

function* checkUserWorker(token){
  try {
    yield put(stoper())
    var response = yield call(() => {
      return request
              .get(`${SERVER_URL}parse-token/${token.token}`)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .then(function(res){
                return res
              })
    })
    var user = JSON.parse(response.text)
    if (user.token) {
      yield put(tokenExpired())
    }else{
      yield put(newUser(user))
    }
    yield put(processEnd())
  } catch (error) {
    yield put(processEnd())
  }
}

export default function* rootSaga(){
  yield all([
    watcherPost(),
    watcherGet(),
    checkUserWatcher(),
  ])
}
