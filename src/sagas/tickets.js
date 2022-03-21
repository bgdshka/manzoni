import { takeEvery, put, call, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../constants/actionTypes';
import { callApiWithRetry } from '../functions/api';
import { checkIfTicketWon } from '../functions/ticket';

export function* sendTicketInfo() {
  try {
    const ticket = yield select((state) => state.tickets.ticket);
    const winCombination = yield select((state) => state.tickets.winCombination);
    const selectedFirstCells = ticket.firstCells
      .map(({ selected, number }) => selected && number)
      .filter(Boolean);
    const selectedSecondCells = ticket.secondCells
      .map(({ selected, number }) => selected && number)
      .filter(Boolean);

    const body = {
      selectedNumber: {
        firstField: selectedFirstCells,
        secondField: selectedSecondCells,
      },
      isTicketWon: checkIfTicketWon({ selectedFirstCells, selectedSecondCells }, winCombination),
    };

    const response = yield call(callApiWithRetry, '/rock-block', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    yield put({
      type: types.SEND_TICKET_INFO_SUCCESS,
      payload: response,
    });
    toast.success('Вы победили!');
  } catch (error) {
    yield put({
      type: types.SEND_TICKET_INFO_FAILURE,
      error,
    });
    toast.warn('К сожалению, вы проиграли. Попробуйте ещё');
  }
}

export default function* watchOrders() {
  yield takeEvery(types.SEND_TICKET_INFO, sendTicketInfo);
}
