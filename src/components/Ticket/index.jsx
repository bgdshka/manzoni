import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateWinCombinations, selectCell, sendTicketInfo } from '../../actions/tickets';
import { MAX_FIRST_CELLS_SELECTED, MAX_SECOND_CELLS_SELECTED } from '../../constants';
import Cell from '../Cell';
import Loader from '../Loader';
import magicWand from './assets/magic-wand.svg';
import './Ticket.scss';

export default function Ticket({ ticketNumber }) {
  const dispatch = useDispatch();
  const {
    isFetching,
    ticket: { firstCells, secondCells },
  } = useSelector((state) => state.tickets);

  const handleCellClick = useCallback(
    ({ number, field, selected }) => dispatch(selectCell({ number, field, selected })),
    [dispatch],
  );

  const handleWandClick = () => dispatch(generateWinCombinations());

  const handleWandKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleWandClick();
    }
  };

  const handleShowResult = () => dispatch(sendTicketInfo());

  const firstCellsMaxSelectedReached =
    firstCells.filter((cell) => cell.selected).length === MAX_FIRST_CELLS_SELECTED;

  const secondCellsMaxSelectedReached =
    secondCells.filter((cell) => cell.selected).length === MAX_SECOND_CELLS_SELECTED;

  const mappedFirstCells = firstCells.map(({ number, selected }) => (
    <Cell
      key={number}
      field="firstCells"
      number={number}
      selected={selected}
      maxSelected={firstCellsMaxSelectedReached}
      onSelect={handleCellClick}
    />
  ));

  const mappedSecondCells = secondCells.map(({ number, selected }) => (
    <Cell
      key={number}
      field="secondCells"
      number={number}
      selected={selected}
      maxSelected={secondCellsMaxSelectedReached}
      onSelect={handleCellClick}
    />
  ));

  return (
    <section className="Ticket">
      <div className="Ticket__header">
        <div className="Ticket__title">
          Билет&nbsp;
          {ticketNumber}
        </div>
        <div
          className="Ticket__wand"
          role="button"
          tabIndex={0}
          onClick={handleWandClick}
          onKeyDown={handleWandKeyPress}
        >
          <img alt="magic_wand" src={magicWand} />
        </div>
      </div>
      <div className="Ticket__firstFieldTitle">
        <span className="highlight">Поле 1 </span>
        Отметьте 8 чисел.
      </div>
      <div className="Ticket__cellContainer">{mappedFirstCells}</div>

      <div className="Ticket__secondFieldTitle">
        <span className="highlight">Поле 2 </span>
        Отметьте 1 число.
      </div>
      <div className="Ticket__cellContainer">{mappedSecondCells}</div>

      <button type="button" className="Ticket__button" onClick={handleShowResult}>
        {isFetching && <Loader />}
        Показать результат
      </button>
    </section>
  );
}
