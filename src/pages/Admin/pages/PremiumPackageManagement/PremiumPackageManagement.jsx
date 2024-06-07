import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import PremiumPackageTable from './PremiumPackageTable'
import { Box, Pagination, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const PremiumPackageManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [premiumPackage, setPremiumPackage] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(0)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.premiumPackages.getAllPremiumPackages + `?limit=10&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.premiumPackages) {
            setPremiumPackage(res.data.pagination.premiumPackages)
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
        <title>{t('premiumPackageManagement')}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <PremiumPackageTable
          majorsOrder={premiumPackage}
          fetchData={fetchData}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
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

export default PremiumPackageManagement
