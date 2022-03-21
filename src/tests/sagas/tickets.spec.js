import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import watchTickets, { sendTicketInfo } from '../../sagas/tickets';
import * as types from '../../constants/actionTypes';
import * as api from '../../functions/api';
import { sendTicketInfo as sendTicketInfoAC } from '../../actions/tickets';
import { ticketInitialState } from '../../reducers/tickets';
import { errorMock } from '../mock';

describe('saga sendTicketInfo', () => {
  it('sendTicketInfo should call api and dispatch success action', async () => {
    const responseMock = 'Вы победили';
    const querySendTicketInfo = jest
      .spyOn(api, 'callApiWithRetry')
      .mockImplementation(() => Promise.resolve({ data: responseMock }));
    const dispatched = [];
    const stateMock = { tickets: ticketInitialState };

    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => stateMock,
      },
      sendTicketInfo,
      sendTicketInfoAC(),
    );

    expect(querySendTicketInfo).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      { payload: { data: responseMock }, type: types.SEND_TICKET_INFO_SUCCESS },
    ]);
    querySendTicketInfo.mockClear();
  });

  it('sendTicketInfo should call api and dispatch error action', async () => {
    const querySendTicketInfo = jest
      .spyOn(api, 'callApiWithRetry')
      .mockImplementation(() => Promise.reject(errorMock));
    const dispatched = [];
    const stateMock = { tickets: ticketInitialState };

    const result = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => stateMock,
      },
      sendTicketInfo,
      sendTicketInfoAC(),
    );

    expect(querySendTicketInfo).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([{ type: types.SEND_TICKET_INFO_FAILURE, error: errorMock }]);
    querySendTicketInfo.mockClear();
  });
});

describe('saga watchTickets', () => {
  const genObject = watchTickets();

  it('watchTickets should wait for every SEND_TICKET_INFO action and call sendTicketInfo', () => {
    expect(genObject.next().value).toEqual(takeEvery(types.SEND_TICKET_INFO, sendTicketInfo));
  });
});
