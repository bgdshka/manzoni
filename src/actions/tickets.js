import * as types from '../constants/actionTypes';

export function selectCell({ number, field, selected }) {
  return {
    type: types.SELECT_CELL,
    number,
    field,
    selected,
  };
}

export function sendTicketInfo() {
  return {
    type: types.SEND_TICKET_INFO,
  };
}
