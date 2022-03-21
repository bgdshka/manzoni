import classNames from 'classnames';
import React from 'react';
import './Cell.scss';

export default function Cell({ number, area, selected, onSelect, maxSelected }) {
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && (!maxSelected || selected)) {
      onSelect({ number, area, selected: !selected });
    }
  };

  const handleOnClick = () => {
    if (!maxSelected || selected) {
      onSelect({ number, area, selected: !selected });
    }
  };

  return (
    <div
      className={classNames('Cell', {
        'Cell--disabled': !selected && maxSelected,
        'Cell--active': selected,
      })}
      role="button"
      tabIndex={number}
      onClick={handleOnClick}
      onKeyDown={handleEnterKeyPress}
    >
      {number}
    </div>
  );
}
