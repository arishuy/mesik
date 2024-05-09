import * as React from 'react'
import { ChatbotContext } from '../../contexts/chatbot.context'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'

export default function ChatBot() {
  const { openChatbot, setOpenChatbot } = React.useContext(ChatbotContext)
  const [threadId, setThreadId] = React.useState('')
  const mockData = [
    {
      id: 1,
      message: 'Nhà ngươi là ai?'
    },
    {
      id: 2,
      message: 'Hông biết, hỏi lại đi :D'
    },
    {
      id: 3,
      message: 'Hôm nay bạn khỏe không?'
    },
    {
      id: 4,
      message: 'Sao bạn lại tìm bài hát có lời thế này?'
    },
    {
      id: 5,
      message: 'Trời hôm nay nhiều mây quá, bạn thấy sao?'
    },
    {
      id: 6,
      message: 'Cái gì đó vừa rơi từ trên trời xuống đây!'
    },
    {
      id: 7,
      message: 'Hôm nay là ngày gì vậy nhỉ?'
    },
    {
      id: 8,
      message: 'Bạn có tin vào ma quỷ không?'
    },
    {
      id: 9,
      message: 'Sao mà nắng quá trời, tôi muốn làm gì đó vui vẻ!'
    },
    {
      id: 10,
      message: 'Bạn có thích ăn bánh mì không?'
    },
    {
      id: 11,
      message: 'Ai đang truyền thông tin mạng nhanh nhất hôm nay?'
    },
    {
      id: 12,
      message: 'Sao mà sáng nay tôi thức dậy sớm thế nhỉ?'
    },
    {
      id: 13,
      message: 'Nghỉ hè này bạn có kế hoạch gì không?'
    },
    {
      id: 14,
      message: 'Hôm nay trời có mưa không?'
    },
    {
      id: 15,
      message: 'Bạn thích đọc sách không?'
    },
    {
      id: 16,
      message: 'Sao mà hôm nay mọi người im lặng thế nhỉ?'
    },
    {
      id: 17,
      message: 'Bạn đã từng bay lượn trên mây chưa?'
    },
    {
      id: 18,
      message: 'Làm thế nào để làm bạn cười đây?'
    },
    {
      id: 19,
      message: 'Bạn có nhớ giấc mơ của mình không?'
    },
    {
      id: 20,
      message: 'Sao mà bạn thích trò chơi điện tử nhỉ?'
    },
    {
      id: 21,
      message: 'Hôm nay bạn đã làm gì chưa?'
    },
    {
      id: 22,
      message: 'Con mèo nhà bạn tên gì vậy?'
    },
    {
      id: 23,
      message: 'Tôi có thể gửi cho bạn một hình ảnh về gì đó không?'
    },
    {
      id: 24,
      message: 'Bạn đã từng thấy ma chưa?'
    },
    {
      id: 25,
      message: 'Sao mà cà phê hôm nay ngon thế nhỉ?'
    },
    {
      id: 26,
      message: 'Mưa rơi nhẹ nhàng, bạn có thích không?'
    },
    {
      id: 27,
      message: 'Hôm nay bạn sẽ làm gì vào buổi tối?'
    },
    {
      id: 28,
      message: 'Trời nóng quá, bạn muốn đi tắm biển không?'
    },
    {
      id: 29,
      message: 'Bạn thích ăn kem không?'
    },
    {
      id: 30,
      message: 'Bạn đã từng thấy UFO chưa?'
    },
    {
      id: 31,
      message: 'Mùa hè này bạn muốn đi đâu chơi?'
    },
    {
      id: 32,
      message: 'Có phải bạn thích chơi game không?'
    },
    {
      id: 33,
      message: 'Sao mà ngày hôm nay có vẻ đẹp quá nhỉ?'
    },
    {
      id: 34,
      message: 'Bạn có thích hoa không?'
    },
    {
      id: 35,
      message: 'Hôm nay là sinh nhật của ai vậy?'
    },
    {
      id: 36,
      message: 'Bạn có thích xem phim không?'
    },
    {
      id: 37,
      message: 'Sao mà bạn thích màu xanh lá cây vậy?'
    },
    {
      id: 38,
      message: 'Bạn đã từng nấu ăn chưa?'
    },
    {
      id: 39,
      message: 'Mùa đông này bạn muốn có một chiếc ôm ấm không?'
    },
    {
      id: 40,
      message: 'Bạn có thích thú cưng không?'
    },
    {
      id: 41,
      message: 'Hôm nay trời se lạnh, bạn muốn uống trà không?'
    },
    {
      id: 42,
      message: 'Sao mà cái đồng hồ của bạn đẹp quá vậy nhỉ?'
    },
    {
      id: 43,
      message: 'Bạn có thích hát hò không?'
    },
    {
      id: 44,
      message: 'Bạn đã từng gặp phải tai nạn giao thông chưa?'
    },
    {
      id: 45,
      message: 'Sao mà hôm nay có vẻ buồn buồn nhỉ?'
    },
    {
      id: 46,
      message: 'Bạn đã từng bay lượn trên mặt nước chưa?'
    },
    {
      id: 47,
      message: 'Bạn thích đi du lịch không?'
    },
    {
      id: 48,
      message: 'Mùa xuân này bạn muốn làm gì?'
    },
    {
      id: 49,
      message: 'Bạn có thích trời mưa không?'
    },
    {
      id: 50,
      message: 'Hôm nay là ngày quốc tế gì vậy?'
    }
  ]

  const [messages, setMessages] = React.useState([
    {
      message:
        'Xin chào, tôi là Mesik Bot, tôi có thể giúp bạn tìm kiếm bài hát thông qua lời bài hát mà bạn cung cấp. Hãy thử nhập một đoạn lời bài hát bạn nhớ để tôi giúp bạn nhé!',
      sender: 'bot'
    }
  ])
  const [input, setInput] = React.useState('')
  const handleAddMessage = async () => {
    if (input === '') return
    setMessages([...messages, { message: input, sender: 'user' }])
    setInput('')
    scrollToBottom()
    // Call API to get response from bot
    // await AxiosInterceptors.post(urlConfig.chatbot.chat, {
    //   threadId: threadId,
    //   message: input
    // })
    //   .then((res) => {
    //     if (res && res.status === 200) {
    //       setMessages([
    //         ...messages,
    //         { message: input, sender: 'user' },
    //         { message: `Bài hát bạn muốn tìm là: ${res.data.songName}`, sender: 'bot' }
    //       ])
    //       scrollToBottom()
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    const randomIndex = Math.floor(Math.random() * mockData.length)
    setMessages([
      ...messages,
      { message: input, sender: 'user' },
      { message: mockData[randomIndex].message, sender: 'bot' }
    ])
  }
  const createThread = async () => {
    // Call API to create thread
    // await AxiosInterceptors.get(urlConfig.chatbot.createThread)
    //   .then((res) => {
    //     if (res && res.status === 200) {
    //       setThreadId(res.data.thread.id)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    setThreadId('1')
  }
  const scrollToBottom = () => {
    const chatbot = document.getElementById('chatbot-content')
    chatbot.scrollTop = chatbot.scrollHeight
  }
  console.log(threadId)
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
            height: '290px',
            maxHeight: '290px',
            overflowY: 'auto'
          }}
          id='chatbot-content'
        >
          <Typography variant='subtitle2' color='text.secondary'>
            Tính năng đang được phát triển!
          </Typography>
          {messages.map((message) => (
            <Stack
              direction='column'
              spacing={1}
              sx={{ mt: 1 }}
              alignItems={message.sender === 'bot' ? 'flex-start' : 'flex-end'}
            >
              <Chip
                sx={{
                  height: 'auto',
                  width: '80%',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal'
                  },
                  p: 1,
                  textAlign: 'left'
                }}
                label={message.message}
                color={message.sender !== 'bot' ? 'primary' : 'default'}
              />
            </Stack>
          ))}
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
          {threadId ? (
            <>
              <input
                type='text'
                placeholder='Nhập tin nhắn'
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '20px'
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddMessage()
                  }
                }}
              />
              <IconButton
                color='primary'
                sx={{
                  ml: 1
                }}
                onClick={handleAddMessage}
              >
                <SendIcon />
              </IconButton>
            </>
          ) : (
            <Button onClick={() => createThread()}>Bắt đầu</Button>
          )}
        </CardContent>
      </Card>
    )
  )
}
