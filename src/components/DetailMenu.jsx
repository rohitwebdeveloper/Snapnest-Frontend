import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Overlay from './Overlay'
import { useAddToAlbum } from '../hooks/album/albumMutation';
import { useAddToScreenshot } from '../hooks/photo/photoMutation';
import { useAddToDocument } from '../hooks/document/documentMutation';
import { useAllAlbums } from '../hooks/album/albumQuery';


const DetailMenu = ({ setdetailmenuVisible, photoId, photoUrl }) => {

  const [albumOverlayvisible, setalbumOverlayvisible] = useState(false)
  const [documentOverlayvisible, setdocumentOverlayvisible] = useState(false)
  const documentCategories = ['Identity', 'Payments', 'Certificates', 'Notes', 'Receipts', 'Events', 'Reports', 'Projects', 'Legal'];

  const { isPending, isError, error, data: allAlbums } = useAllAlbums()
  const { mutate: addPhotoToAlbum } = useAddToAlbum()
  const { mutate: addPhotoToScreenshot } = useAddToScreenshot()
  const { mutate: addPhotoToDocument } = useAddToDocument()

  const closeAlbumOverlay = () => setalbumOverlayvisible(false)
  const closeDocumentOverlay = () => setdocumentOverlayvisible(false)


  const addToAlbum = (albumId) => {
    addPhotoToAlbum({ albumId, photoId }, {
      onSuccess: () => {
        setdetailmenuVisible(false)
        setalbumOverlayvisible(false)
      }
    })
  }

  const addToScreenshot = async () => {
    addPhotoToScreenshot(photoId, {
      onSuccess: () => {
        setdetailmenuVisible(false)
        setalbumOverlayvisible(false)
      }
    })
  }

  const addToDocument = async (category) => {
    addPhotoToDocument({ photoId, category }, {
      onSuccess: () => {
        setdetailmenuVisible(false)
        setdocumentOverlayvisible(false)
      }
    })
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
      <ul className='rounded-md bg-white dark:bg-gray-800 text-gray-800  dark:text-gray-100 text-xs sm:text-sm md:text-base w-32 sm:w-40 md:w-48 font-medium absolute right-1 top-20 '>
        <li className='px-3 pt-3 text-right'>
          <CloseIcon className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer' onClick={() => setdetailmenuVisible(false)} />
        </li>
        <li onClick={() => setalbumOverlayvisible(true)} className='p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700'>Add to album</li>
        <li onClick={() => setdocumentOverlayvisible(true)} className='p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700'>Add to document</li>
        <li onClick={addToScreenshot} className='p-3 hover:bg-blue-50 cursor-pointer dark:hover:bg-gray-700'>Add to screenshot</li>
        <li onClick={download} className='p-3 hover:bg-blue-50 cursor-pointer dark:hover:bg-gray-700'>Download</li>
      </ul>

      {/* Select album overlay */}
      {!!albumOverlayvisible &&
        <Overlay title='Add to' onClose={closeAlbumOverlay}>
          <section className='flex flex-col items-start overflow-auto h-56 '>
            {isPending && <h2 className='text-center font-medium text-gray-800 dark:text-gray-200'>Just a moment...</h2>}
            {isError && <h2 className='text-center font-medium text-gray-800 dark:text-gray-200'>Failed to get albums</h2>}
            {allAlbums.length === 0 && <h2 className='text-center w-full mt-[18%] font-medium text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200'>No Albums !</h2>}
            {allAlbums.length !== 0 && allAlbums?.map((albumitem, i) => (
              <button
                onClick={() => addToAlbum(albumitem._id)}
                key={i}
                className='hover:bg-gray-200 dark:hover:bg-gray-700 w-full cursor-pointer text-base font-medium text-gray-700 dark:text-gray-100 text-left px-11 py-1'
              >
                {albumitem.albumname} <br />
                <span className='text-gray-600 dark:text-gray-400 text-sm'>{albumitem.createdAt.slice(0, 10)}</span>
              </button>
            ))}
          </section>
        </Overlay>
      }

      {/* Select document category overlay */}
      {!!documentOverlayvisible &&
        <Overlay title='Add to' onClose={closeDocumentOverlay}>
          <section className='flex flex-col items-start overflow-auto h-56'>
            {documentCategories?.map((docitem, i) => (
              <button
                onClick={() => addToDocument(docitem)}
                key={i}
                className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer w-full text-base font-medium text-gray-700 dark:text-gray-100 text-left px-11 py-2'
              >
                {docitem}
              </button>
            ))}
          </section>
        </Overlay>
      }

    </>
  )
}

export default DetailMenu