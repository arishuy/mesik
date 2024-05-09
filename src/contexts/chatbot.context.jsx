// hooks
import { useState, useContext } from 'react'

// context
import { createContext } from 'react'

import AxiosInterceptors from '../common/utils/axiosInterceptors'
import urlConfig from '../config/UrlConfig'

function displayChatbot(open) {}

export const ChatbotContext = createContext()

export function ChatbotProvider({ children }) {
  const [openChatbot, setOpenChatbot] = useState(false)

  return <ChatbotContext.Provider value={{ openChatbot, setOpenChatbot }}>{children}</ChatbotContext.Provider>
}
