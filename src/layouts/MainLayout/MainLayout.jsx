import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
function MainLayoutInner({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
