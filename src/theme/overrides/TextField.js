export default function TextField(theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.grey[500_32]
            },
            '&:hover fieldset': {
              borderColor: theme.palette.grey[500_48]
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.common.black
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.common.black
            }
          }
        }
      }
    }
  }
}
