import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { ChatbotContext } from '../../contexts/chatbot.context'
import { Box, Grid } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ChatBot() {
  const isMobile = useResponsive('down', 'sm')
  const { openChatbot, setOpenChatbot, playingSong, setPlayingSong } = React.useContext(ChatbotContext)

  const handleClose = () => {
    setOpenChatbot(false)
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openChatbot}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          backgroundColor: 'transparent',
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(15px)'
          }
        }}
      >
        <AppBar sx={{ position: 'relative', background: 'transparent' }}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: '100%',
            pt: 5,
            color: 'white',
            backgroundColor: 'transparent'
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              md={4}
              sm={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 'auto'
              }}
            >
              <img
                src={playingSong.cover ? playingSong.cover : 'https://via.placeholder.com/300'}
                alt='album'
                width='350'
                style={{
                  borderRadius: '10px'
                }}
              />
              <Typography variant='h3'>{playingSong.name}</Typography>
              <Typography
                variant='h5'
                sx={{
                  color: 'lightgray'
                }}
              >
                {playingSong.singer}
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              sm={12}
              sx={{
                maxHeight: isMobile ? 'none' : '800px',
                overflowY: 'auto',
                height: '100%'
              }}
            >
              {playingSong?.lyric ? (
                <Typography variant='h3' component='div' pl={isMobile ? 1 : 0}>
                  {playingSong?.lyric?.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              ) : (
                <div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mx: 'auto'
                  }}
                >
                  <Typography variant='h3' component='div'>
                    Không có lời bài hát
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
