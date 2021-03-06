import { takeEvery, put, call, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../constants/actionTypes';
import { callApiWithRetry } from '../functions/api';
import { checkIfTicketWon } from '../functions/ticket';

export function* sendTicketInfo() {
  const ticket = yield select((state) => state.tickets.ticket);
  const winCombination = yield select((state) => state.tickets.winCombination);
  const selectedFirstCells = ticket.firstCells
    .map(({ selected, number }) => selected && number)
    .filter(Boolean);
  const selectedSecondCells = ticket.secondCells
    .map(({ selected, number }) => selected && number)
    .filter(Boolean);

  const isTicketWon = checkIfTicketWon({ selectedFirstCells, selectedSecondCells }, winCombination);
  const body = {
    selectedNumber: {
      firstField: selectedFirstCells,
      secondField: selectedSecondCells,
    },
    isTicketWon,
  };

  try {
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
    if (isTicketWon) toast.warn('Ваш билет выйгрышный, но сервер вернул ошибку');
    else toast.warn('К сожалению, вы проиграли. Попробуйте ещё');
  }
}

export default function* watchTickets() {
  yield takeEvery(types.SEND_TICKET_INFO, sendTicketInfo);
}
