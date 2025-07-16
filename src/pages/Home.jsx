import React from 'react'
import toast from 'react-hot-toast'
import ImageCard from '../components/ImageCard'
import { Link } from 'react-router-dom'
import { useAllPhotos } from '../hooks/photo/useAllPhotos'
import Error from '../components/Error'
import Loader from '../components/Loader'
import NoData from '../components/NoData'

const Home = () => {

    const { isPending, isError, data, error } = useAllPhotos()

    if (isPending) return <Loader />
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


    return (
        <main className='w-full h-[calc(100vh_-_76px)] overflow-auto  relative' >
            <section className='flex flex-wrap gap-8 justify-start p-5 flex-col'>
                {data.lenght !== 0 ? (data?.map((item, i) => {
                    return (<div key={i} className='flex flex-col gap-4 font-medium text-lg '>
                        <h2>{new Date(item.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}</h2>
                        <div className='flex gap-4'>
                            {item?.items?.map((photo, index) => {
                                return <Link key={index} to={`/photo/${photo._id}`}> <ImageCard imgurl={photo.url} key={index} /> </Link>
                            })}
                        </div>
                    </div>)
                })) : (
                    <NoData message='No Photos Added' />
                )}
            </section>
        </main>
    )
}

export default Home