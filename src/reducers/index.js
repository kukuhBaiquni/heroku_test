import {combineReducers} from 'redux'
import status from './status'
import data from './data'
import user from './user'

const rootReducer = combineReducers({
  data, status, user
})

export default rootReducer
