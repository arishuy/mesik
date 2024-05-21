import { memo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import Header from '../../components/Header/Header'
import { AppContext } from '../../contexts/app.context'
import { useContext } from 'react'
import { Box } from '@mui/material'
import SideNav from '../../components/SideNav'
import MusicPlayer from '../../components/MusicPlayer'
import ChatBot from '../../components/ChatBot'
import Snackbar from '../../common/components/SnackBar'
function HomeLayoutInner({ children }) {
  const param = useLocation()
  const { isAuthenticated } = useContext(AppContext)
  return (
    <div
      style={{
        overflow: 'hidden'
      }}
    >
      <Snackbar />
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 80px)'
        }}
      >
        <SideNav param={param.pathname} />
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
          <Box
            sx={{
              width: '100%',
              height: 'calc(93vh - 80px)',
              overflowY: 'auto'
            }}
          >
            {children}
            <Outlet />
          </Box>
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
      <ChatBot />
    </div>
  )
}
const HomeLayout = memo(HomeLayoutInner)
export default HomeLayout
