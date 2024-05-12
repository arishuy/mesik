import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import UsersTable from './UsersTable'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const UsersManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()

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
      <UsersTable />
    </div>
  )
}

export default UsersManagement
