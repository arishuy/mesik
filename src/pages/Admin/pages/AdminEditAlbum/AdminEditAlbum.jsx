import {
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  Stack,
  Avatar,
  Button,
  Autocomplete,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { useMusicPlayer } from '../../../../contexts/music.context'
import Loading from '../../../../common/components/Loading/Loading'
import convertToMinutes from '../../../../common/utils/convertToMinutes'
import UploadAvatar from './UploadAvatar'
import useSnackbar from '../../../../contexts/snackbar.context'
import useResponsive from '../../../../hooks/useResponsive'
import { Helmet } from 'react-helmet-async'

const AdminEditAlbum = () => {
  const isMobile = useResponsive('down', 'sm')
  const id = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { playSong } = useMusicPlayer()
  const [formData, setFormData] = useState(new FormData())
  const [allSongs, setAllSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  const [album, setAblum] = useState({
    title: 'Album 1',
    photo_url: 'https://via.placeholder.com/300',
    songs: []
  })
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAlbumById + `/${id.nameId}`)
      .then((res) => {
        setAblum(res.data.album)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchAllSongs = async () => {
    await AxiosInterceptors.get(urlConfig.music.getAllMusic)
      .then((res) => {
        setAllSongs(res.data.songs)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Lấy dữ liệu thất bại',
          type: 'error'
        })
      })
  }
  const handleUpdate = async () => {
    await AxiosInterceptors.put(
      urlConfig.albums.updateAlbum + `/admin/${album._id}`,
      {
        title: album.title,
        song_id: album.songs.map((song) => song._id),
        photo: formData.get('photo') || album.photo_url
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Cập nhật thành công',
          type: 'success'
        })
        navigate(`/admin/section-management`)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Cập nhật thất bại',
          type: 'error'
        })
      })
  }

  useEffect(() => {
    fetchAllSongs()
    fetchData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>Edit album | Admin</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid
          item
          md={4}
          sm={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <UploadAvatar
            file={album.photo_url}
            setFormData={setFormData}
            information={album}
            setInformation={setAblum}
          />
          <TextField
            label='Tên Album'
            value={album.title}
            fullWidth
            onChange={(e) => setAblum({ ...album, title: e.target.value })}
          />
          <Stack direction='row' spacing={2} mt={2}>
            <Button variant='outlined' color='error' onClick={() => navigate(`/admin/section-management`)}>
              Hủy
            </Button>
            <Button variant='outlined' color='primary' onClick={handleUpdate}>
              Lưu
            </Button>
          </Stack>
        </Grid>
        <Grid item md={8} sm={12}>
          <Autocomplete
            sx={{ m: 1 }}
            multiple
            isOptionEqualToValue={(option, value) => option._id === value._id}
            options={allSongs}
            getOptionLabel={(option) => option.title}
            disableCloseOnSelect
            value={(album?.songs || []).filter((song) => song._id !== null) || []}
            onChange={(e, value) => {
              setAblum({
                ...album,
                songs: value
              })
            }}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' label='Songs' placeholder='Select song' />
            )}
          />
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Bài Hát</TableCell>
                  <TableCell align='right'>Thời Lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {album.songs.map((majorsOrder) => {
                  return (
                    <TableRow hover key={majorsOrder._id}>
                      <TableCell>
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
                            <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                              {majorsOrder.title}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align='right'>
                        <Typography variant='subtitle1' color='text.primary' gutterBottom noWrap>
                          {convertToMinutes(majorsOrder.duration)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminEditAlbum
