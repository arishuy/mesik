import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideNav from '../../components/AdminSideNav/AdminSideNav'
import { Box } from '@mui/material'

function AdminLayoutInner({ children }) {
  return (
    <div>
      <Box sx={{
        display: 'flex',
        height: '93vh',
      }} >
      <AdminSideNav />
      {children}
      <Outlet />
      </Box>
    </div>
  )
}

const AdminLayout = memo(AdminLayoutInner)

export default AdminLayout