/*
import {
   SAVE_GLOBAL_DATA
} from './types';

export const saveGlobalData = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_GLOBAL_DATA,
      payload: data
    });
}
*/

const actions = {
  SAVE_GLOBAL_DATA: 'SAVE_GLOBAL_DATA',


  saveGlobalData: (data) => ({
    type: actions.SAVE_GLOBAL_DATA,
    payload: data,
  }),


};

export default actions;
