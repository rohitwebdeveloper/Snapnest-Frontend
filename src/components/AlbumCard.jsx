import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import Overlay from './Overlay';
import { useDeleteAlbum } from '../hooks/album/albumMutation';
import { useRenameAlbum } from '../hooks/album/albumMutation';



const AlbumCard = ({ albumitem, index }) => {

  const [isVisible, setisVisible] = useState(false)
  const [albumId, setalbumId] = useState('')
  const [newname, setNewname] = useState('');
  const [renameOverlayVisible, setrenameOverlayVisible] = useState(false)
  const { mutate: albumDelete } = useDeleteAlbum(setisVisible)
  const { mutate: albumRename } = useRenameAlbum(setisVisible)


  // Handle deletion of Album
  const deleteAlbum = (albumId, event) => {
    event.preventDefault()
    event.stopPropagation()
    albumDelete(albumId)
  };

  const renameAlbum = (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    setalbumId(id)
    setrenameOverlayVisible(true)
  }

  const handleRename = (event) => {
    event.preventDefault()
    albumRename({ albumId, newname }, {
      onSuccess: () => {
        setisVisible(false);
        setrenameOverlayVisible(false);
        setNewname('');
      }
    });
  };


  const onClose = (e) => {
    e.preventDefault()
    setrenameOverlayVisible(false)
    setisVisible(false)
  }


  const onMore = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setisVisible(true)
  }


  return (
    <>
      <div className='flex flex-col font-medium text-gray-800 dark:text-gray-200 mb-2'>
        <figure className="overflow-hidden relative w-52 h-52 p-3 rounded-md bg-gradient-to-b from-blue-100 via-blue-100 to-gray-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
          {isVisible ? (
            <CloseIcon
              className='absolute top-2 right-2 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-full'
              onClick={(event) => {
                event.preventDefault();
                setisVisible(false);
              }}
            />
          ) : (
            <MoreVertIcon
              className='absolute top-2 right-2 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-full'
              onClick={onMore}
            />
          )}

          <img src="./album.svg" alt="" className="w-full h-full object-cover" />
          {!!isVisible && (
            <ul className='bg-white dark:bg-gray-800 rounded-md absolute top-9 right-2 text-sm text-gray-700 dark:text-gray-200 py-2'>
              <li
                onClick={(e) => renameAlbum(albumitem._id, e)}
                className='px-6 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 hover:cursor-pointer'
              >
                Rename
              </li>
              <li
                onClick={(e) => deleteAlbum(albumitem._id, e)}
                className='px-6 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-700 hover:cursor-pointer'
              >
                Delete
              </li>
            </ul>
          )}
        </figure>
        <span> {albumitem?.albumname}</span>
        <span className='text-gray-600 dark:text-gray-400 text-sm'>{albumitem?.albumphotos?.length} Items </span>
      </div>

      {!!renameOverlayVisible && (
        <Overlay onClose={onClose}>
          <div
            className="p-4 bg-blue-100 dark:bg-gray-800 rounded-xl shadow-md w-full max-w-sm mx-auto"
            onClick={(e) => e.preventDefault()}
          >
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Rename Album</h2>
            <input
              type="text"
              placeholder="Enter new album name"
              value={newname}
              onChange={(e) => setNewname(e.target.value)}
              className="w-full px-3 py-2 border-b border-gray-300 dark:border-gray-600 outline-0 mb-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
            <button
              onClick={handleRename}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </Overlay>
      )}

    </>
  )
}

export default AlbumCard