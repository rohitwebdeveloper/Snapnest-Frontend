import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToasterProvider from './components/Toaster.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENTID}>
      <QueryClientProvider client={queryClient} >
        <Provider store={store}>
          <ToasterProvider>
            <App />
          </ToasterProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
