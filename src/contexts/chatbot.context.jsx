// hooks
import { useState } from 'react'

// context
import { createContext } from 'react'

export const ChatbotContext = createContext()

export function ChatbotProvider({ children }) {
  const [openChatbot, setOpenChatbot] = useState(false)

  return <ChatbotContext.Provider value={{ openChatbot, setOpenChatbot }}>{children}</ChatbotContext.Provider>
}
