import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import MajorsTable from './MajorsTable'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import Loading from '../../../../common/components/Loading/Loading'
const MajorsManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [majorsOrder, setMajorsOrder] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.majors.getMajors)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.majors) {
            setMajorsOrder(res.data.majors)
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
        <title>{t('majorsManagement')}</title>
      </Helmet>
      {isLoading ? <Loading /> : <MajorsTable majorsOrder={majorsOrder} fetchData={fetchData} />}
    </div>
  )
}

export default MajorsManagement
