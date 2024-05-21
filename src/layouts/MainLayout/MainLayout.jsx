import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Snackbar from '../../common/components/SnackBar'

function MainLayoutInner({ children }) {
  return (
    <div>
      <Snackbar />
      <Header />
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
