import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material'
import path from '../../constants/path'
import { styled } from '@mui/material/styles'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone'
import SsidChartTwoToneIcon from '@mui/icons-material/SsidChartTwoTone'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone'
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone'
import TaskTwoToneIcon from '@mui/icons-material/TaskTwoTone'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import pusher from '../../common/utils/pusher'

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.background.paper};
        padding:  20px;
`
)

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: 20px;
`
)

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.text.primary};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.text.primary, 0.4)};
`
)

function HeaderUserbox() {
  const { t } = useTranslation()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const user = JSON.parse(localStorage.getItem('profile'))
  const channel = pusher.subscribe(`user-${user._id}`)
  channel.bind('update_balance', function (data) {
    if (user) {
      localStorage.setItem('profile', JSON.stringify({ ...user, balance: data.balance }))
    }
  })
  const logOut = async () => {
    removeCookie('access_token', { path: '/' })
    removeCookie('refresh_token', { path: '/' })
    removeCookie('user', { path: '/' })
    localStorage.removeItem('profile')
    window.location.reload()
  }

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Fab
        size='small'
        aria-label='add'
        ref={ref}
        onClick={handleOpen}
        sx={{
          backgroundColor: '#D2E9E9 '
        }}
      >
        <Avatar alt='Remy Sharp' src={user.photo_url} />
      </Fab>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={user.first_name} src={user.photo_url} />
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user.first_name} {user.last_name}
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {user.balance.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          {user.role === 'USER' && (
            <>
              <ListItem button to={path.profile} component={NavLink}>
                <AccountBoxTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('myProfile')} />
              </ListItem>
              <ListItem button to={path.historyTransaction} component={NavLink}>
                <CalendarMonthRoundedIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('historyTransaction')} />
              </ListItem>
              <ListItem button to={path.changePassword} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('changePassword')} />
              </ListItem>
            </>
          )}
          {user.role === 'ADMIN' && (
            <>
              <ListItem button to={path.adminDashBoard} component={NavLink}>
                <SsidChartTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary='Thống kê' />
              </ListItem>
              <ListItem button to={path.adminListUser} component={NavLink}>
                <CalendarMonthRoundedIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('usersManagement')} />
              </ListItem>
              <ListItem button to={path.adminListMajor} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('majorsManagement')} />
              </ListItem>
              <ListItem button to={path.adminListDocument} component={NavLink}>
                <TaskTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('documentManagement')} />
              </ListItem>
              <ListItem button to={path.adminListTransaction} component={NavLink}>
                <AccountBalanceWalletTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('transactionManagement')} />
              </ListItem>
              <ListItem button to={path.adminVerifyExpert} component={NavLink}>
                <VerifiedUserTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('verifyExpert')} />
              </ListItem>
            </>
          )}
          {user.role === 'EXPERT' && (
            <>
              <ListItem button to={path.expertProfile} component={NavLink}>
                <AccountBoxTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('myProfile')} />
              </ListItem>
              <ListItem button to={path.expertTransactionHistory} component={NavLink}>
                <CalendarMonthRoundedIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('historyTransaction')} />
              </ListItem>
              <ListItem button to={path.expertChangePassword} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('changePassword')} />
              </ListItem>
            </>
          )}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color='error' variant='text' fullWidth onClick={logOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            {t('signOut')}
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderUserbox
