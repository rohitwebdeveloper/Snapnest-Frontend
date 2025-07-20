import React, { useState } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AlbumCard from '../components/AlbumCard';
import Overlay from '../components/Overlay';
import CreateAlbum from '../components/CreateAlbum';
import { Link } from 'react-router-dom';
import { useAllAlbums } from '../hooks/album/albumQuery';
import { useCreateAlbum } from '../hooks/album/albumMutation';
import Loader from '../components/Loader';
import Error from '../components/Error';
import NoData from '../components/NoData';


const Album = () => {

  const [showCreateAlbum, setshowCreateAlbum] = useState(false)
  const { isPending, isError, error, data: allAlbum } = useAllAlbums()
  const { mutate: albumCreate } = useCreateAlbum(setshowCreateAlbum)

  const closeCreateAlbum = () => {
    setshowCreateAlbum(!showCreateAlbum)
  }

  // Api call to create new album
  const onCreateAlbum = (title) => {
    albumCreate(title)
  };


  if (isPending) return <Loader />
  if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


  return (
    <main className='w-full h-[calc(100vh_-_76px)] overflow-auto relative'>
      <div className='flex justify-between items-center border-b py-3 px-5 bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 sticky top-0 right-0'>
        <h2 className='text-2xl text-gray-900 dark:text-gray-100'>Albums</h2>
        <div className='text-gray-600 dark:text-gray-300 cursor-pointer' onClick={() => setshowCreateAlbum(true)}>
          <AddToPhotosIcon /> Create Album
        </div>
      </div>
      <section className='flex flex-wrap gap-8 justify-start p-5'>
        {allAlbum.length ? (
          allAlbum?.map((albumitem, i) => {
            return (
              <Link key={i} to={`/album/${albumitem.albumname}/${albumitem._id}`}>
                <AlbumCard albumitem={albumitem} key={i} index={i} />
              </Link>
            );
          })
        ) : (
          <NoData message='No Albums !' />
        )}
      </section>
      {!!showCreateAlbum && (
        <Overlay onClose={closeCreateAlbum}>
          <CreateAlbum onCreate={onCreateAlbum} />
        </Overlay>
      )}
    </main>

  )
}

export default Album