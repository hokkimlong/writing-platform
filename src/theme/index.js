import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#F2789F',
      light: '#F999B7',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation0: {
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
        },
        elevation1: {
          boxShadow:
            '1px 1px 18px 1px rgb(0 0 0 / 10%), -1px 0px 4px 0px rgb(0 0 0 / 5%), 0px 0px 0px 0px rgb(0 0 0 / 10%)',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '& body': {
          background: '#fce2db87',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
