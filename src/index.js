import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './contexts/app.context'
import 'react-jinke-music-player/assets/index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n} defaultNS={'translation'}>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </I18nextProvider>
)
