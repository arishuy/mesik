import React from 'react'
import { Grid, Typography, Stack, CardMedia, CardContent, CardActions, Button } from '@mui/material'
import LinearProgressWithLabel from '../ProgressBar/ProgressBar'
import IconButton from '@mui/material/IconButton'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const MusicPlayer = () => {
  return (
    <Grid container>
        <Grid item xs={3}>
            <Stack direction='row' spacing={2} sx={{ padding: '10px' }}>
                <img src='https://via.placeholder.com/150' alt='album' width='80' height='80'/>
                <Stack direction='column' spacing={1}>
                <Typography variant='h6'>Song Title</Typography>
                <Typography variant='subtitle1'>Artist</Typography>
                </Stack>
            </Stack>
        </Grid>
        <Grid item xs={6}>
            <Stack direction='column' spacing={2} sx={{ padding: '10px' }}>
            <Stack direction='row' spacing={3} justifyContent="center" alignItems="center" >
            <IconButton aria-label="previous">
                <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause" sx={{
                        border: '2px solid',    
                    }}>
                <PlayArrowIcon />
                    </IconButton>
                    <IconButton aria-label="next">
                <SkipNextIcon />
                    </IconButton>
            </Stack>
            <Stack direction='row' spacing={2}>
                <Typography variant='subtitle1'>00:00</Typography>
                <LinearProgressWithLabel />
            </Stack>
            </Stack>
        </Grid>
        <Grid item xs={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack direction='row' spacing={2} sx={{ padding: '10px' }}  >
                <IconButton aria-label="volume">
                <VolumeUpIcon />
                </IconButton>
                <IconButton aria-label="mute">
                <PlayArrowIcon />
                </IconButton>
                <IconButton aria-label="random">
                <ShuffleIcon />
                </IconButton>
            </Stack>
            </Grid>
    </Grid>
  )
}

export default MusicPlayer