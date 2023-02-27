export const sortByOrder = <T extends { order: number }>(array?: Array<T>): Array<T> => {
  if (!array) {
    return [];
  }
  return array.sort((a, b) => a.order - b.order);
};
