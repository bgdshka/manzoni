import React from 'react';
import { getInitialCellsArray } from '../../functions/array';
import Cell from '../Cell';
import magicWand from './assets/magic-wand.svg';
import './Ticket.scss';

const firstCellsData = getInitialCellsArray(19);
const secondCellsData = getInitialCellsArray(2);

export default function Ticket() {
  const firstCells = firstCellsData.map((cell) => <Cell number={cell.number} />);
  const secondCells = secondCellsData.map((cell) => <Cell number={cell.number} />);


  return (
    <div className="Ticket">
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
      <div className="Ticket__cellContainer">{firstCells}</div>

      <div className="Ticket__secondAreaTitle">
        <span className="highlight">Поле 2 </span>
        Отметьте 1 число.
      </div>
      <div className="Ticket__cellContainer">{secondCells}</div>

      <button type="button" className="Ticket__button">
        Показать результат
      </button>
    </div>
  );
}
