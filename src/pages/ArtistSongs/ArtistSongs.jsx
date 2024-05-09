import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import Loading from '../../common/components/Loading/Loading'
import {
  Avatar,
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import moment from 'moment'
import { useMusicPlayer } from '../../contexts/music.context'
import convertToMinutes from '../../common/utils/convertToMinutes'
const ArtistSongs = () => {
  const [pageCount, setPageCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [songs, setSongs] = useState([])
  const { playSong } = useMusicPlayer()
  const param = useParams()

  const fetchData = async () => {
    await Axios.get(urlConfig.music.getAllMusicByArtist + `/${param.nameId}?limit=10&page=${pageCount}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.songs) {
            setSongs(res.data.pagination.songs)
            setTotalPages(res.data.pagination.totalPages)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [pageCount])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          {songs.length > 0 ? songs[0].artist.display_name : ''} - Tất cả bài hát
        </Typography>
        {songs.length > 0 && (
          <Button
            variant='outlined'
            color='primary'
            sx={{
              borderRadius: '20px'
            }}
            onClick={() => playSong(songs)}
          >
            Phát tất cả
          </Button>
        )}
      </Stack>

      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell align='right'>Release Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => {
              return (
                <TableRow hover key={song._id}>
                  <TableCell
                    sx={{
                      width: '500px'
                    }}
                  >
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar
                        src={song.photo_url}
                        onClick={() => {
                          playSong([song])
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
                          {song.title}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {song.artist.display_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                      {convertToMinutes(song.duration)}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body1' color='text.primary' fontWeight='bold' gutterBottom noWrap>
                      {moment(song.release_date).format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2
          }}
        />
      </Box>
    </div>
  )
}

export default ArtistSongs
