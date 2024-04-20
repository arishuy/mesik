import { Card, Pagination, Stack, Typography, Box } from '@mui/material'
import TransactionTable from './TransactionTable'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useEffect, useState } from 'react'
import Loading from '../../../../common/components/Loading/Loading'
import { useTranslation } from 'react-i18next'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import useResponsive from '../../../../hooks/useResponsive'
function Transaction() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [fromDay, setFromDay] = useState('')
  const [toDay, setToDay] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [transaction, setTransaction] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const fetchData = async () => {
    setIsLoading(true)
    await AxiosInterceptors.get(
      urlConfig.transaction.getAll + `?page=${pageCount}&date_from=${fromDay}&date_to=${toDay}`
    )
      .then((res) => {
        setTransaction(res.data.transactions.transactions)
        setTotalPages(res.data.transactions.totalPages)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [pageCount, toDay, fromDay])
  return (
    <>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Typography variant='h3' sx={{ margin: '1rem 0' }}>
          {t('historyTransaction')}
        </Typography>
        <Stack direction='row' spacing={2} sx={{ marginBottom: '20px', float: 'right' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ padding: '1rem 0' }}>
              <DatePicker label={t('fromDate')} value={fromDay} onChange={(newValue) => setFromDay(newValue)} />
              <DatePicker label={t('toDate')} value={toDay} onChange={(newValue) => setToDay(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Card>{!isLoading ? <TransactionTable transaction={transaction} /> : <Loading />}</Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          color='primary'
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2,
            mb: isMobile ? 5 : 0
          }}
        />
      </Box>
    </>
  )
}

export default Transaction
