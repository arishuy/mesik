import React, { useEffect, useState } from 'react'
import { Grid, Typography, Stack, CardMedia, CardContent, CardActions, Button } from '@mui/material'
import LinearProgressWithLabel from '../ProgressBar/ProgressBar'
import IconButton from '@mui/material/IconButton'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { useMusicPlayer } from '../../contexts/music.context'
import ReactJkMusicPlayer from 'react-jinke-music-player'

const MusicPlayer = () => {
  const { currentSong } = useMusicPlayer()
  const [audioLists, setAudioLists] = useState([
    {
      cover: 'https://res.cloudinary.com/dzeer2rgu/image/upload/v1713600642/olnnxkhdkwzpvlqalw8s.jpg',
      duration: 185.304,
      musicSrc: 'https://mesickaudio.s3.ap-southeast-2.amazonaws.com/N%C3%A2ng%20Ch%C3%A9n%20Ti%C3%AAu%20S%E1%BA%A7u',
      singer: 'Bích Phương',
      name: 'Nâng Chén Tiêu Sầu'
    }
  ])
  useEffect(() => {
    setAudioLists(currentSong)
  }, [currentSong])
  return (
    <ReactJkMusicPlayer
      clearPriorAudioLists
      autoPlayInitLoadPlayList
      showDownload={false}
      mode='full'
      toggleMode={false}
      audioLists={audioLists}
    />
    // <Grid container>
    //   <Grid item xs={3}>
    //     <Stack direction='row' spacing={2} sx={{ padding: '10px' }}>
    //       <img src='https://via.placeholder.com/150' alt='album' width='80' height='80' />
    //       <Stack direction='column' spacing={1}>
    //         <Typography variant='h6'>Song Title</Typography>
    //         <Typography variant='subtitle1'>Artist</Typography>
    //       </Stack>
    //     </Stack>
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Stack direction='column' spacing={2} sx={{ padding: '10px' }}>
    //       <Stack direction='row' spacing={3} justifyContent='center' alignItems='center'>
    //         <audio controls autoPlay src={currentSong?.file}></audio>
    //         <IconButton aria-label='previous'>
    //           <SkipPreviousIcon />
    //         </IconButton>
    //         <IconButton
    //           aria-label='play/pause'
    //           sx={{
    //             border: '2px solid'
    //           }}
    //           onClick={() => {}}
    //         >
    //           <PlayArrowIcon />
    //         </IconButton>
    //         <IconButton aria-label='next'>
    //           <SkipNextIcon />
    //         </IconButton>
    //       </Stack>
    //       <Stack direction='row' spacing={2}>
    //         <Typography variant='subtitle1'>00:00</Typography>
    //         <LinearProgressWithLabel />
    //       </Stack>
    //     </Stack>
    //   </Grid>
    //   <Grid
    //     item
    //     xs={3}
    //     sx={{
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center'
    //     }}
    //   >
    //     <Stack direction='row' spacing={2} sx={{ padding: '10px' }}>
    //       <IconButton aria-label='volume'>
    //         <VolumeUpIcon />
    //       </IconButton>
    //       <IconButton aria-label='mute'>
    //         <PlayArrowIcon />
    //       </IconButton>
    //       <IconButton aria-label='random'>
    //         <ShuffleIcon />
    //       </IconButton>
    //     </Stack>
    //   </Grid>
    // </Grid>
  )
}

export default MusicPlayer
