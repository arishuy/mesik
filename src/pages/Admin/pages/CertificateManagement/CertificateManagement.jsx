import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import CertificatesTable from './CertificatesTable'
import { Box, Stack, Pagination, Container, Typography, TextField, InputAdornment } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import svg from '../../../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import useResponsive from '../../../../hooks/useResponsive'

const CertificateManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [certificates, setCertificates] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [totalPages, setTotalPages] = React.useState(0)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.expertUnverified + `?search=${searchTerm}&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.experts) {
            setCertificates(res.data.pagination.experts)
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
        <title>{t('verifyExpert')}</title>
      </Helmet>
      <Stack direction='row' spacing={2} justifyContent='space-between' sx={{ mb: 4 }}>
        <Typography variant='h3' sx={{ margin: '1rem 0' }}>
          {t('verifyExpert')}
        </Typography>
        <Stack direction='row' spacing={2} sx={{ marginBottom: '20px', float: 'right' }}>
          <TextField
            id='search'
            type='search'
            label={isMobile ? '' : t('searchTitle')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsLoading(true)
                fetchData()
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : certificates.length > 0 ? (
        <CertificatesTable
          majorsOrder={certificates}
          fetchData={fetchData}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
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
    </div>
  )
}

export default CertificateManagement
