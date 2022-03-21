import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { ticketInitialState } from '../../reducers/tickets';

describe('Root Reducer', () => {
  const store = createStore(() => rootReducer({}));

  it('reducer::tickets store loaded correctly', () => {
    expect(store.getState().tickets).toEqual(ticketInitialState);
  });
});
