import { Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import urlConfig from '../../../../config/UrlConfig'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import { useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import SectionItem from './SectionItem'
import AddIcon from '@mui/icons-material/Add'

const SectionManagement = () => {
  const navigate = useNavigate()
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [sections, setSections] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.sections.getAllSections)
      .then((res) => {
        setSections(res.data.pagination.sections)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Stack direction='row' spacing={2} justifyContent='space-between' py={3}>
        <Typography variant='h3' sx={{ margin: '1rem 0' }}>
          {t('sectionManagement')}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => navigate(path.adminCreateSection)}
        >
          {t('addSection')}
        </Button>
      </Stack>
      <Divider />
      {sections?.map((section) => (
        <SectionItem key={section._id} section={section} fetchData={fetchData} />
      ))}
    </div>
  )
}

export default SectionManagement
