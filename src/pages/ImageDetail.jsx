import React, { useState, useEffect } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarIcon from '@mui/icons-material/Star';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import DetailMenu from '../components/DetailMenu';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import PhotoInfoSidebar from '../components/PhotoInfoSidebar';
import ShareOption from '../components/ShareOption';
import { FlashOnOutlined } from '@mui/icons-material';
import Overlay from '../components/Overlay';


const ImageDetail = () => {

  const [infovisible, setinfovisible] = useState(false)
  const [detailmenuVisible, setdetailmenuVisible] = useState(false)
  const [shareVisible, setshareVisible] = useState(false)
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


  const deletePhoto = async () => {
    if (!photoId) {
      toast('Photo is required to delete')
    }
    try {
      const response = await api.delete(`photo/delete/${photoId}`)
      if (response.status === 200) {
        toast.success('Photo deleted')
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }


  const addToFavourite = async () => {
    try {
      const response = await api.patch(`/photo/${photoId}/favourite`)
      console.log(response)
      if (response.status === 200) {
        setphoto(response.data.photo)
        toast.success('Add to favourites')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }


  const removeFromFavourite = async () => {
    try {
      const response = await api.patch(`/photo/${photoId}/unfavourite`)
      console.log(response)
      if (response.status === 200) {
        setphoto(response.data.photo)
        toast.success('Removed from favourites')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }


  // const onShare = async



  return (
    <main className='bg-gray-900 h-screen flex'>
      <div className='w-full' >
        <div className='flex justify-between px-4 text-white py-6 mb-10'>
          <KeyboardBackspaceOutlinedIcon style={{ fontSize: '25px' }} onClick={() => navigate(-1)} />
          <div className='flex gap-5 '>
            <ShareOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setshareVisible(!shareVisible)} />
            <InfoOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setinfovisible(!infovisible)} />
            {photo?.isFavourite ? <StarIcon style={{ fontSize: '25px' }} onClick={removeFromFavourite} /> : <StarBorderOutlinedIcon style={{ fontSize: '25px' }} onClick={addToFavourite} />}
            <DeleteForeverOutlinedIcon style={{ fontSize: '25px' }} onClick={deletePhoto} />
            <MoreVertOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setdetailmenuVisible(!detailmenuVisible)} />
          </div>
        </div>
        <figure className=' bg-transparent flex justify-center '>
          <img src={photo?.url} alt="Photo"
            className='max-h-[70vh] rounded-sm'
          />
        </figure>
      </div>

      {infovisible && <PhotoInfoSidebar photo={photo} onClose={onClose} />}

      {detailmenuVisible && <DetailMenu setdetailmenuVisible={setdetailmenuVisible} photoId={photoId} photoUrl={photo.url} />}

      {shareVisible &&  <ShareOption imageUrl={photo?.url} onClose={setshareVisible} /> }

    </main>
  )
}

export default ImageDetail