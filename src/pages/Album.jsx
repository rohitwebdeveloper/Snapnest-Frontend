import React, { useState, useEffect } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AlbumCard from '../components/AlbumCard';
import Overlay from '../components/Overlay';
import CreateAlbum from '../components/CreateAlbum';
import toast from 'react-hot-toast';
import { api } from '../api/apiConfig'
import { Link } from 'react-router-dom';

const Album = () => {

  const [showCreateAlbum, setshowCreateAlbum] = useState(false)
  const [allAlbums, setallAlbums] = useState([])


  useEffect(() => {
   ;(async () => {
    try {
      const response = await api.get('/album/all')
      console.log(response)
      if(response.status === 200) {
        setallAlbums(response.data.albums)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal server error');
      console.error(error);
    }
   })()
  }, [])
  


  const closeCreateAlbum = () => {
    setshowCreateAlbum(!showCreateAlbum)
  }

  // Api call to create new album
 const onCreateAlbum = async (title) => {
    if (!title.trim()) {
      toast('Enter album title');
      return;
    }

    try {
      const response = await api.post('/album/create', { albumname: title.trim() });
      if (response.status === 201) {
        toast.success('Album created');
        setallAlbums((preval) => [...preval, response?.data?.album])
        setshowCreateAlbum(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create album');
      console.error(error);
      setshowCreateAlbum(false);
    }
  };

  

  return (
    <main className='w-full h-[calc(100vh_-_76px)] overflow-auto  relative'    >
      <div className='flex justify-between items-center border-b py-3 px-5 bg-white border-gray-400 sticky top-0 right-0'>
        <h2 className='text-2xl  '>Albums</h2>
        <div className='text-gray-600' onClick={() => setshowCreateAlbum(true)} > <AddToPhotosIcon /> Create Album</div>
      </div>
      <section className='flex flex-wrap gap-8 justify-start p-5'>
        {allAlbums?.map((albumitem, i) => {
          return <Link to={`/album/${albumitem._id}`} > <AlbumCard albumitem={albumitem} key={i} setallAlbums={setallAlbums} index={i} /> </Link>
        })}
      </section>
      {!!showCreateAlbum &&
        <Overlay onClose={closeCreateAlbum}>
          <CreateAlbum onCreate={onCreateAlbum} />
        </Overlay>
      }
    </main>

  )
}

export default Album