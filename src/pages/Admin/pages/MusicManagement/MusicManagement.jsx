import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import MusicTable from './MusicTable'
import { Box, Pagination, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import svg from '../../../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const MusicManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [music, setMusic] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(0)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.music.getAllMusic + `?limit=10&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.songs) {
            setMusic(res.data.pagination.songs)
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
        <title>{t('songManagement')}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : music.length > 0 ? (
        <MusicTable majorsOrder={music} fetchData={fetchData} pageCount={pageCount} setPageCount={setPageCount} />
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

export default MusicManagement
