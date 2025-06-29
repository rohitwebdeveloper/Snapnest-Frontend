import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from 'react-router-dom'
import Applayout from './layouts/Applayout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Album from './pages/Album'
import Document from './pages/Document'
import Screenshot from './pages/Screenshot'
import ImageDetail from './pages/ImageDetail'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from './api/apiConfig'
import { setUser } from './features/auth/authSlice'
import Home from './pages/Home'
import AlbumDetail from './pages/AlbumDetail'


function App() {

  const authstate = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    ; (async () => {
      if (!authstate) {
        try {
          const response = await api.get('/auth/me')
          if (response.status === 200) {
            dispatch(setUser(response.data.user))
            setloading(false)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setloading(false)
        }
      }
    })()
  }, [authstate, dispatch])


  // if(loading) return 


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='' element={<Applayout />} >
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/album' element={<ProtectedRoute><Album /></ProtectedRoute>} />
          <Route path='/document' element={<ProtectedRoute><Document /></ProtectedRoute>} />
          <Route path='/screenshot' element={<ProtectedRoute><Screenshot /></ProtectedRoute>} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/detail/:id' element={<ImageDetail />} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path='/album/:id' element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
      </>

    )
  )

  return (
    <>
      {loading ? (<h1 className='text-3xl text-black text-center'>Loading....</h1>) : (
        <RouterProvider router={router} />
      )}
    </>
  )
}

export default App
