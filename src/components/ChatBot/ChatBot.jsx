import * as React from 'react'
import { ChatbotContext } from '../../contexts/chatbot.context'
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'

export default function ChatBot() {
  const { openChatbot, setOpenChatbot } = React.useContext(ChatbotContext)
  return (
    openChatbot && (
      <Card
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 15,
          zIndex: 9999,
          height: '450px',
          width: '350px',
          backgroundColor: 'white'
        }}
      >
        <CardHeader
          title={
            <Stack direction='row' spacing={2} alignItems='center'>
              <Avatar
                alt='logo'
                src='https://th.bing.com/th/id/OIG1.4gYx47L7n1GpDyVqrk3m?w=1024&h=1024&rs=1&pid=ImgDetMain'
                sx={{ width: 40, height: 40 }}
              />
              <Typography variant='h4'>Mesik Bot</Typography>
            </Stack>
          }
          action={
            <IconButton onClick={() => setOpenChatbot(false)}>
              <CloseIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent
          sx={{
            height: '290px'
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            Tính năng đang được phát triển!
          </Typography>
        </CardContent>
        <Divider />
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1
          }}
        >
          <TextField id='outlined-basic' label='Chat với chúng tôi ...' variant='outlined' fullWidth />
          <IconButton
            color='primary'
            sx={{
              ml: 1
            }}
          >
            <SendIcon />
          </IconButton>
        </CardContent>
      </Card>
    )
  )
}
