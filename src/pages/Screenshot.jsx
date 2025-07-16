import { useScreenshotPhoto } from '../hooks/photo/useScreenshotPhoto'
import PhotoGridSection from '../components/PhotoGridSection'
import Loader from '../components/Loader'
import Error from '../components/Error'


const Screenshot = () => {

  const { data: screenshotData, isPending, isError, error } = useScreenshotPhoto()

    if (isPending) return <Loader />
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


  return (
    <PhotoGridSection photos={screenshotData} title='Screenshots' />
  )
}

export default Screenshot