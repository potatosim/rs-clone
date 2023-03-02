import { ITheme } from 'types/Theme';

export const sortByThemeName = <T extends ITheme>(array?: Array<T>): Array<T> => {
  if (!array) {
    return [];
  }
  return array.sort((a, b) => a.name.localeCompare(b.name));
};
