import React, { useContext } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import JobRequestsTable from './JobRequestsTable'
import { MajorContext } from '../../../../contexts/major.context'
import { TextField, MenuItem, Box, Pagination, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import svg from '../../../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
const JobRequest = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const { majors, loading, getMajors } = useContext(MajorContext)
  const [jobRequests, setJobRequests] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [major_id, setMajor_id] = React.useState('')
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(0)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.getJobRequests + `?page=${pageCount}&major_id=${major_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.job_requests) {
            setJobRequests(res.data.pagination.job_requests)
            setTotalPages(res.data.pagination.totalPages)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    getMajors()
  }, [])
  React.useEffect(() => {
    setPageCount(1)
    setIsLoading(true)
    fetchData()
  }, [refresh, major_id])

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
        <title>{t('jobRequest')}</title>
      </Helmet>
      <Box direction='row' spacing={2} sx={{ marginBottom: '20px', display: 'flex' }}>
        <h1>{t('jobRequest')}</h1>
        <TextField
          id='outlined-select-currency'
          select
          label={t('major')}
          defaultValue='0'
          sx={{
            width: '30%',
            marginLeft: 'auto',
            marginTop: '15px'
          }}
          onChange={(e) => setMajor_id(e.target.value)}
        >
          <MenuItem key='all' value='0'>
            {t('all')}
          </MenuItem>
          {majors.majors?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {isLoading ? (
        <Loading />
      ) : jobRequests.length > 0 ? (
        <JobRequestsTable
          majorsOrder={jobRequests}
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
            mb: isMobile ? 3 : 0
          }}
        />
      </Box>
    </div>
  )
}

export default JobRequest
