import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Chip,
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
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone'
import SsidChartTwoToneIcon from '@mui/icons-material/SsidChartTwoTone'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import pusher from '../../common/utils/pusher'
import dayjs from 'dayjs'
import Report from './Report'

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
              {user.first_name} {user.last_name}{' '}
            </UserBoxLabel>

            <UserBoxDescription variant='body2'>
              {user.balance.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItem button to={path.buyPremium} component={NavLink}>
            <Typography variant='body1' color='text.primary' fontWeight='bold'>
              {t('servicePackage')}:
            </Typography>
            <Chip
              label={user.premiumEndDate && dayjs(user.premiumEndDate) > dayjs() ? 'PREMIUM' : 'FREE'}
              color={user.premiumEndDate && dayjs(user.premiumEndDate) > dayjs() ? 'secondary' : 'error'}
              size='small'
              sx={{
                fontSize: '0.6rem',
                fontWeight: 'bold',
                px: 1,
                ml: 1
              }}
            />
          </ListItem>
          {user.role === 'USER' && (
            <>
              <ListItem button to={path.profile} component={NavLink}>
                <AccountBoxTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('myProfile')} />
              </ListItem>
              <ListItem button to={path.changePassword} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('changePassword')} />
              </ListItem>
              <Report />
            </>
          )}
          {user.role === 'ADMIN' && (
            <>
              <ListItem button to={path.adminDashBoard} component={NavLink}>
                <SsidChartTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('statistics')} />
              </ListItem>
              <ListItem button to={path.changePassword} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('changePassword')} />
              </ListItem>
            </>
          )}
          {user.role === 'ARTIST' && (
            <>
              <ListItem button to={path.artistProfile} component={NavLink}>
                <AccountBoxTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('myProfile')} />
              </ListItem>
              <ListItem button to={path.changePassword} component={NavLink}>
                <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
                <ListItemText primary={t('changePassword')} />
              </ListItem>
              <Report />
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
