import { combineReducers } from 'redux'

import { reducer as FlashcardsReducer} from './app/flashcards'
import { reducer as CollectionsReducer } from './app/collections'
import { reducer as UserPrefsReducer} from './app/userPrefs'
import { reducer as UserProfileReducer} from './app/userProfile'
import { reducer as UserCountersReducer } from './app/userCounters'

const rootReducer = combineReducers({
  flashcards: FlashcardsReducer,
  collections: CollectionsReducer,
  userPrefs: UserPrefsReducer,
  userProfile: UserProfileReducer,
  userCounters: UserCountersReducer,
})

export default rootReducer;
