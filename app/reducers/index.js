import { combineReducers } from 'redux'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  userProfileData: UserProfileReducer
})

export default rootReducer;
