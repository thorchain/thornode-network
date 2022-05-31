/*
import {
   SAVE_GLOBAL_DATA
} from './types';

const INIT_STATE = { globalData: 'inital value' };

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SAVE_GLOBAL_DATA:
            return { ...state, globalData: action.payload };
        default: return { ...state };
    }
}
*/

import actions from './actions';

const initState = { globalData: {accessToken:'null', idToken:'null' }};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SAVE_GLOBAL_DATA:
      return {
        ...state,
        globalData: action.payload,
      };

    default:
      return state;
  }
}
