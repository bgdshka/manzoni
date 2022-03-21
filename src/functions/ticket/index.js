/* eslint-disable implicit-arrow-linebreak */
export function checkIfTicketWon({ selectedFirstCells, selectedSecondCells }, winCombination) {
  const firstIntersection = selectedFirstCells.filter((number) =>
    winCombination.firstCells.includes(number),
  );
  const secondIntersection = selectedSecondCells.filter((number) =>
    winCombination.secondCells.includes(number),
  );

  return (
    firstIntersection.length >= 4 ||
    (firstIntersection.length >= 3 && secondIntersection.length >= 1)
  );
}
