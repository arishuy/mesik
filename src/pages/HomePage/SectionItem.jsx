import React from 'react'
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'

const SectionItem = ({ section }) => {
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  return (
    <div>
      <Typography variant='h4' py={3}>
        {section.name}
      </Typography>
      <Grid container spacing={2}>
        {section.items.map((playlist) => (
          <Grid item xs={12} md={6} lg={3} key={playlist._id}>
            <div
              className='song-card'
              onClick={() => {
                navigate(`/album/${playlist._id}`)
              }}
            >
              <img className='song-card_image' src={playlist.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <Tooltip title='Phát ngay'>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        playSong(playlist.songs, false)
                      }}
                      color='success'
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </div>
            </div>
            <Typography variant='h6' sx={{ textAlign: 'left', color: 'gray', py: 1, ml: 1 }}>
              {playlist.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SectionItem
