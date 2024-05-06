import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import RequestTable from './RequestTable'
import { Box, Pagination, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import svg from '../../../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const RequestManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [request, setRequest] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(0)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.requests.getAllRequests + `?limit=10&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.requests) {
            setRequest(res.data.pagination.requests)
            setTotalPages(res.data.pagination.totalPages)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    setIsLoading(true)
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
        <title>{t('RequestManagement')}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : request.length > 0 ? (
        <>
          <RequestTable majorsOrder={request} fetchData={fetchData} pageCount={pageCount} setPageCount={setPageCount} />
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
      ) : (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Container maxWidth='md'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <img alt='404' height={200} src={svg} />
              <Typography variant='h3' color='text.secondary' fontWeight='500' sx={{ mt: 2 }}>
                {t('noResults')}
              </Typography>
            </Box>
          </Container>
        </div>
      )}
    </div>
  )
}

export default RequestManagement
