import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/Header'
import Snackbar from '../../common/components/SnackBar'

function MainLayoutInner({ children }) {
  return (
    <div>
      <Snackbar />
      <AdminHeader />
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
