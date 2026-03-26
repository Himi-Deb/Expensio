import { createContext, useContext } from 'react';
import { tokens } from './tokens';

export const ThemeContext = createContext(tokens);

export const useTheme = () => useContext(ThemeContext);

export const theme = tokens;
