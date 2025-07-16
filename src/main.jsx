import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ToasterProvider from './components/Toaster.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <ToasterProvider>
          <App />
        </ToasterProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
