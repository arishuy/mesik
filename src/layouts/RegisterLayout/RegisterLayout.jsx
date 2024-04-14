import { memo } from 'react'
import { Outlet } from 'react-router-dom'

function RegisterLayoutInner({ children }) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
