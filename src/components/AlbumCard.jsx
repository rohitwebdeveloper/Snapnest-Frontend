import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig';
import Overlay from './Overlay';
// import RenameAlbum from './RenameAlbum';


const AlbumCard = ({ albumitem, setallAlbums, index }) => {

  const [isVisible, setisVisible] = useState(false)
  const [albumId, setalbumId] = useState('')
  const [newname, setNewname] = useState('');
  const [renameOverlayVisible, setrenameOverlayVisible] = useState(false)


  // Handle deletion of Album
  const deleteAlbum = async (albumId) => {
    try {
      const response = await api.delete('/album/delete', {
        data: { albumId }
      });

      if (response.status === 200) {
        setallAlbums((preval) => preval.filter((item) => item._id !== albumId));
        setisVisible(false)
        toast.success('Album deleted successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal server error');
      console.error(error);
    }
  };



  const renameAlbum = (id) => {
    setalbumId(id)
    setrenameOverlayVisible(true)
  }



  const handleRename = async () => {
    if (!newname) {
      toast('Enter new album name')
      return
    }
    try {
      const response = await api.put('/album/rename', { albumId, newname });

      if (response.status === 200) {
        setallAlbums((prevAlbums) =>
          prevAlbums.map((album, i) => i === index ? { ...album, albumname: newname } : album)
        );

        setisVisible(false)
        setrenameOverlayVisible(false)
        setNewname('')
        toast.success('Album renamed successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal server error');
      console.error(error);
    }
  };



  const onClose = () => {
    setrenameOverlayVisible(false)
    setisVisible(false)
  }

  return (
    <>
      <div className='flex flex-col font-medium text-gray-800 mb-2'>
        <figure className="overflow-hidden relative w-52 h-52 p-3 rounded-md bg-gradient-to-b from-blue-100  via-blue-100 to-gray-500">
          {isVisible ? (
            <CloseIcon className='absolute top-2 right-2 hover:bg-gray-400 rounded-full' onClick={() => setisVisible(false)} />
          ) : (
            <MoreVertIcon className='absolute top-2 right-2 hover:bg-gray-400 rounded-full' onClick={() => setisVisible(true)} />
          )}

          <img src="./album.svg" alt="" className="w-full h-full object-cover" />
          {!!isVisible &&
            <ul className='bg-white rounded-md absolute top-9 right-2 text-sm text-gray-700 py-2' >
              <li onClick={() => renameAlbum(albumitem._id)} className='px-6 py-1.5 hover:bg-blue-50 hover:cursor-pointer'>Rename</li>
              <li onClick={() => deleteAlbum(albumitem._id)} className='px-6 py-1.5 hover:bg-blue-50 hover:cursor-pointer'>Delete</li>
            </ul>}
        </figure>
        <span> {albumitem?.albumname}</span>
        <span className='text-gray-600 text-sm'>{albumitem?.albumphotos?.length} Items </span>
      </div>

      {/* Overlay to enter new album name  */}
      {!!renameOverlayVisible && <Overlay onClose={onClose}>
        <div className="p-4 bg-blue-100 rounded-xl shadow-md w-full max-w-sm mx-auto">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Rename Album</h2>
          <input
            type="text"
            placeholder="Enter new album name"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
            className="w-full px-3 py-2 border-b outline-0  mb-2"
          />
          <button onClick={handleRename} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 " >
            Done
          </button>
        </div>
      </Overlay>}
    </>
  )
}

export default AlbumCard