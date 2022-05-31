
const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SAVE_DATA: 'SAVE_DATA',
  LOAD_DATA: 'LOAD_DATA',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  //loadData: () => ({ type: actions.LOAD_DATA }),

  login: (token = false) => ({
    type: actions.LOGIN_REQUEST,
    payload: { token },
  }),

  saveData: (data) => ({
    type: actions.SAVE_DATA,
    payload: data,
  }),

  logout: () => ({
    type: actions.LOGOUT,
  }),
};

export default actions;
