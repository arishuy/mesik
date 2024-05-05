import React, { useEffect, useState } from 'react'
import Loading from '../../common/components/Loading/Loading'
import Empty from '../../common/components/Empty'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { useMusicPlayer } from '../../contexts/music.context'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material'
const HistoryListen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [historyListen, setHistoryListen] = useState([])
  const { playSong } = useMusicPlayer()

  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }
  const fetchHistoryListen = async () => {
    await AxiosInterceptors.get(urlConfig.user.getHistoryListen)
      .then((res) => {
        setHistoryListen(res.data.songs)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchHistoryListen()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Typography variant='h4' py={3}>
        Nghe gần đây
      </Typography>
      {historyListen.length === 0 ? (
        <Empty message={'Không có lịch sử nghe nào!'} />
      ) : (
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Bài Hát</TableCell>
                <TableCell align='right'>Thời Lượng</TableCell>
                <TableCell align='right'>Hành Động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyListen.map((majorsOrder) => {
                return (
                  <TableRow hover key={majorsOrder._id}>
                    <TableCell
                      sx={{
                        width: '500px'
                      }}
                    >
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar
                          src={majorsOrder.photo_url}
                          onClick={() => {
                            playSong([majorsOrder])
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
                            {majorsOrder.title}
                          </Typography>
                          <Typography variant='subtitle1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.artist.display_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' color='text.primary' noWrap>
                        {convertToMinutes(majorsOrder.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Xóa khỏi lịch sử nghe' arrow>
                        <IconButton color='error'>
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default HistoryListen
