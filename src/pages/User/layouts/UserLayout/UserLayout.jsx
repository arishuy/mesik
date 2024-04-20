import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav/UserSideNav'
import { Box } from '@mui/material'

function UserLayoutInner({ children }) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          height: '93vh'
        }}
      >
        <UserSideNav />
        {children}
        <Outlet />
      </Box>
    </div>
  )
}

const UserLayout = memo(UserLayoutInner)

export default UserLayout
