import React, { useEffect, useState } from 'react'
import ImageCard from '../components/ImageCard'
import toast from 'react-hot-toast'
import { api } from '../api/apiConfig'
import { Link } from 'react-router-dom'


const Screenshot = () => {

  const [screenshotData, setscreenshotData] = useState([])


  useEffect(() => {
    ; (async () => {
      try {
        const response = await api.get('/photo/screenshot/all')

        if (response.status === 200) {
          setscreenshotData(response.data.screenshots)
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'Internal server error')
      }
    })()

  }, [])


  return (
    <main className='w-full '>
      <h2 className='text-4xl my-2 ml-4  '>Screenshot</h2>
      <section className='flex flex-wrap gap-8 justify-start p-5'>
        {screenshotData?.map((shot, i) => {
          return <Link key={i} to={`/photo/${shot._id}`}> <ImageCard imgurl={shot.url} /> </Link>
        })}

      </section>
    </main>
  )
}

export default Screenshot