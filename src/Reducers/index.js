import { combineReducers } from 'redux'
import AuthorizationReducers from './AuthorizationReducers'
import ListReducers from './ListReducers'

export default combineReducers({
    authorizationResponse:AuthorizationReducers,
    listResponse:ListReducers,

})