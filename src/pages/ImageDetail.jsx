import React, { useState, useEffect } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import DetailMenu from '../components/DetailMenu';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import PhotoInfoSidebar from '../components/PhotoInfoSidebar';


const ImageDetail = () => {

  const [infovisible, setinfovisible] = useState(false)
  const [detailmenuVisible, setdetailmenuVisible] = useState(false)
  const navigate = useNavigate()
  const [photo, setphoto] = useState(null)
  const { photoId } = useParams()


  useEffect(() => {
    ; (async () => {
      if (!photoId) {
        navigate(-1)
        return
      }

      try {
        const response = await api.get(`/photo/${photoId}`);
        if (response.status === 200) {
          setphoto(response.data.photo);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Internal server error')
      }
    })()

  }, [photoId]);


  const onClose = () => {
    setinfovisible(false)
  }



  return (
    <main className='bg-gray-900 h-screen flex'>
      <div className='w-full' >
        <div className='flex justify-between px-4 text-white py-6 mb-10'>
          <KeyboardBackspaceOutlinedIcon style={{ fontSize: '25px' }} onClick={() => navigate(-1)} />
          <div className='flex gap-5 '>
            <ShareOutlinedIcon style={{ fontSize: '25px' }} />
            <InfoOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setinfovisible(!infovisible)} />
            <StarBorderOutlinedIcon style={{ fontSize: '25px' }} />
            <DeleteForeverOutlinedIcon style={{ fontSize: '25px' }} />
            <MoreVertOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setdetailmenuVisible(!detailmenuVisible)} />
          </div>
        </div>
        <figure className=' bg-transparent flex justify-center '>
          <img src={photo?.url} alt="Photo"
            className='max-h-[70vh] rounded-sm'
          />
        </figure>
      </div>
      {
        infovisible &&
        <PhotoInfoSidebar photo={photo} onClose={onClose} />
      }
      {
        detailmenuVisible &&
        <DetailMenu setdetailmenuVisible={setdetailmenuVisible} photoId={photoId} photoUrl={photo.url} />
      }
    </main>
  )
}

export default ImageDetail