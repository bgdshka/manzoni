export function getInitialCellsArray(length) {
  return [...Array(length).keys()].map((x) => ({ number: x + 1, selected: false }));
}
