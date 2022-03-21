import {
  SEND_TICKET_INFO,
  SEND_TICKET_INFO_SUCCESS,
  SEND_TICKET_INFO_FAILURE,
  SELECT_CELL,
} from '../constants/actionTypes';
import { getInitialCellsArray } from '../functions/array';

export default function tickets(
  state = {
    ticket: { firstCells: getInitialCellsArray(19), secondCells: getInitialCellsArray(2) },
    isSending: false,
    errors: null,
  },
  action = {},
) {
  switch (action.type) {
    case SEND_TICKET_INFO:
      return {
        ...state,
        isFetching: true,
      };

    case SEND_TICKET_INFO_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        isFetching: false,
      };

    case SEND_TICKET_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case SELECT_CELL: {
      const newTicketArea = state.ticket[action.area].map((cell) => {
        if (cell.number === action.number) return { ...cell, selected: action.selected };
        return cell;
      });

      return {
        ...state,
        ticket: { ...state.ticket, [action.area]: newTicketArea },
      };
    }

    default:
      return state;
  }
}
