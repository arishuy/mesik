import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import WorkIcon from '@mui/icons-material/Work'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

export default function UserSideNav() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const { collapseSidebar } = useProSidebar()
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
    <Sidebar style={isMobile ? styleMobile : { height: '100%' }}>
      {isMobile ? (
        <Menu
          rootStyles={menuMobile}
          menuItemStyles={{
            padding: 0
          }}
        >
          <MenuItem icon={<HomeRoundedIcon />} component={<Link to={path.dashboard} style={styleLink} />}></MenuItem>
          <MenuItem icon={<ManageAccountsIcon />} component={<Link to={path.profile} style={styleLink} />}></MenuItem>
          <MenuItem
            icon={<CalendarMonthRoundedIcon />}
            component={<Link to={path.historyTransaction} style={styleLink} />}
          ></MenuItem>
          <MenuItem icon={<WorkIcon />} component={<Link to={path.jobRequest} style={styleLink} />}></MenuItem>
          <MenuItem icon={<SyncLockIcon />} component={<Link to={path.changePassword} style={styleLink} />}></MenuItem>
        </Menu>
      ) : (
        <Menu>
          <MenuItem icon={<HomeRoundedIcon />} component={<Link to={path.dashboard} style={styleLink} />}>
            {t('dashboard')}
          </MenuItem>
          <MenuItem icon={<ManageAccountsIcon />} component={<Link to={path.profile} style={styleLink} />}>
            {t('profile')}
          </MenuItem>
          <MenuItem
            icon={<CalendarMonthRoundedIcon />}
            component={<Link to={path.historyTransaction} style={styleLink} />}
          >
            {t('historyTransaction')}
          </MenuItem>
          <MenuItem icon={<WorkIcon />} component={<Link to={path.jobRequest} style={styleLink} />}>
            {t('jobRequest')}
          </MenuItem>
          <MenuItem icon={<SyncLockIcon />} component={<Link to={path.changePassword} style={styleLink} />}>
            {t('changePassword')}
          </MenuItem>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar()
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
