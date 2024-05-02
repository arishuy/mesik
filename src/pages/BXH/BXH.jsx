import {
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useMusicPlayer } from '../../contexts/music.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
const BXH = () => {
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([
    {
      song: {},
      todayRank: 0,
      yesterdayRank: 0,
      rankChange: 0
    }
  ])
  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.rank.getDailyRank)
      .then((res) => {
        setData(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Bảng Xếp Hạng</title>
      </Helmet>
      <Typography variant='h4' py={3}>
        Bảng xếp hạng hằng ngày
      </Typography>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Bài Hát</TableCell>
              <TableCell align='center'>Thời Lượng</TableCell>
              <TableCell align='right'>Ngày Cập Nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((majorsOrder) => {
              return (
                <TableRow hover key={majorsOrder.song._id}>
                  <TableCell align='left'>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='h4' color='text.primary' noWrap>
                        {majorsOrder.todayRank}
                      </Typography>
                      {majorsOrder.rankChange > 0 ? (
                        <>
                          <Stack direction='row' alignItems='center'>
                            <ArrowDropUpRoundedIcon style={{ color: 'green' }} />
                            <Typography variant='body1' color='text.primary' noWrap>
                              <span style={{ color: 'green' }}>{majorsOrder.rankChange}</span>
                            </Typography>
                          </Stack>
                        </>
                      ) : majorsOrder.rankChange === 0 ? (
                        <RemoveRoundedIcon style={{ color: 'blue', padding: '5px', marginLeft: '5px' }} />
                      ) : majorsOrder.rankChange === 'NEW' ? (
                        <Stack direction='row' alignItems='center'>
                          <SwitchAccessShortcutRoundedIcon style={{ color: 'blue', padding: '5px' }} />
                          <Typography variant='subtile1' color='text.primary' fontWeight='bold' noWrap>
                            <span style={{ color: 'red' }}>{majorsOrder.rankChange}</span>
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction='row' alignItems='center'>
                          <ArrowDropDownRoundedIcon style={{ color: 'red' }} />
                          <Typography variant='body1' color='text.primary' noWrap>
                            <span style={{ color: 'red' }}>{majorsOrder.rankChange.toString().replace('-', '')}</span>
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar
                        src={majorsOrder.song.photo_url}
                        onClick={() => {
                          playSong([majorsOrder.song])
                        }}
                        sx={{
                          width: 50,
                          height: 50,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 0.7,
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                      <Stack direction='column' spacing={0}>
                        <Typography variant='body1' fontWeight='bold' color='text.primary' noWrap>
                          {majorsOrder.song.title}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight='bold' color='text.primary' noWrap>
                          {majorsOrder.song.artist?.user.first_name} {majorsOrder.song.artist?.user.last_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                      {convertToMinutes(majorsOrder.song.duration)}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {moment(majorsOrder.song.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                      {moment(majorsOrder.song.createdAt).format('h:mm:ss A')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BXH
