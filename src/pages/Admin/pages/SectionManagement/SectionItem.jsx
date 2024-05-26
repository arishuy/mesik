import React, { useState } from 'react'
import { Button, Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../../../contexts/music.context'
import { useTranslation } from 'react-i18next'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'

const SectionItem = ({ section, fetchData }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const handleDelete = async () => {
    await AxiosInterceptors.delete(urlConfig.sections.deleteSection + `/${section._id}`)
      .then((res) => {
        fetchData()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={2}>
          {section.name}
        </Typography>
        <Button variant='contained' color='error' onClick={handleDelete}>
          delete
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {section.items.map((playlist) => (
          <Grid item xs={12} md={6} lg={3} key={playlist._id}>
            <div
              className='song-card'
              onClick={() => {
                navigate(`/playlist/${playlist._id}`)
              }}
            >
              <img className='song-card_image' src={playlist.songs[0]?.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{playlist.songs.length} bài hát</div>
                <div className='song-card_info_album'></div>
                <div className='song-card_info_title'>{playlist.title}</div>
              </div>
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <Tooltip title='Phát ngay'>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        playSong(playlist.songs)
                      }}
                      color='success'
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SectionItem
