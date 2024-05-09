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
  const chatContentRef = React.useRef(null)
  const mockData = [
    {
      id: 1,
      message: 'Làm quá nó ô dề.'
    },
    {
      id: 2,
      message: 'U là trời.'
    },
    {
      id: 3,
      message: 'Còn cái nịt.'
    },
    {
      id: 4,
      message: 'Tấm chiếu mới.'
    },
    {
      id: 5,
      message: 'Xu cà na.'
    },
    {
      id: 6,
      message: 'Mình không sinh ra để đi làm, bạn cũng thế!'
    },
    {
      id: 7,
      message: 'Game On Baby, Game On!'
    },
    {
      id: 8,
      message: 'Con trai bà bán bánh mì.'
    },
    {
      id: 9,
      message: 'Kiwi kiwi.'
    },
    {
      id: 10,
      message: 'Gwenchana.'
    },
    {
      id: 11,
      message: 'Kiếp nạn thứ 82.'
    },
    {
      id: 12,
      message: 'Mãi mận mãi keo.'
    },
    {
      id: 13,
      message: 'Slay.'
    },
    {
      id: 14,
      message: 'Uwu.'
    },
    {
      id: 15,
      message: 'Mắc cỡ quá 2 ơi!'
    },
    {
      id: 16,
      message: 'Hay ra dẻ quá à!'
    },
    {
      id: 17,
      message: 'Bật chế độ bay lên.'
    },
    {
      id: 18,
      message: 'Làm cục cưng hong bé ơi.'
    },
    {
      id: 19,
      message: 'Bé ơi từ từ.'
    },
    {
      id: 20,
      message: 'Mai đẹt ti ni.'
    },
    {
      id: 21,
      message: 'Bing Chilling.'
    },
    {
      id: 22,
      message: 'Hê sờ lô hơ sờ ly ly.'
    },
    {
      id: 23,
      message: 'Bất ngờ chưa bà già.'
    },
    {
      id: 24,
      message: 'Oải cả chưởng.'
    },
    {
      id: 25,
      message: 'Cưng vô lây.'
    },
    {
      id: 26,
      message: 'Pressing.'
    },
    {
      id: 27,
      message: 'Red flag.'
    },
    {
      id: 28,
      message: 'Cà nhính, cà nhính.'
    },
    {
      id: 29,
      message: 'Hong bé ơi.'
    },
    {
      id: 30,
      message: 'Ét o Ét (SOS).'
    },
    {
      id: 31,
      message: 'Thử thách 6 ngày 6 đêm.'
    },
    {
      id: 32,
      message: '10 điểm.'
    },
    {
      id: 33,
      message: 'Vì mình quá thích cậu rồi phải làm sao phải làm sao.'
    },
    {
      id: 34,
      message: 'Cứu tôi trời ơi trời ơi cứu tôi.'
    },
    {
      id: 35,
      message: 'Tôi năm nay 70 tuổi mà chưa gặp trường hợp nào như này.'
    },
    {
      id: 36,
      message: 'Nghèo cho sạch, rách cho sexy.'
    },
    {
      id: 37,
      message: 'Đúng nhận sai cãi.'
    },
    {
      id: 38,
      message: 'Flex.'
    },
    {
      id: 39,
      message: 'Over hợp.'
    },
    {
      id: 40,
      message: 'Dữ chưa?'
    },
    {
      id: 41,
      message: 'Cíu bé.'
    },
    {
      id: 42,
      message: 'Kiểm tra người.'
    },
    {
      id: 43,
      message: 'Anh cho em mượn cái kéo. Để em làm gì?... Cắt đôi nỗi sầu.'
    },
    {
      id: 44,
      message: 'Ảnh chất lượng thấp, nhưng em thì chất lượng cao.'
    },
    {
      id: 45,
      message: 'Cắm sừng ai đừng cắm sừng em. Cơm sườn hay cơm tấm chứ anh đừng cơm sườn em.'
    },
    {
      id: 46,
      message: 'Dịu dàng thì em không thiếu, nhưng chủ yếu là em không thích anh.'
    },
    {
      id: 47,
      message: 'Biết ông Thương không?'
    },
    {
      id: 48,
      message: "You don't hợp with me."
    },
    {
      id: 49,
      message: 'Lần đầu tiên trái thanh long có trong mỳ tôm…'
    },
    {
      id: 50,
      message: 'Tôi thất bại rồi mọi người ạ.'
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
    scrollToBottom()
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

  React.useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
    }
  }, [messages])
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
          ref={chatContentRef}
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
                  width: 'fit-content',
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
