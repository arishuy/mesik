import merge from 'lodash/merge'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material'
import { BaseOptionChart } from '../../../../components/chart'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import moment from 'moment'
import { t } from 'i18next'

export default function IncomeChart() {
  const [by, setBy] = useState('WEEK')
  const [data, setData] = useState([])
  const fetchData = async (fromDate, toDate) => {
    await AxiosInterceptors.get(
      urlConfig.statistics.getStatisticsIncome +
        `?start_date=${fromDate}&end_date=${toDate}&by=${by === 'WEEK' ? 'DAY' : 'MONTH'}`
    ).then((res) => {
      if (res.status === 200) {
        if (by === 'MONTH') {
          let dataMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          res.data.stats.map((item) => {
            dataMonth[moment(item._id).format('MM') - 1] = item.amount
          })
          setData([
            ...data,
            {
              name: 'Income',
              data: dataMonth
            }
          ])
        }
        if (by === 'WEEK') {
          let dataWeek = [0, 0, 0, 0, 0, 0, 0]
          res.data.stats.map((item) => {
            dataWeek[moment(item._id).format('d')] = item.amount
          })
          setData([
            ...data,
            {
              name: 'Income',
              data: dataWeek
            }
          ])
        }
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleChangeBy = (event) => {
    setData([])
    setBy(event.target.value)
  }

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories:
        by === 'MONTH'
          ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] // Use short month names for 'MONTH' interval
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // Use short day names for 'WEEK' interval
    }
  })

  useEffect(() => {
    if (by === 'WEEK') {
      fetchData(moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().endOf('isoWeek').format('YYYY-MM-DD'))
    }
    if (by === 'MONTH') {
      fetchData(moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD'))
    }
  }, [by])
  return (
    <Card>
      <CardHeader
        title='Thu nhập'
        action={
          <TextField
            select
            fullWidth
            value={by}
            SelectProps={{ native: true }}
            onChange={(e) => handleChangeBy(e)}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            <option value='WEEK'>{t('week')}</option>
            <option value='MONTH'>{t('month')}</option>
          </TextField>
        }
      />

      <Box sx={{ mt: 3, mx: 3 }} dir='ltr'>
        {data.length > 0 && <ReactApexChart type='area' series={data} options={chartOptions} height={364} />}
      </Box>
    </Card>
  )
}
