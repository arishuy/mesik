import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, useTheme, Box, Typography, Tabs, Tab } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import svg from '../../../../assets/icons/pdf_file.svg'
import moment from 'moment'
import { IconButton, Tooltip } from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import Loading from '../../../../common/components/Loading/Loading'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const DocumentModal = ({ open, handleClose, fetchData, item }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const { snack, setSnack } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [document, setDocument] = useState([{}])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleGetData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.uploadDocuments + `/${item._id}/documents`)
      .then((res) => {
        if (res && res.status === 200) {
          setDocument(res.data.documents)
          setLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <>
      <Snackbar />
      {loading ? (
        <Loading />
      ) : (
        <RootModal
          variant='Info'
          title={t('documentInfo')}
          open={open}
          handleClose={handleClose}
          handleOk={() => {
            handleClose()
          }}
          closeOnly={true}
        >
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' variant='scrollable'>
                {document.map((item, index) => {
                  return <Tab label={item.name} {...a11yProps(index)} />
                })}
              </Tabs>
            </Box>
            {document.map((item, index) => {
              return (
                <CustomTabPanel value={value} index={index}>
                  <Stack
                    spacing={2}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ width: '100%', my: 2 }}
                  >
                    <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
                      <img src={svg} alt='pdf' />
                      <Stack spacing={1} direction='column' sx={{ width: '100%', justifyContent: 'center' }}>
                        <Typography variant='h6'>{item.name}</Typography>
                        <Typography variant='body2'>
                          Ngày tải lên: {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Tooltip title={t('detailInfo')} arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.palette.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => {
                          window.open(item.file_url, '_blank')
                        }}
                        color='inherit'
                        size='small'
                      >
                        <VisibilityTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CustomTabPanel>
              )
            })}
          </Box>
        </RootModal>
      )}
    </>
  )
}

export default DocumentModal
