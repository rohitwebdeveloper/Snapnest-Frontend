import React, { useState } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AlbumCard from '../components/AlbumCard';
import Overlay from '../components/Overlay';
import CreateAlbum from '../components/CreateAlbum';

const Album = () => {

  const [showCreateAlbum, setshowCreateAlbum] = useState(false)

  const closeCreateAlbum = () => {
    setshowCreateAlbum(!showCreateAlbum)
  }

  return (
    <main className='w-full h-[calc(100vh_-_76px)] overflow-auto  relative'    >
      <div className='flex justify-between items-center border-b py-3 px-5 bg-white border-gray-400 sticky top-0 right-0'>
        <h2 className='text-2xl  '>Albums</h2>
        <div className='text-gray-600' onClick={() => setshowCreateAlbum(true)} > <AddToPhotosIcon /> Create Album</div>
      </div>
      <section className='flex flex-wrap gap-8 justify-start p-5'>
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </section>
      {!!showCreateAlbum &&
        <Overlay onClose={closeCreateAlbum}>
          <CreateAlbum />
        </Overlay>
      }
    </main>

  )
}

export default Album