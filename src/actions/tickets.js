import * as types from '../constants/actionTypes';

export function selectCell({ number, area, selected }) {
  return {
    type: types.SELECT_CELL,
    number,
    area,
    selected,
  };
}
