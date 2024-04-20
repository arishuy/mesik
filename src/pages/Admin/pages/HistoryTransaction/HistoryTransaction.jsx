import React from 'react'

import { Helmet } from 'react-helmet-async'
import Transaction from './Transaction'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const HistoryTransaction = () => {
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
        <title>{t('historyTransaction')}</title>
      </Helmet>
      <Transaction />
    </div>
  )
}

export default HistoryTransaction
