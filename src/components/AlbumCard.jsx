import React from 'react'

const AlbumCard = () => {
  return (
    <div className='flex flex-col font-medium text-gray-800 mb-2'>
      <figure className="overflow-hidden w-52 h-52 rounded-md">
        <img
          src="https://images.unsplash.com/photo-1743701168271-15d33fac46e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </figure>
      <span> Album 1 </span>
      <span className='text-gray-600 text-sm'>10 Items</span>
    </div>
  )
}

export default AlbumCard