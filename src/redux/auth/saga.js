import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken, getAllData } from '@iso/lib/helpers/utility';
import actions from './actions';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { token } = payload;

    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
        yield put({ type: actions.LOGIN_ERROR });
      }

  });
}

export function* dataSaved() {
  yield takeEvery(actions.SAVE_DATA, function*(payload) {
    yield localStorage.setItem('allData', JSON.stringify(payload.payload));
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}


export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    const allData = getAllData().get('allData')
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
        allData: JSON.parse(allData)
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(dataSaved),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
