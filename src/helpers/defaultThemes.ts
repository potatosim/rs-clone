import { DefaultThemes } from 'enum/DefaultThemes';
import { ITheme } from 'types/Theme';

export const isDefaultTheme = (themeId: string) =>
  themeId === DefaultThemes.DefaultLight || themeId === DefaultThemes.DefaultLight;

export const defaultDark: ITheme = {
  creator: '',
  holders: [],
  id: DefaultThemes.DefaultDark,
  isPublic: false,
  name: 'Default Dark',
  primary: '#fefe00',
  secondary: '#202026',
};

export const defaultLight: ITheme = {
  creator: '',
  holders: [],
  id: DefaultThemes.DefaultLight,
  isPublic: false,
  name: 'Default Light',
  primary: '#202026',
  secondary: '#fefe00',
};
