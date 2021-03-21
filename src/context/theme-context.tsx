import * as React from 'react';
import type { PaletteType } from '@material-ui/core';

type State = PaletteType | string;
type Action = { type: 'CHANGE_THEME'; payload: State };
type Dispatch = (action: Action) => void;
type ThemeProviderProps = { children: React.ReactNode };

const ThemeStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

function themeReducer(state: State, action: Action) {
  switch (action.type) {
    case 'CHANGE_THEME': {
      return action.payload;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = React.useReducer(themeReducer, 'light');

  const value = { state, dispatch };
  return <ThemeStateContext.Provider value={value}>{children}</ThemeStateContext.Provider>;
}

function useThemeContext() {
  const context = React.useContext(ThemeStateContext);
  if (context == undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useThemeContext };
