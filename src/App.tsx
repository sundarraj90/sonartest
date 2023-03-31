import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomSnackBar } from 'components/shared';
import { RoutesConfig as Routes } from './routes';
import { ColorModeContext, useMode } from './theme';

const App = (): JSX.Element => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes />
          <CustomSnackBar />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
