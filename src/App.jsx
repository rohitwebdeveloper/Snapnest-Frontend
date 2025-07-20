import { useEffect, useState } from 'react'
import { api } from './api/apiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './features/auth/authSlice'
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
import Home from './pages/Home'
import AlbumDetail from './pages/AlbumDetail'
import Favourites from './pages/Favourites'
import DocumentDetail from './pages/DocumentDetail'
import Recently from './pages/Recently'
import Places from './pages/Places'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './components/NotFound'
import Loader from './components/Loader'
import HelpAndFeedback from './pages/HelpAndFeedback'




function App() {

  const authstate = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const thememode = useSelector((state) => state.theme)


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
        } finally {
          setloading(false)
        }
      }
    })()
  }, [authstate, dispatch])


  useEffect(() => {
    document.querySelector('html').classList.add(thememode)
  }, [thememode])




  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='' element={<Applayout />} >
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/album' element={<ProtectedRoute><Album /></ProtectedRoute>} />
          <Route path='/document' element={<ProtectedRoute><Document /></ProtectedRoute>} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/photo/:photoId' element={<ImageDetail />} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path='/album/:albumname/:id' element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
        <Route path='/screenshot' element={<ProtectedRoute><Screenshot /></ProtectedRoute>} />
        <Route path='/favourites' element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
        <Route path='/document/:category' element={<ProtectedRoute><DocumentDetail /></ProtectedRoute>} />
        <Route path='/recently-added' element={<ProtectedRoute><Recently /></ProtectedRoute>} />
        <Route path='/places' element={<ProtectedRoute><Places /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/help-feedback' element={<HelpAndFeedback />} />
        <Route path='/*' element={<NotFound />} />
      </>

    )
  )

  return (
    <>
      {loading ? (<Loader />) : (
        <RouterProvider router={router} />
      )}
    </>
  )
}

export default App
