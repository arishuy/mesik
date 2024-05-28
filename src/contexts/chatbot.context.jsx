// hooks
import { useState } from 'react'

// context
import { createContext } from 'react'

export const ChatbotContext = createContext()

export function ChatbotProvider({ children }) {
  const [openChatbot, setOpenChatbot] = useState(false)
  const [playingSong, setPlayingSong] = useState({})

  return (
    <ChatbotContext.Provider value={{ openChatbot, setOpenChatbot, playingSong, setPlayingSong }}>
      {children}
    </ChatbotContext.Provider>
  )
}
