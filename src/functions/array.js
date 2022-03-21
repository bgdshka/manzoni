export function getInitialCellsArray(length) {
  return [...Array(length).keys()].map((x) => ({ number: x + 1, selected: false }));
}

export function uniqueRandomIntArrayInRange(min, max, n = 1) {
  const nums = new Set();
  while (nums.size !== n) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...nums];
}
