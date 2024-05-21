import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Snackbar from '../../common/components/SnackBar'

function RegisterLayoutInner({ children }) {
  return (
    <div>
      <Snackbar />
      {children}
      <Outlet />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
