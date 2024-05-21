import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import urlConfig from '../../../config/UrlConfig'
import Loading from '../../../common/components/Loading/Loading'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme,
  Typography
} from '@mui/material'
import moment from 'moment'
import { useMusicPlayer } from '../../../contexts/music.context'
import convertToMinutes from '../../../common/utils/convertToMinutes'
import { AppContext } from '../../../contexts/app.context'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { useTranslation } from 'react-i18next'
import AddLyric from './AddLyric'
import EditSong from './EditSong'
import DeleteConfirm from './DeleteConfirm'
import { GenreContext } from '../../../contexts/genre.context'
import { RegionContext } from '../../../contexts/region.context'
import useSnackbar from '../../../contexts/snackbar.context'

const HistoryUpload = () => {
  const theme = useTheme()
  const { profile } = useContext(AppContext)
  const { t } = useTranslation()
  const [pageCount, setPageCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [songs, setSongs] = useState([])
  const { playSong } = useMusicPlayer()
  const [id, setId] = useState('')
  const [openAddLyric, setOpenAddLyric] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { genres, getGenres } = useContext(GenreContext)
  const { regions, getRegions } = useContext(RegionContext)
  const { snack, setSnack } = useSnackbar()
  const [item, setItem] = useState({})

  const fetchData = async () => {
    await Axios.get(urlConfig.music.getAllMusicByArtist + `/${profile.artist}?limit=10&page=${pageCount}`)
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
    getRegions()
    getGenres()
    fetchData()
  }, [pageCount])
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {openModal && (
        <EditSong
          open={openModal}
          handleClose={() => setOpenModal(false)}
          fetchData={fetchData}
          snack={snack}
          setSnack={setSnack}
          song={item}
          genres={genres}
          regions={regions}
        />
      )}
      {openAddLyric && (
        <AddLyric
          open={openAddLyric}
          handleClose={() => setOpenAddLyric(false)}
          fetchData={fetchData}
          id={id}
          snack={snack}
          setSnack={setSnack}
        />
      )}
      {openDelete && (
        <DeleteConfirm
          open={openDelete}
          setOpen={setOpenDelete}
          fetchData={fetchData}
          id={id}
          snack={snack}
          setSnack={setSnack}
        />
      )}
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          Đã tải lên
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
              <TableCell align='right'>Action</TableCell>
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
                  <TableCell align='right'>
                    <Tooltip title={t('detailInfo')} arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.palette.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => {
                          setItem(song)
                          setOpenModal(true)
                        }}
                        color='inherit'
                        size='small'
                      >
                        <VisibilityTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Edit lyric')} arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.palette.warning.lighter
                          },
                          color: theme.palette.warning.main
                        }}
                        onClick={() => {
                          setId(song._id)
                          setOpenAddLyric(true)
                        }}
                        color='inherit'
                        size='small'
                      >
                        <EditTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('delete')} arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.palette.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color='inherit'
                        size='small'
                        onClick={() => {
                          setId(song._id)
                          setOpenDelete(true)
                        }}
                      >
                        <DeleteTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
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

export default HistoryUpload
