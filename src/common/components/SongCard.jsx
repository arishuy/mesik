import React from 'react'
import { Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'

const SongCard = ({ song }) => {
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }

  return (
    <Card
      sx={{
        padding: '20px',
        '&:hover': {
          backgroundColor: '#f0f0f0',
          cursor: 'pointer',
          transform: 'scale(1.05)'
        }
      }}
      key={song.id}
      onClick={() => handleSongClick(song)}
    >
      <img src={song.photo_url} alt='album' width='250px' />
      <Typography
        variant='h6'
        pt={2}
        noWrap
        sx={{
          width: '200px'
        }}
      >
        {song.title}
      </Typography>
      <Typography
        variant='body2'
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/artist/${song.artist._id}`)
        }}
      >
        {' '}
        {song.artist.user.first_name} {song.artist.user.last_name}
      </Typography>
      <Typography variant='subtitle2'>{song.play_count} lượt nghe</Typography>
    </Card>
  )
}

export default SongCard
