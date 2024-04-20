import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import UsersTable from './UsersTable'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import Loading from '../../../../common/components/Loading/Loading'

const UsersManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [refresh, setRefresh] = React.useState(false)

	const fetchData = async (limit = 100000) => {
    const res = await AxiosInterceptors.get(urlConfig.user.users + `?limit=${limit}`)
    if (res && res.status === 200) {
      if (res.data.pagination) {
        if (res.data.pagination.users) {
          setUsers(res.data.pagination.users)
          setIsLoading(false)
        }
      }
    }
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
        <title>{t('userManagement')}</title>
      </Helmet>
      {isLoading ? <Loading /> : <UsersTable users={users} fetchData={fetchData} />}
    </div>
  )
}

export default UsersManagement
