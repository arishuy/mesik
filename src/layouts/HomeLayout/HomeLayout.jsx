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
    <div style={
      {
        overflow: 'hidden',
      }
    }>
      <Box sx={{
        display: 'flex',
        height: '90vh',
      }} >
        <SideNav />
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          overflowY: 'auto',
        }}>
      {!isAuthenticated ? <HomeHeader /> : <Header />}
      {children}
      <Outlet />
      </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: 'black',
        color: 'white',
      }}>
        <MusicPlayer />
        </Box>
    </div>
  )
}
const HomeLayout = memo(HomeLayoutInner)
export default HomeLayout
