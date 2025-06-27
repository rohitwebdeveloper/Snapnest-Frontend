import React, { useEffect, useState } from 'react'
import AlbumCard from '../components/AlbumCard'
import { api } from '../api/apiConfig'
import toast from 'react-hot-toast'
import ImageCard from '../components/ImageCard'

const Home = () => {

    const [photoData, setphotoData] = useState()

    useEffect(() => {
        ; (async () => {
            try {
                const response = await api.get('/photo/')
                console.log(response)
                if (response.status === 200) {
                    const groupBydate = response.data.reduce((acc, item) => {
                        const date = item.createdAt.slice(0, 10)
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(item)
                        return acc
                    }, {});
                    const result = Object.entries(groupBydate).map(([date, items]) => ({
                        date,
                        items,
                    }))
                    setphotoData(result)
                    console.log('Result:', result)

                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
            }
        })()
    }, [])



    return (
        <main className='w-full h-[calc(100vh_-_76px)] overflow-auto  relative' >
            <section className='flex flex-wrap gap-8 justify-start p-5 flex-col'>
                {photoData?.map((item, i) => {
                    return (<div key={i} className='flex flex-col gap-4 font-medium text-lg '>
                        <h2>{new Date(item.date).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}</h2>
                         <div className='flex gap-4'>
                        {item?.items?.map((photo, index) => {
                            return <ImageCard imgurl={photo.url} imgid={item._id} key={index} />
                        })}
                        </div>
                    </div>)
                })}
            </section>
        </main>
    )
}

export default Home