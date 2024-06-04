import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DailyRank from './DailyRank'
import VietnamRank from './VietnamRank'
import GlobalRank from './GlobalRank'
import { AppContext } from '../../contexts/app.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useResponsive from '../../hooks/useResponsive'

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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs() {
  const isMobile = useResponsive('down', 'sm')
  const [value, setValue] = React.useState(0)
  const { isAuthenticated } = React.useContext(AppContext)
  const [allPlaylists, setAllPlaylists] = React.useState([])

  const fetchAllPlaylists = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setAllPlaylists(res.data.playlists)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchAllPlaylists()
    }
  }, [])
  return (
    <Box sx={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='scrollable'
          scrollButtons='auto'
        >
          <Tab label='Hàng Ngày' {...a11yProps(0)} />
          <Tab label='Việt Nam' {...a11yProps(1)} />
          <Tab label='Quốc Tế' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DailyRank allPlaylists={allPlaylists} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VietnamRank allPlaylists={allPlaylists} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <GlobalRank allPlaylists={allPlaylists} />
      </CustomTabPanel>
    </Box>
  )
}
