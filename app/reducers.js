import { combineReducers } from 'redux-immutable';

import C from './constants';
import GlobalNavigation from './reducers/GlobalNavigationReducer';
import AppTabsNavigation from './reducers/AppTabsReducer';
import StudyTabNavigation, { StudyTabReducer } from './reducers/StudyTabReducers';

const scopeNavigationReducer = (reducer, scopeName) => {
  return (state, action) => {
    if (action.scope && action.scope !== scopeName) {
      return state;
    } else {
      return reducer(state, action);
    }
  };
};

const rootReducer = combineReducers({
  STATE_GLOBAL_NAV: scopeNavigationReducer(GlobalNavigation, C.S_GLOBAL_NAV),
  STATE_APPTABS_NAV: scopeNavigationReducer(AppTabsNavigation, C.S_APPTABS_NAV),
  STATE_STUDYTAB_NAV: scopeNavigationReducer(StudyTabNavigation, C.S_STUDYTAB_NAV),
  STATE_STUDYTAB: scopeNavigationReducer(StudyTabReducer, C.S_STUDYTAB),
})
export default rootReducer;