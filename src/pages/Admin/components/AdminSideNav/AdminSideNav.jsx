import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import HandymanIcon from '@mui/icons-material/Handyman'
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined'
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined'
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ReportIcon from '@mui/icons-material/Report'
import React from 'react'
export default function AdminSideNav() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
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
    <Sidebar style={isMobile ? styleMobile : { height: '100%' }} collapsed={isCollapsed}>
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
        <Menu>
          <MenuItem icon={<AccountBoxIcon />} component={<Link to={path.adminProfile} style={styleLink} />}>
            Profile
          </MenuItem>
          <SubMenu label='Management' style={styleLink} icon={<HandymanIcon />}>
            <MenuItem
              icon={<ManageAccountsOutlinedIcon />}
              component={<Link to={path.adminListUser} style={styleLink} />}
            >
              User
            </MenuItem>
            <MenuItem icon={<AudioFileOutlinedIcon />} component={<Link to={path.adminMusic} style={styleLink} />}>
              Song
            </MenuItem>
            <MenuItem icon={<LyricsOutlinedIcon />} component={<Link to={path.adminGenre} style={styleLink} />}>
              Genre
            </MenuItem>
            <MenuItem icon={<VerifiedUserOutlinedIcon />} component={<Link to={path.adminRequest} style={styleLink} />}>
              Request
            </MenuItem>
            {/* <MenuItem
              icon={<SupervisedUserCircleOutlinedIcon />}
              component={<Link to={path.adminListDocument} style={styleLink} />}
            >
              Artist
            </MenuItem> */}

            <MenuItem icon={<AlbumOutlinedIcon />} component={<Link to={path.adminAlbum} style={styleLink} />}>
              Album
            </MenuItem>
            <MenuItem icon={<ArtTrackOutlinedIcon />} component={<Link to={path.adminPlaylist} style={styleLink} />}>
              Playlist
            </MenuItem>
            <MenuItem icon={<ArtTrackOutlinedIcon />} component={<Link to={path.adminRegion} style={styleLink} />}>
              Region
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              setIsCollapsed(!isCollapsed)
            }}
            style={styleLink}
          >
            {t('collapse')}
          </MenuItem>
        </Menu>
      )}
    </Sidebar>
  )
}
