import { takeEvery, put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { callApiWithRetry } from '../functions/api';

export function* sendTicketInfo(action) {
  try {
    const response = yield call(callApiWithRetry, '/rock-block');

    yield put({
      type: types.SEND_TICKET_INFO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: types.SEND_TICKET_INFO_FAILURE,
      error,
    });
  }
}

export default function* watchOrders() {
  yield takeEvery(types.SEND_TICKET_INFO, sendTicketInfo);
}
