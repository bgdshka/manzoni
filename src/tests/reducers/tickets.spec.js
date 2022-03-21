import reducer, { ticketInitialState } from '../../reducers/tickets';
import * as types from '../../constants/actionTypes';
import { errorMock } from '../mock';

describe('reducer tickets', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(ticketInitialState);
  });

  it('should handle tickets::SEND_TICKET_INFO', () => {
    expect(
      reducer(ticketInitialState, {
        type: types.SEND_TICKET_INFO,
      }),
    ).toEqual({ ...ticketInitialState, isFetching: true });
  });

  it('should handle tickets::SEND_TICKET_INFO_SUCCESS', () => {
    expect(
      reducer(ticketInitialState, {
        type: types.SEND_TICKET_INFO_SUCCESS,
      }),
    ).toEqual({ ...ticketInitialState, isFetching: false });
  });

  it('should handle tickets::SEND_TICKET_INFO_FAILURE', () => {
    expect(
      reducer(ticketInitialState, {
        type: types.SEND_TICKET_INFO_FAILURE,
        error: errorMock,
      }),
    ).toEqual({ ...ticketInitialState, isFetching: false, error: errorMock });
  });

  it('should handle tickets::SELECT_CELL', () => {
    const number = 1;
    const field = 'firstCells';
    const selected = true;
    expect(
      reducer(ticketInitialState, {
        type: types.SELECT_CELL,
        number,
        field,
        selected,
      }),
    ).toEqual({
      ...ticketInitialState,
      ticket: {
        ...ticketInitialState.ticket,
        [field]: ticketInitialState.ticket[field].map((cell) => {
          if (cell.number === number) return { ...cell, selected };
          return cell;
        }),
      },
    });
  });

  it('should handle tickets::GENERATE_WIN_COMBINATIONS', () => {
    // Not mock global.Math.random cause we need unique random integers in array
    expect(
      reducer(ticketInitialState, {
        type: types.GENERATE_WIN_COMBINATIONS,
      }).winCombination.firstCells.length,
    ).toEqual(8);

    expect(
      reducer(ticketInitialState, {
        type: types.GENERATE_WIN_COMBINATIONS,
      }).winCombination.secondCells.length,
    ).toEqual(1);
  });
});
