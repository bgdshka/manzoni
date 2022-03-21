import { fork, all, take, cancel } from 'redux-saga/effects';
import watchTickets from './tickets';

export default () => all([fork(watchTickets)]);

export function createDynamicSaga(changeActionType, startingSagas) {
  function* start(sagas) {
    try {
      yield sagas;
    } catch (e) {
      console.error('error', e);
    }
  }
  return function* dynamicSaga() {
    let action;
    let rootTask = yield fork(start, startingSagas);
    // eslint-disable-next-line no-cond-assign
    while ((action = yield take(changeActionType))) {
      yield cancel(rootTask);
      rootTask = yield fork(start, action.sagas);
    }
  };
}
