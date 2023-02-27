export interface ITheme {
  creator: string;
  id: string;
  name: string;
  primary: string;
  secondary: string;
  isPublic: boolean;
  holders: string[];
  mode: 'light' | 'dark';
}
