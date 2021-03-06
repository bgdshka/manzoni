import {
  SEND_TICKET_INFO,
  SEND_TICKET_INFO_SUCCESS,
  SEND_TICKET_INFO_FAILURE,
  SELECT_CELL,
  GENERATE_WIN_COMBINATIONS,
} from '../constants/actionTypes';
import { getInitialCellsArray, uniqueRandomIntArrayInRange } from '../functions/array';

export const ticketInitialState = {
  ticket: { firstCells: getInitialCellsArray(19), secondCells: getInitialCellsArray(2) },
  winCombination: {
    firstCells: uniqueRandomIntArrayInRange(1, 19, 8),
    secondCells: uniqueRandomIntArrayInRange(1, 2, 1),
  },
  isSending: false,
  errors: null,
};

export default function tickets(state = ticketInitialState, action = {}) {
  switch (action.type) {
    case SEND_TICKET_INFO:
      return {
        ...state,
        isFetching: true,
      };

    // You can add data for the new state if needed
    case SEND_TICKET_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case SEND_TICKET_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case SELECT_CELL: {
      const newTicketField = state.ticket[action.field].map((cell) => {
        if (cell.number === action.number) return { ...cell, selected: action.selected };
        return cell;
      });

      return {
        ...state,
        ticket: { ...state.ticket, [action.field]: newTicketField },
      };
    }

    case GENERATE_WIN_COMBINATIONS:
      return {
        ...state,
        winCombination: {
          firstCells: uniqueRandomIntArrayInRange(1, 19, 8),
          secondCells: uniqueRandomIntArrayInRange(1, 2, 1),
        },
      };

    default:
      return state;
  }
}
