import actions from './actions';

const initState = { idToken: null, allData: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
        allData: action.allData
      };


      case actions.SAVE_DATA:
        return {
          ...state,
          allData: action.payload,
        };

    case actions.LOGOUT:
      return initState;

    default:
      return state;
  }
}
