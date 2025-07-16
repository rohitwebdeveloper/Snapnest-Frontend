import { useParams } from 'react-router-dom';
import PhotoGridSection from '../components/PhotoGridSection';
import { useAlbumPhotos } from '../hooks/album/albumQuery';
import Error from '../components/Error';
import Loader from '../components/Loader';



const AlbumDetail = () => {
  
  const { albumname, id } = useParams();
  const { isPending, isError, error, data: photos } = useAlbumPhotos(id)

if (isPending) return <Loader />
  if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />

  return (
    <PhotoGridSection photos={photos} title={albumname} />
  );
};

export default AlbumDetail;
