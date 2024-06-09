import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../hooks/useResponsive'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import AlbumIcon from '@mui/icons-material/Album'
import ReportIcon from '@mui/icons-material/Report'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import HomeIcon from '@mui/icons-material/Home'
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded'
import React, { useContext } from 'react'
import logo from '../../assets/images/logo.png'
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded'
import { AppContext } from '../../contexts/app.context'
import dayjs from 'dayjs'
import { useTheme } from '@mui/material/styles'
import { Button, Card, Typography } from '@mui/material'
export default function AdminSideNav({ param }) {
  const theme = useTheme()
  const { isAuthenticated, role, profile } = useContext(AppContext)
  const isMobile = useResponsive('down', 'sm')
  const isPremium = profile?.premiumEndDate && dayjs(profile.premiumEndDate) > dayjs()
  const { t } = useTranslation()
  const styleLink = {
    textDecoration: 'none',
    color: 'black'
  }

  const styleActive = {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.lighter,
    borderRadius: '10px',
    margin: '5px'
  }

  const styleMobile = {
    maxWidth: '100vw',
    width: '100vw',
    position: 'fixed',
    zIndex: 1000,
    bottom: 0,
    left: 0,
    backgroundColor: 'white'
  }
  const menuMobile = {
    overflow: 'auto',
    '& ul': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%'
    }
  }
  return (
    <Sidebar style={isMobile ? styleMobile : { height: '100%' }} collapsed={false}>
      {isMobile ? (
        <Menu rootStyles={menuMobile}>
          <MenuItem
            icon={<HomeIcon />}
            component={<Link to={path.home} style={param === path.home ? styleActive : styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<FiberNewRoundedIcon />}
            component={<Link to={path.newRelease} style={param === path.newRelease ? styleActive : styleLink} />}
          ></MenuItem>
          {isAuthenticated && (
            <>
              <MenuItem
                icon={<LibraryMusicRoundedIcon />}
                component={<Link to={path.myLibrary} style={param === path.myLibrary ? styleActive : styleLink} />}
              ></MenuItem>
              <MenuItem
                icon={<QueueMusicIcon />}
                component={<Link to={path.myPlaylist} style={param === path.myPlaylist ? styleActive : styleLink} />}
              ></MenuItem>
              {role === 'ARTIST' && (
                <MenuItem
                  icon={<AlbumIcon />}
                  component={<Link to={path.myAlbum} style={param === path.myAlbum ? styleActive : styleLink} />}
                ></MenuItem>
              )}
            </>
          )}
          <MenuItem
            icon={<AutoGraphIcon />}
            component={<Link to={path.chart} style={param === path.chart ? styleActive : styleLink} />}
          ></MenuItem>
        </Menu>
      ) : (
        // logo
        <>
          <img src={logo} alt='logo' style={{ width: '100%', padding: '10px' }} />
          <Menu>
            <MenuItem
              icon={<HomeIcon />}
              component={<Link to={path.home} style={param === path.home ? styleActive : styleLink} />}
            >
              {t('dashboard')}
            </MenuItem>
            <MenuItem
              icon={<FiberNewRoundedIcon />}
              component={<Link to={path.newRelease} style={param === path.newRelease ? styleActive : styleLink} />}
            >
              {t('justReleased')}
            </MenuItem>
            {isAuthenticated && (
              <>
                <MenuItem
                  icon={<LibraryMusicRoundedIcon />}
                  component={<Link to={path.myLibrary} style={param === path.myLibrary ? styleActive : styleLink} />}
                >
                  {t('librabry')}
                </MenuItem>
                <MenuItem
                  icon={<QueueMusicIcon />}
                  component={<Link to={path.myPlaylist} style={param === path.myPlaylist ? styleActive : styleLink} />}
                >
                  Playlist
                </MenuItem>
                {role === 'ARTIST' && (
                  <MenuItem
                    icon={<AlbumIcon />}
                    component={<Link to={path.myAlbum} style={param === path.myAlbum ? styleActive : styleLink} />}
                  >
                    Album
                  </MenuItem>
                )}
              </>
            )}
            <MenuItem
              icon={<AutoGraphIcon />}
              component={<Link to={path.chart} style={param === path.chart ? styleActive : styleLink} />}
            >
              MesikChart
            </MenuItem>
          </Menu>
          {!isPremium && isAuthenticated && (
            <Card
              sx={{
                p: 1,
                m: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                background: ' linear-gradient(30deg, #0400ff, #4ce3f7)'
              }}
            >
              <Typography
                variant='body1'
                component='h6'
                fontWeight='bold'
                fontSize='14px'
                textAlign='center'
                color='white'
              >
                {t('Nghe nhạc không quảng cáo cùng Mesik Premium')}
              </Typography>
              <Button variant='contained' color='warning' sx={{ my: 1, borderRadius: '20px' }}>
                <Link to={path.buyPremium} style={{ textDecoration: 'none', color: 'black' }}>
                  {t('Nâng Cấp Premium')}
                </Link>
              </Button>
            </Card>
          )}
        </>
      )}
    </Sidebar>
  )
}
