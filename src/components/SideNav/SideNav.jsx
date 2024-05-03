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
import React, { useContext } from 'react'
import logo from '../../assets/images/logo.png'
import { AppContext } from '../../contexts/app.context'
export default function AdminSideNav() {
  const { isAuthenticated } = useContext(AppContext)

  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const styleLink = {
    textDecoration: 'none',
    color: 'black'
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
          <MenuItem icon={<SsidChartIcon />} component={<Link to={path.adminDashBoard} style={styleLink} />}></MenuItem>
          <MenuItem icon={<AccountBoxIcon />} component={<Link to={path.adminProfile} style={styleLink} />}></MenuItem>
          <MenuItem
            icon={<ManageAccountsIcon />}
            component={<Link to={path.adminListUser} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<ManageSearchIcon />}
            component={<Link to={path.adminListMajor} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<VerifiedUserIcon />}
            component={<Link to={path.adminVerifyExpert} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<FindInPageIcon />}
            component={<Link to={path.adminListDocument} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<AccountBalanceWalletIcon />}
            component={<Link to={path.adminListTransaction} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<AccountBalanceWalletIcon />}
            component={<Link to={path.adminListReport} style={styleLink} />}
          ></MenuItem>
          <MenuItem icon={<ReportIcon />} component={<Link to={path.adminListReport} style={styleLink} />}></MenuItem>
          <MenuItem
            icon={<AccountBalanceWalletIcon />}
            component={<Link to={path.adminWithdraw} style={styleLink} />}
          ></MenuItem>
        </Menu>
      ) : (
        // logo
        <>
          <img src={logo} alt='logo' style={{ width: '100%', padding: '10px' }} />
          <Menu>
            <MenuItem icon={<HomeIcon />} component={<Link to={path.home} style={styleLink} />}>
              Trang chủ
            </MenuItem>
            {isAuthenticated && (
              <>
                <MenuItem icon={<QueueMusicIcon />} component={<Link to={path.myPlaylist} style={styleLink} />}>
                  Playlist
                </MenuItem>
                <MenuItem icon={<AlbumIcon />} component={<Link to={path.myAlbum} style={styleLink} />}>
                  Album
                </MenuItem>
              </>
            )}
            <MenuItem icon={<AutoGraphIcon />} component={<Link to={path.chart} style={styleLink} />}>
              BXH
            </MenuItem>
          </Menu>
        </>
      )}
    </Sidebar>
  )
}
