import { useEffect, useState, lazy } from 'react'
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Avatar,
  Stack
} from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import Label from '../../../../components/Label'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LockIcon from '@mui/icons-material/Lock'
import Loading from '../../../../common/components/Loading/Loading'
import UserTableToolbar from './UserTableToolBar'
// import DocumentModal from './DocumentModal'
const UserInfoModal = lazy(() => import('../../components/UserInfoModal'))
const ROLE_OPTIONS = ['all', 'USER', 'ARTIST', 'ADMIN']
const UsersTable = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [currentRow, setCurrentRow] = useState(null)
  const [item, setItem] = useState({})
  const { snack, setSnack } = useSnackbar()
  const theme = useTheme()
  const [filterName, setFilterName] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }
  const handleFilterName = (filterName) => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value)
    setPage(0)
  }
  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value))
  }

  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const hanldeClickLockAccount = async (user) => {
    handleCloseMenu()
    if (user.isRestricted) {
      const res = await AxiosInterceptors.put(`${urlConfig.user.users}/${user._id}/enable`)
      if (res.status === 200) {
        fetchData()
        setSnack({
          open: true,
          message: t('unlockedAccountSuccess'),
          type: 'success'
        })
      } else {
        setSnack({
          open: true,
          message: t('unlockedAccountFail'),
          type: 'error'
        })
      }
    } else if (!user.isRestricted) {
      const res = await AxiosInterceptors.put(`${urlConfig.user.users}/${user._id}/disable`)
      if (res.status === 200) {
        fetchData()
        setSnack({
          open: true,
          message: t('lockedAccountSuccess'),
          type: 'success'
        })
      } else {
        setSnack({
          open: true,
          message: t('lockedAccountFail'),
          type: 'error'
        })
      }
    }
  }

  const handleClickEditBtn = (user) => {
    setCurrentRow(user)
    setOpenModal(true)
  }

  const handleClickDeleteBtn = async (user) => {
    await AxiosInterceptors.delete(urlConfig.user.deleteUser + `/${user._id}`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('deleteSuccess'),
          type: 'success'
        })
        fetchData()
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('deleteFail'),
          type: 'error'
        })
      })
  }

  const getLabel = (item) => {
    const map = {
      USER: {
        text: 'USER',
        color: 'info'
      },
      ARTIST: {
        text: 'ARTIST',
        color: 'success'
      },
      ADMIN: {
        text: 'ADMIN',
        color: 'warning'
      },
      YES: {
        text: 'YES',
        color: 'success'
      },
      NO: {
        text: 'NO',
        color: 'error'
      },
      ACTIVE: {
        text: 'ACTIVE',
        color: 'success'
      },
      UNACTIVE: {
        text: 'UNACTIVE',
        color: 'error'
      }
    }

    const { text, color } = map[item]

    return <Label color={color}>{text}</Label>
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const fetchData = async (limit = 100000) => {
    const res = await AxiosInterceptors.get(
      urlConfig.user.users + `?limit=${limit}&role=${filterRole}&name=${filterName}`
    )
    if (res && res.status === 200) {
      if (res.data.pagination) {
        if (res.data.pagination.users) {
          setUsers(res.data.pagination.users)
          setIsLoading(false)
        }
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [filterName, filterRole])
  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return isLoading ? (
    <Loading />
  ) : (
    <>
      {openModal && (
        <UserInfoModal open={openModal} handleCloseModal={handleCloseModal} user={currentRow} fetchData={fetchData} />
      )}
      <Card>
        <CardHeader title={t('userManagement')} />
        <Divider />
        <UserTableToolbar
          filterName={filterName}
          filterRole={filterRole}
          onFilterName={handleFilterName}
          onFilterRole={handleFilterRole}
          optionsRole={ROLE_OPTIONS}
        />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>{t('fullName')}</TableCell>
                <TableCell>{t('phoneNumber')}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell align='right'>{t('role')}</TableCell>
                    <TableCell align='right'>{t('verify')}</TableCell>
                    <TableCell align='right'>{t('status')}</TableCell>
                  </>
                )}
                <TableCell align='right'>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map(
                (users) => {
                  return (
                    <TableRow hover key={users._id}>
                      <TableCell>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <Avatar src={users.photo_url} />
                          <Stack direction='column' spacing={0}>
                            <Typography variant='body1' fontWeight='bold' color='text.primary' noWrap>
                              {users.first_name} {users.last_name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary' noWrap>
                              {users.email}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {users.phone}
                        </Typography>
                      </TableCell>
                      {!isMobile && (
                        <>
                          <TableCell align='right'>
                            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                              {getLabel(users.role)}
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                              {users.isConfirmed === true ? getLabel('YES') : getLabel('NO')}
                            </Typography>
                          </TableCell>
                          <TableCell align='right'>
                            <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                              {users.isRestricted ? getLabel('UNACTIVE') : getLabel('ACTIVE')}
                            </Typography>
                          </TableCell>
                        </>
                      )}
                      <TableCell align='right'>
                        <Tooltip title={t('detailInfo')} arrow>
                          <IconButton
                            onClick={() => {
                              handleClickEditBtn(users)
                            }}
                            size='small'
                          >
                            <EditIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={users.isRestricted ? t('unlock') : t('lock')} arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.palette.warning.lighter
                              },
                              color: theme.palette.warning.main
                            }}
                            onClick={() => {
                              hanldeClickLockAccount(users)
                            }}
                            color='inherit'
                            size='small'
                          >
                            <LockIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={t('delete')} arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.palette.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            onClick={() => {
                              handleClickDeleteBtn(users)
                            }}
                            color='inherit'
                            size='small'
                          >
                            <DeleteIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <TablePagination
            component='div'
            count={users.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  )
}

export default UsersTable
