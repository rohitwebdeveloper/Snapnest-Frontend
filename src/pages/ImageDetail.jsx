import React, { useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarIcon from '@mui/icons-material/Star';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import DetailMenu from '../components/DetailMenu';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoInfoSidebar from '../components/PhotoInfoSidebar';
import ShareOption from '../components/ShareOption';
import { usePhotoDetails } from '../hooks/photo/usePhotoDetails';
import { useAddToFavourite, useDeletePhoto, useRemoveFromFavourite } from '../hooks/photo/photoMutation';
import Loader from '../components/Loader';
import Error from '../components/Error';


const ImageDetail = () => {

  const [infovisible, setinfovisible] = useState(false)
  const [detailmenuVisible, setdetailmenuVisible] = useState(false)
  const [shareVisible, setshareVisible] = useState(false)
  const navigate = useNavigate()
  const { photoId } = useParams()

  const { data: photo, isPending, isError, error } = usePhotoDetails(photoId);
  const { mutate: deletePhoto } = useDeletePhoto()
  const { mutate: addToFavourite } = useAddToFavourite()
  const { mutate: removeFromFavourite } = useRemoveFromFavourite()

  const onClose = () => setinfovisible(false)

    if (isPending) return <Loader/>
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'}/>


  return (
    <main className='bg-gray-900 h-screen flex'>
      <div className='w-full' >
        <div className='flex justify-between px-4 text-white py-6 mb-10'>
          <KeyboardBackspaceOutlinedIcon style={{ fontSize: '25px' }} onClick={() => navigate(-1)} />
          <div className='flex gap-5 hover:cursor-pointer '>
            <ShareOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setshareVisible(!shareVisible)} />
            <InfoOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setinfovisible(!infovisible)} />
            {photo?.isFavourite ? <StarIcon style={{ fontSize: '25px' }} onClick={() => removeFromFavourite(photoId)} /> : <StarBorderOutlinedIcon style={{ fontSize: '25px' }} onClick={() => addToFavourite(photoId)} />}
            <DeleteForeverOutlinedIcon style={{ fontSize: '25px' }} onClick={() => deletePhoto(photoId)} />
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

      {shareVisible && <ShareOption imageUrl={photo?.url} onClose={setshareVisible} />}

    </main>
  )
}

export default ImageDetail