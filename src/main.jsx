import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToasterProvider from './components/Toaster.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </Provider>
  </StrictMode>,
)
