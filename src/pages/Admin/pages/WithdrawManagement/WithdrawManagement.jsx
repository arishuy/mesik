import React from 'react'
import { useEffect, useState } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useResponsive from '../../../../hooks/useResponsive'
import Loading from '../../../../common/components/Loading/Loading'
import WithdrawHistoryTable from './WithdrawHistoryTable'
import { Helmet } from 'react-helmet-async'
// @mui
import { Box, Pagination } from '@mui/material'
import { useTranslation } from 'react-i18next'

const WithdrawManagement = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const [pageCount, setPageCount] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [request, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.withdraw_request.getAllWithdrawRequest + `?page=${pageCount}`)
      .then((res) => {
        setRequest(res.data.pagination.withdrawal_requests)
        setTotalPages(res.data.pagination.totalPages)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [pageCount])
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Helmet>
        <title>{t('withdrawManagement')}</title>
      </Helmet>
      {isLoading ? <Loading /> : <WithdrawHistoryTable request={request} fetchData={fetchData} />}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          color='primary'
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2,
            mb: isMobile ? 3 : 0
          }}
        />
      </Box>
    </div>
  )
}

export default WithdrawManagement
