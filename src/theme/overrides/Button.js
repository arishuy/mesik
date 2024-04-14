export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        color: {
          error: {
            color: 'blue',
            '&:hover': {
              backgroundColor: theme.palette.error.lighter
            }
          }
        },
        textError: {
          color: theme.palette.error.dark,
          backgroundColor: theme.palette.error.lighter,
          '&:hover': {
            backgroundColor: theme.palette.error.light
          }
        },
        textSuccess: {
          color: theme.palette.success.dark,
          backgroundColor: theme.palette.success.lighter,
          '&:hover': {
            backgroundColor: theme.palette.success.light
          }
        },
        textPrimary: {
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.lighter,
          '&:hover': {
            backgroundColor: theme.palette.primary.light
          }
        },
        textSecondary: {
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: '#333333'
          }
        }
      }
    }
  }
}
