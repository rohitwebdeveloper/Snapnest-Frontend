import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import Overlay from './Overlay'

const DetailMenu = ({ setdetailmenuVisible, photoId, photoUrl }) => {

  const [allAlbums, setallAlbums] = useState([])
  const [albumOverlayvisible, setalbumOverlayvisible] = useState(false)
  const [documentOverlayvisible, setdocumentOverlayvisible] = useState(false)
  const documentCategories = [
  'Identity',
  'Payments',
  'Certificates',
  'Notes',
  'Receipts',
  'Events',
  'Reports',
  'Projects',
  'Legal'
];


  useEffect(() => {
    ; (async () => {
      try {
        const response = await api.get('/album/all')
        console.log(response)
        if (response.status === 200) {
          setallAlbums(response.data.albums)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Internal server error');
        console.error(error);
      }
    })()
  }, [])


  const closeAlbumOverlay = () => {
    setalbumOverlayvisible(false)
  }

  const closeDocumentOverlay = () => {
    setdocumentOverlayvisible(false)
  }


  const addToAlbum = async (albumId) => {
    try {
      const response = await api.put('/album/add-photo', { albumId, photoId })
      if (response.status === 200) {
        setdetailmenuVisible(false)
        setalbumOverlayvisible(false)
        toast.success('Image added to album')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }


  const addToScreenshot = async () => {
    try {
      const response = await api.put('/photo/add-screenshot', {photoId})
      if (response.status === 200) {
        setdetailmenuVisible(false)
        setalbumOverlayvisible(false)
        toast.success('Added to screenshots')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }



  const addToDocument = async (category) => {
      try {
      const response = await api.post('/document/add', {photoId, category})
      if (response.status === 201) {
        setdetailmenuVisible(false)
        setdocumentOverlayvisible(false)
        toast.success('Added to document')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal server error')
    }
  }


const download = async () => {
  const response = await fetch(photoUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'snapnest-image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};





  return (
    <>
      <ul className='rounded-md bg-white text-gray-800  w-52 font-medium absolute right-1 top-20 '>
        <li className='p-3 text-right'> <CloseIcon className='hover:bg-gray-200' onClick={() => setdetailmenuVisible(false)} /> </li>
        <li onClick={() => setalbumOverlayvisible(true)} className='p-3 hover:bg-blue-50'>Add to album</li>
        <li onClick={() => setdocumentOverlayvisible(true)} className='p-3 hover:bg-blue-50'>Add to document</li>
        <li onClick={addToScreenshot} className='p-3 hover:bg-blue-50'>Add to screenshot</li>
        <li onClick={download} className='p-3 hover:bg-blue-50'>Download</li>
      </ul>

      {/* Select album overlay */}
      {!!albumOverlayvisible &&
        <Overlay title='Add to' onClose={closeAlbumOverlay} >
          <section className=' flex flex-col items-start overflow-auto h-56 '>
            {allAlbums?.map((albumitem, i) => {
              return <button onClick={() => addToAlbum(albumitem._id)} key={i} className='hover:bg-gray-200 w-full text-base font-medium text-gray-700 text-left px-11 py-1' > {albumitem.albumname} <br />
                <span className='text-gray-600 text-sm'>{albumitem.createdAt.slice(0, 10)}</span>
              </button>
            })}
          </section>
        </Overlay>
      }

      {/* Select document category overlay */}
      {!!documentOverlayvisible &&
        <Overlay title='Add to' onClose={closeDocumentOverlay} >
          <section className=' flex flex-col items-start overflow-auto h-56 '>
            {documentCategories?.map((docitem, i) => {
              return <button onClick={() => addToDocument(docitem)} key={i} className='hover:bg-gray-200 w-full text-base font-medium text-gray-700 text-left px-11 py-2' > {docitem} <br />
                {/* <span className='text-gray-600 text-sm'>{albumitem.createdAt.slice(0, 10)}</span> */}
              </button>
            })}
          </section>
        </Overlay>
      }
    </>
  )
}

export default DetailMenu