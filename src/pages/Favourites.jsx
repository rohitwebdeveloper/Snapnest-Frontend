import PhotoGridSection from '../components/PhotoGridSection'
import { useFavourites } from '../hooks/photo/useFavourites'
import Loader from '../components/Loader'
import Error from '../components/Error'




const Favourites = () => {

  const { isPending, isError, error, data: favourite } = useFavourites()

  if (isPending) return <Loader />
  if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


  return (
    <PhotoGridSection photos={favourite} title='Favourites' />
  )
}

export default Favourites