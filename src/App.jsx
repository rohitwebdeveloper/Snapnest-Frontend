import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from 'react-router-dom'
import Applayout from './layouts/Applayout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Album from './pages/Album'
import Document from './pages/Document'
import Screenshot from './pages/Screenshot'
import ImageDetail from './pages/ImageDetail'
import Account from './pages/Account'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='' element={<Applayout />} >
        <Route path='/album' element={<Album/>} />
        <Route path='/document' element={<Document/>} />
        <Route path='/screenshot' element={<Screenshot/>} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/detail'  element={<ImageDetail/>} />
        <Route path='/account'  element={<Account/>} />
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
