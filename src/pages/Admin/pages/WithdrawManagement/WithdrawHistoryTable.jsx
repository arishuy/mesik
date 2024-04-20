import moment from 'moment'
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import Label from '../../../../components/Label'
import { useTranslation } from 'react-i18next'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import WithdrawDetail from './WithdrawDetail'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import Snackbar from '../../../../common/components/SnackBar'
import useSnackbar from '../../../../contexts/snackbar.context'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'

const getStatusLabel = (request) => {
  const map = {
    CANCELED: {
      text: 'Canceled',
      color: 'error'
    },
    DONE: {
      text: 'Completed',
      color: 'success'
    },
    PENDING: {
      text: 'Pending',
      color: 'warning'
    },
    PROCESSING: {
      text: 'Processing',
      color: 'info'
    }
  }

  const { text, color } = map[request]

  return <Label color={color}>{text}</Label>
}

const WithdrawHistoryTable = ({ request, fetchData }) => {
  console.log(request)
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [item, setItem] = useState({})
  const { snack, setSnack } = useSnackbar()
  const handleDeny = async (id) => {
    await AxiosInterceptors.post(urlConfig.withdraw_request.deleteWithdrawRequest + `/${id}/cancel`)
      .then((res) => {
        if (res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('rejectSuccess'),
            type: 'success'
          })
          fetchData()
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('rejectFail'),
          type: 'error'
        })
      })
  }
  const handleConfirm = async (id) => {
    await AxiosInterceptors.post(urlConfig.withdraw_request.accepterWithdrawRequest + `/${id}/fulfill`)
      .then((res) => {
        if (res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('confirmSuccess'),
            type: 'success'
          })
          fetchData()
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('confirmFail'),
          type: 'error'
        })
      })
  }
  return (
    <>
      <Snackbar />
      {open && <WithdrawDetail open={open} setOpen={setOpen} withdraw={item} />}
      <Card>
        <CardHeader title={t('recentRequests')} />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('from')}</TableCell>
                <TableCell>{t('time')}</TableCell>
                <TableCell align='right'>{t('moneyAmount')}</TableCell>
                <TableCell align='right'>{t('status')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.map((cryptoOrder) => {
                return (
                  <TableRow hover key={cryptoOrder.id}>
                    <TableCell>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar src={cryptoOrder.user.photo_url} />
                        <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {cryptoOrder.user.first_name} {cryptoOrder.user.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.secondary' noWrap>
                        {moment(cryptoOrder.transaction.updatedAt).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' noWrap>
                        {moment(cryptoOrder.transaction.updatedAt).format('h:mm:ss A')}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2' color='text.secondary' noWrap>
                        {cryptoOrder.transaction.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>{getStatusLabel(cryptoOrder.transaction.transaction_status)}</TableCell>
                    <TableCell align='right'>
                      {cryptoOrder.transaction.transaction_status === 'PROCESSING' && (
                        <>
                          <Tooltip title={t('deny')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.error.lighter
                                },
                                color: theme.palette.error.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                handleDeny(cryptoOrder._id)
                              }}
                            >
                              <CancelTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('confirm')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.success.lighter
                                },
                                color: theme.palette.success.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                handleConfirm(cryptoOrder._id)
                              }}
                            >
                              <CheckCircleTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title={t('detailInfo')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.palette.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color='inherit'
                          size='small'
                          onClick={() => {
                            setOpen(true)
                            setItem(cryptoOrder)
                          }}
                        >
                          <VisibilityTwoToneIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default WithdrawHistoryTable
