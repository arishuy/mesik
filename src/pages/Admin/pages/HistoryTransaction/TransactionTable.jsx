import { useState } from 'react'
import jsPDF from 'jspdf'
import moment from 'moment'
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Stack,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Avatar
} from '@mui/material'

import Label from '../../../../components/Label'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone'
import { useTranslation } from 'react-i18next'
import DetailTransaction from './DetailTransaction'

const getStatusLabel = (transaction) => {
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

  const { text, color } = map[transaction]

  return <Label color={color}>{text}</Label>
}

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true

    if (filters.status && cryptoOrder.transaction_status !== filters.status) {
      matches = false
    }

    return matches
  })
}

const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit)
}

const TransactionTable = ({ transaction }) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState({})
  const [filters, setFilters] = useState({
    status: null
  })

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'DONE',
      name: 'Completed'
    },
    {
      id: 'PROCESSING',
      name: 'Processing'
    },
    {
      id: 'CANCELED',
      name: 'Canceled'
    },
    {
      id: 'PENDING',
      name: 'Pending'
    }
  ]

  const handleStatusChange = (e) => {
    let value = null

    if (e.target.value !== 'all') {
      value = e.target.value
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }))
  }
  function downloadInvoice(invoiceData) {
    const { user, job_request, expert, amount, transaction_type, transaction_status, createdAt, _id } = invoiceData

    const doc = new jsPDF()
    // Tạo tiêu đề
    doc.setFontSize(30)
    doc.setFont('helvetica', 'bold')
    doc.text('Transaction', 70, 15)
    doc.setFontSize(12)
    doc.text(`Id:#${_id}`, 15, 25)
    // Thông tin người dùng
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('User:', 15, 35)
    doc.setFont('helvetica', 'normal')
    doc.text(`- Id: ${user._id}`, 15, 45)
    doc.text(`- Email: ${user.email}`, 15, 55)
    doc.text(`- Phone: ${user.phone}`, 15, 65)
    if (transaction_type === 'PAYMENT') {
      doc.setFont('helvetica', 'bold')
      doc.text('To Expert:', 105, 35)
      doc.setFont('helvetica', 'normal')
      doc.text(`- Id: ${expert._id}`, 105, 45)
      doc.text(`- Email: ${expert.email}`, 105, 55)
      doc.text(`- Phone: ${expert.phone}`, 105, 65)
      // Thông tin yêu cầu công việc
      doc.setFont('helvetica', 'bold')
      doc.text('Job Request:', 15, 75)
      doc.setFont('helvetica', 'normal')
      doc.text(`- Title: ${job_request.title}`, 15, 85)
      doc.text(`- Description: ${job_request.descriptions}`, 15, 95)
    }
    // Thông tin thanh toán
    doc.setFont('helvetica', 'bold')
    doc.text('Payment:', 15, 115)
    doc.setFont('helvetica', 'normal')
    doc.text(`- Price: ${amount} VND`, 15, 125)
    doc.text(`- Payment Type: ${transaction_type}`, 15, 135)
    doc.text(`- Payment Status: ${transaction_status}`, 15, 145)
    doc.text(`- Payment Time: ${moment(createdAt).format('DD/MM/YYYY h:mm:ss A')}`, 15, 155)

    // Lưu file PDF
    doc.save(`transaction_${_id}.pdf`)
  }
  const filteredCryptoOrders = applyFilters(transaction, filters)
  const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit)
  const theme = useTheme()
  return (
    <>
      {open && <DetailTransaction open={open} setOpen={setOpen} transaction={item} />}
      <Card>
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>{t('status')}</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label='Status' autoWidth>
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title={t('recentTransaction')}
        />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>{t('from')}</TableCell>
                <TableCell>{t('to')}</TableCell>
                <TableCell>{t('time')}</TableCell>
                <TableCell>{t('type')}</TableCell>
                <TableCell align='right'>{t('moneyAmount')}</TableCell>
                <TableCell align='right'>{t('status')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders.map((cryptoOrder) => {
                return (
                  <TableRow hover key={cryptoOrder.id}>
                    <TableCell>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar src={cryptoOrder.user.photo_url} />
                        <Stack direction='column' spacing={0}>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {cryptoOrder.user.first_name} {cryptoOrder.user.last_name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary' noWrap>
                            {cryptoOrder.user.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {cryptoOrder.expert ? (
                        <>
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar src={cryptoOrder.expert.photo_url} />
                            <Stack direction='column' spacing={0}>
                              <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                                {cryptoOrder.expert.first_name} {cryptoOrder.expert.last_name}
                              </Typography>
                              <Typography variant='body2' color='text.secondary' noWrap>
                                {cryptoOrder.expert.email}
                              </Typography>
                            </Stack>
                          </Stack>
                        </>
                      ) : (
                        <>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {t('me')}
                          </Typography>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.secondary' noWrap>
                        {moment(cryptoOrder.updatedAt).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant='subtitle1' color='text.secondary' noWrap>
                        {moment(cryptoOrder.updatedAt).format('h:mm:ss A')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {cryptoOrder.transaction_type}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2' color='text.secondary' noWrap>
                        {cryptoOrder.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>{getStatusLabel(cryptoOrder.transaction_status)}</TableCell>
                    <TableCell align='right'>
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
                      <Tooltip title={t('exportData')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.palette.success.lighter
                            },
                            color: theme.palette.success.main
                          }}
                          color='inherit'
                          size='small'
                          onClick={() => downloadInvoice(cryptoOrder)}
                        >
                          <PrintTwoToneIcon fontSize='small' />
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

export default TransactionTable
