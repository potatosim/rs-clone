export const sortByOrder = <T extends { order: number }>(array: Array<T>): Array<T> =>
  array.sort((a, b) => a.order - b.order);
