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
      <div className='flex justify-between items-center border-b py-3 px-5  z-20 bg-white dark:bg-gray-900 border-gray-400 dark:border-gray-600 sticky top-0 right-0'>
        <h2 className='text-2xl text-gray-900 dark:text-gray-100  '>Albums</h2>
        <div className='text-gray-600 dark:text-gray-300 cursor-pointer' onClick={() => setshowCreateAlbum(true)}>
          <AddToPhotosIcon /> Create Album
        </div>
      </div>
      {allAlbum.length ? (
        <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 md:gap-8 p-5 overflow-auto'>
          {allAlbum?.map((albumitem, i) => {
            return (
              <Link key={i} to={`/album/${albumitem.albumname}/${albumitem._id}`}>
                <AlbumCard albumitem={albumitem} key={i} index={i} />
              </Link>
            );
          })}
        </section>
      ) : (
        <NoData message='No Albums !' />
      )}
      {!!showCreateAlbum && (
        <Overlay onClose={closeCreateAlbum}>
          <CreateAlbum onCreate={onCreateAlbum} />
        </Overlay>
      )}
    </main>

  )
}

export default Album