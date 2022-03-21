import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCell } from '../../actions/tickets';
import { MAX_FIRST_CELLS_SELECTED, MAX_SECOND_CELLS_SELECTED } from '../../constants';
import Cell from '../Cell';
import magicWand from './assets/magic-wand.svg';
import './Ticket.scss';

export default function Ticket() {
  const dispatch = useDispatch();
  const { firstCells, secondCells } = useSelector((state) => state.tickets.ticket);

  const handleCellClick = useCallback(
    ({ number, area, selected }) => dispatch(selectCell({ number, area, selected })),
    [dispatch],
  );

  const firstCellsMaxSelectedReached =
    firstCells.filter((cell) => cell.selected).length === MAX_FIRST_CELLS_SELECTED;

  const secondCellsMaxSelectedReached =
    secondCells.filter((cell) => cell.selected).length === MAX_SECOND_CELLS_SELECTED;

  const mappedFirstCells = firstCells.map(({ number, selected }) => (
    <Cell
      key={number}
      area="firstCells"
      number={number}
      selected={selected}
      maxSelected={firstCellsMaxSelectedReached}
      onSelect={handleCellClick}
    />
  ));

  const mappedSecondCells = secondCells.map(({ number, selected }) => (
    <Cell
      key={number}
      area="secondCells"
      number={number}
      selected={selected}
      maxSelected={secondCellsMaxSelectedReached}
      onSelect={handleCellClick}
    />
  ));

  return (
    <section className="Ticket">
      <div className="Ticket__header">
        <div className="Ticket__title">Билет 1</div>
        <div className="Ticket__wand">
          <img alt="magic_wand" src={magicWand} />
        </div>
      </div>
      <div className="Ticket__firstAreaTitle">
        <span className="highlight">Поле 1 </span>
        Отметьте 8 чисел.
      </div>
      <div className="Ticket__cellContainer">{mappedFirstCells}</div>

      <div className="Ticket__secondAreaTitle">
        <span className="highlight">Поле 2 </span>
        Отметьте 1 число.
      </div>
      <div className="Ticket__cellContainer">{mappedSecondCells}</div>

      <button type="button" className="Ticket__button">
        Показать результат
      </button>
    </section>
  );
}
