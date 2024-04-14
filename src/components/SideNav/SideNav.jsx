import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../hooks/useResponsive'
import HandymanIcon from '@mui/icons-material/Handyman'
import ReportIcon from '@mui/icons-material/Report'
import React from 'react'
import logo from '../../assets/images/404.svg'
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
        // logo
        <>
        <img src={logo} alt="logo" style={{ width: '100%', padding: '10px' }} />
        <Menu>
          <MenuItem icon={<SsidChartIcon />} component={<Link to={path.adminDashBoard} style={styleLink} />}>
            Trang chủ
          </MenuItem>
          <MenuItem icon={<AccountBoxIcon />} component={<Link to={path.adminProfile} style={styleLink} />}>
            {t('profile')}
          </MenuItem>
          <MenuItem icon={<VerifiedUserIcon />} component={<Link to={path.adminVerifyExpert} style={styleLink} />}>
            {t('verifyExpert')}
          </MenuItem>
          <SubMenu label={t('management')} style={styleLink} icon={<HandymanIcon />}>
            <MenuItem icon={<ManageAccountsIcon />} component={<Link to={path.adminListUser} style={styleLink} />}>
              {t('usersManagement')}
            </MenuItem>
            <MenuItem icon={<ManageSearchIcon />} component={<Link to={path.adminListMajor} style={styleLink} />}>
              {t('majorsManagement')}
            </MenuItem>

            <MenuItem icon={<FindInPageIcon />} component={<Link to={path.adminListDocument} style={styleLink} />}>
              {t('documentManagement')}
            </MenuItem>
            <MenuItem
              icon={<AccountBalanceWalletIcon />}
              component={<Link to={path.adminListTransaction} style={styleLink} />}
              >
              {t('transactionManagement')}
            </MenuItem>
            <MenuItem icon={<ReportIcon />} component={<Link to={path.adminListReport} style={styleLink} />}>
              {t('reportManagement')}
            </MenuItem>
            <MenuItem
              icon={<AccountBalanceWalletIcon />}
              component={<Link to={path.adminWithdraw} style={styleLink} />}
              >
              {t('withdrawManagement')}
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
      </>
      )}
    </Sidebar>
  )
}
