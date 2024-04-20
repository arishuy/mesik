import { useState } from 'react'
import moment from 'moment'
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
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
  CardHeader,
  Avatar
} from '@mui/material'

import Label from '../../../../components/Label'
import { useTranslation } from 'react-i18next'

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

  const filteredCryptoOrders = applyFilters(transaction, filters)
  const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit)
  return (
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('to')}</TableCell>
              <TableCell>{t('time')}</TableCell>
              <TableCell>{t('type')}</TableCell>
              <TableCell align='right'>{t('moneyAmount')}</TableCell>
              <TableCell align='right'>{t('status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
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
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TransactionTable
