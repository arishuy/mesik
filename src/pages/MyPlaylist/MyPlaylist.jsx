import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button, Stack, IconButton } from '@mui/material'
import AddNewPlaylist from './AddNewPlaylist'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import DeleteConfirm from './DeleteConfirm'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import img_default from '../../assets/images/album_default.png'
import moment from 'moment'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import EditPlaylist from './EditPlaylist'
import Snackbar from '../../common/components/SnackBar'

const MyPlaylist = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigation = useNavigate()
  const { playSong } = useMusicPlayer()
  const [playlists, setPlaylists] = useState([])
  const [openDelete, setOpenDelete] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [id, setId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [item, setItem] = useState({})

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setPlaylists(res.data.playlists)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const checkPermission = () => {
    if (!user) {
      navigation('/login')
    }
  }
  useEffect(() => {
    checkPermission()
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
        <title>Playlist</title>
      </Helmet>
      <Snackbar />
      {openAdd && <AddNewPlaylist open={openAdd} handleClose={() => setOpenAdd(false)} fetchData={fetchData} />}
      {openEdit && (
        <EditPlaylist open={openEdit} handleClose={() => setOpenEdit(false)} fetchData={fetchData} item={item} />
      )}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} fetchData={fetchData} id={id} />}
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>Playlist của tôi</Typography>
        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}>
          Tạo playlist mới
        </Button>
      </Box>
      {playlists.length === 0 && <Empty message={'Bạn chưa có playlist nào'} />}
      <Grid container spacing={3}>
        {playlists?.map((playlist) => (
          <Grid item xs={12} md={6} lg={3} key={playlist.id}>
            <div className='song-card'>
              <img
                className='song-card_image'
                src={playlist.songs[0]?.photo_url || img_default}
                alt='David Bowie - Aladdin Sane'
              />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{playlist.songs.length} bài hát</div>
                <div className='song-card_info_album'>
                  {' '}
                  {moment(playlist.createdAt).format('DD/MM/YYYY')} - {moment(playlist.createdAt).format('HH:mm')}
                </div>
                <div className='song-card_info_title'>{playlist.title}</div>
              </div>
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <IconButton onClick={() => playSong(playlist.songs)} color='success'>
                    <PlayCircleFilledWhiteOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => navigation(`/playlist/${playlist._id}`)} color='primary'>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setItem(playlist)
                      setOpenEdit(true)
                    }}
                    color='warning'
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setId(playlist._id)
                      setOpenDelete(true)
                    }}
                    color='error'
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyPlaylist
