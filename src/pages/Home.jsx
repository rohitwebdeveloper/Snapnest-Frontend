import React, { useEffect } from 'react'
import ImageCard from '../components/ImageCard'
import { Link } from 'react-router-dom'
import { useAllPhotos } from '../hooks/photo/useAllPhotos'
import Loader from '../components/Loader'
import Error from '../components/Error'
import NoData from '../components/NoData'
import { useInView } from 'react-intersection-observer'

const Home = () => {
    const { ref, inView } = useInView()
    const {
        isPending,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error,
    } = useAllPhotos()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])


    if (isPending) return <Loader />
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />

    const flatData = data?.pages?.flatMap((page) => page.data) || [];


    return (
        <main className='w-full h-[calc(100vh_-_76px)] overflow-auto relative'>
            <section className='flex flex-wrap gap-8 justify-start p-5 flex-col'>
                {flatData.length !== 0 ? (
                    flatData.map((group, i) => (
                        <div key={i} className='flex flex-col gap-4 font-medium text-base md:text-lg'>

                            <h2 className='dark:text-gray-200'>{new Date(group.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year:'numeric' })}</h2>

                            <div className='flex flex-wrap gap-4'>
                                {group?.items?.map((photo) => (
                                    <Link key={photo._id} to={`/photo/${photo._id}`}>
                                        <ImageCard imgurl={photo.url} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <NoData message='No Photos Added' />
                )}
                {isFetchingNextPage && (
                    <div className="w-full flex justify-center py-6">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span className="text-lg font-medium tracking-wide">Loading more photos...</span>
                        </div>
                    </div>
                )}

                {/* Observer element */}
                <div ref={ref} className='h-1 w-full' />
            </section>
        </main>
    )
}

export default Home
