import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import Header from '../../components/Header/Header'
import { AppContext } from '../../contexts/app.context'
import { useContext } from 'react'
import { Box } from '@mui/material'
import SideNav from '../../components/SideNav'
import MusicPlayer from '../../components/MusicPlayer'
function HomeLayoutInner({ children }) {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <div
      style={{
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 80px)'
        }}
      >
        <SideNav />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 80px)',
            overflowY: 'auto'
          }}
        >
          {!isAuthenticated ? <HomeHeader /> : <Header />}
          {children}
          <Outlet />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80px',
          backgroundColor: 'black',
          color: 'white'
        }}
      >
        <MusicPlayer />
      </Box>
    </div>
  )
}
const HomeLayout = memo(HomeLayoutInner)
export default HomeLayout
