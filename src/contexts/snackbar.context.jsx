// hooks
import { useState, useContext } from 'react'

// context
import { createContext } from 'react'

//----------------------------------------------------------------

let snack = { open: false, type: 'success', message: '' }

const SnackDefaultValue = {
  snack: snack,
  setSnack: (snack) => {}
}
export const SnackbarContext = createContext(SnackDefaultValue)

//----------------------------------------------------------------

export const SnackbarContextProvider = ({ children }) => {
  const [snack, setSnack] = useState(SnackDefaultValue.snack)
  return <SnackbarContext.Provider value={{ snack, setSnack }}>{children}</SnackbarContext.Provider>
}

export default function useSnackbar() {
  return useContext(SnackbarContext)
}
