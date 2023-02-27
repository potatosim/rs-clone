import { DefaultThemes } from 'enum/DefaultThemes';
import { ITheme } from 'types/Theme';

export const isDefaultTheme = (themeId: string) =>
  themeId === DefaultThemes.DefaultDark || themeId === DefaultThemes.DefaultLight;

export const defaultDark: ITheme = {
  creator: '',
  holders: [],
  id: DefaultThemes.DefaultDark,
  isPublic: false,
  name: 'Default Dark',
  primary: '#202026',
  secondary: '#FECB00',
  mode: 'dark',
};

export const defaultLight: ITheme = {
  creator: '',
  holders: [],
  id: DefaultThemes.DefaultLight,
  isPublic: false,
  mode: 'light',
  name: 'Default Light',
  primary: '#202026',
  secondary: '#FECB00',
};
