import {combineReducers} from 'redux'
import status from './status'
import data from './data'

const rootReducer = combineReducers({
  data, status
})

export default rootReducer
