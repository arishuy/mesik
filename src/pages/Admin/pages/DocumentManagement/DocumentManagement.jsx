import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import DocumentTable from './DocumentTable'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import Loading from '../../../../common/components/Loading/Loading'

const MajorsManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [majorsOrder, setMajorsOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [refresh, setRefresh] = React.useState(false)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.expert + '?major_id=&search=&limit=100')
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination) {
            setMajorsOrder(res.data.pagination.experts)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    fetchData()
  }, [refresh])
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Helmet>
        <title>
          {t('documentManagement')}
        </title>
      </Helmet>
      {isLoading ? <Loading /> : <DocumentTable majorsOrder={majorsOrder} fetchData={fetchData} />}
    </div>
  )
}

export default MajorsManagement
