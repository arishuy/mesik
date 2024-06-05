import path from '../../../../constants/path'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import useResponsive from '../../../../hooks/useResponsive'
import HandymanIcon from '@mui/icons-material/Handyman'
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined'
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined'
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined'
import ReportIcon from '@mui/icons-material/Report'
import React from 'react'
export default function AdminSideNav() {
  const param = useLocation()
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
  const styleActive = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#2065D1'
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
          <MenuItem
            icon={<AccountBoxIcon />}
            component={
              <Link to={path.adminProfile} style={param.pathname === path.adminProfile ? styleActive : styleLink} />
            }
          ></MenuItem>
          <SubMenu label='Management' style={styleLink} icon={<HandymanIcon />}>
            <MenuItem
              icon={<ManageAccountsOutlinedIcon />}
              component={
                <Link to={path.adminListUser} style={param.pathname === path.adminListUser ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<AudioFileOutlinedIcon />}
              component={
                <Link to={path.adminMusic} style={param.pathname === path.adminMusic ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<LyricsOutlinedIcon />}
              component={
                <Link to={path.adminGenre} style={param.pathname === path.adminGenre ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<PublicOutlinedIcon />}
              component={
                <Link to={path.adminRegion} style={param.pathname === path.adminRegion ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<VerifiedUserOutlinedIcon />}
              component={
                <Link to={path.adminRequest} style={param.pathname === path.adminRequest ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<AlbumOutlinedIcon />}
              component={
                <Link to={path.adminAlbum} style={param.pathname === path.adminAlbum ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<ArtTrackOutlinedIcon />}
              component={
                <Link to={path.adminPlaylist} style={param.pathname === path.adminPlaylist ? styleActive : styleLink} />
              }
            ></MenuItem>
            <MenuItem
              icon={<ReportProblemOutlinedIcon />}
              component={
                <Link
                  to={path.adminListReport}
                  style={param.pathname === path.adminListReport ? styleActive : styleLink}
                />
              }
            ></MenuItem>
            <MenuItem
              icon={<WorkspacePremiumOutlinedIcon />}
              component={
                <Link
                  to={path.adminPremiumPackage}
                  style={param.pathname === path.adminPremiumPackage ? styleActive : styleLink}
                />
              }
            ></MenuItem>
            <MenuItem
              icon={<ReceiptLongOutlinedIcon />}
              component={
                <Link
                  to={path.adminListTransaction}
                  style={param.pathname === path.adminListTransaction ? styleActive : styleLink}
                />
              }
            ></MenuItem>
            <MenuItem
              icon={<EventSeatOutlinedIcon />}
              component={
                <Link to={path.adminSection} style={param.pathname === path.adminSection ? styleActive : styleLink} />
              }
            ></MenuItem>
          </SubMenu>
        </Menu>
      ) : (
        <Menu>
          <MenuItem icon={<SsidChartIcon />} component={<Link to={path.adminDashBoard} style={styleLink} />}>
            {t('statistics')}
          </MenuItem>
          <MenuItem
            icon={<AccountBoxIcon />}
            component={
              <Link to={path.adminProfile} style={param.pathname === path.adminProfile ? styleActive : styleLink} />
            }
          >
            Profile
          </MenuItem>
          <SubMenu label='Management' style={styleLink} icon={<HandymanIcon />}>
            <MenuItem
              icon={<ManageAccountsOutlinedIcon />}
              component={
                <Link to={path.adminListUser} style={param.pathname === path.adminListUser ? styleActive : styleLink} />
              }
            >
              User
            </MenuItem>
            <MenuItem
              icon={<AudioFileOutlinedIcon />}
              component={
                <Link to={path.adminMusic} style={param.pathname === path.adminMusic ? styleActive : styleLink} />
              }
            >
              Song
            </MenuItem>
            <MenuItem
              icon={<LyricsOutlinedIcon />}
              component={
                <Link to={path.adminGenre} style={param.pathname === path.adminGenre ? styleActive : styleLink} />
              }
            >
              Genre
            </MenuItem>
            <MenuItem
              icon={<PublicOutlinedIcon />}
              component={
                <Link to={path.adminRegion} style={param.pathname === path.adminRegion ? styleActive : styleLink} />
              }
            >
              Region
            </MenuItem>
            <MenuItem
              icon={<VerifiedUserOutlinedIcon />}
              component={
                <Link to={path.adminRequest} style={param.pathname === path.adminRequest ? styleActive : styleLink} />
              }
            >
              Request
            </MenuItem>
            {/* <MenuItem
              icon={<SupervisedUserCircleOutlinedIcon />}
              component={<Link to={path.adminListDocument} style={styleLink} />}
            >
              Artist
            </MenuItem> */}

            <MenuItem
              icon={<AlbumOutlinedIcon />}
              component={
                <Link to={path.adminAlbum} style={param.pathname === path.adminAlbum ? styleActive : styleLink} />
              }
            >
              Album
            </MenuItem>
            <MenuItem
              icon={<ArtTrackOutlinedIcon />}
              component={
                <Link to={path.adminPlaylist} style={param.pathname === path.adminPlaylist ? styleActive : styleLink} />
              }
            >
              Playlist
            </MenuItem>
            <MenuItem
              icon={<ReportProblemOutlinedIcon />}
              component={
                <Link
                  to={path.adminListReport}
                  style={param.pathname === path.adminListReport ? styleActive : styleLink}
                />
              }
            >
              Report
            </MenuItem>
            <MenuItem
              icon={<WorkspacePremiumOutlinedIcon />}
              component={
                <Link
                  to={path.adminPremiumPackage}
                  style={param.pathname === path.adminPremiumPackage ? styleActive : styleLink}
                />
              }
            >
              Premium Package
            </MenuItem>
            <MenuItem
              icon={<ReceiptLongOutlinedIcon />}
              component={
                <Link
                  to={path.adminListTransaction}
                  style={param.pathname === path.adminListTransaction ? styleActive : styleLink}
                />
              }
            >
              History Transaction
            </MenuItem>
            <MenuItem
              icon={<EventSeatOutlinedIcon />}
              component={
                <Link to={path.adminSection} style={param.pathname === path.adminSection ? styleActive : styleLink} />
              }
            >
              Section
            </MenuItem>
          </SubMenu>
        </Menu>
      )}
    </Sidebar>
  )
}
