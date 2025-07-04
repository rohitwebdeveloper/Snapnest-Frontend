import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/apiConfig';
import toast from 'react-hot-toast';
import PhotoGridSection from '../components/PhotoGridSection';


const AlbumDetail = () => {
  const {albumname, id } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if(!id) {
        return 
      }
      try {
        const response = await api.get(`/album/${id}/photos`);

        if(response.status === 200) {
          setPhotos(response.data.photos);
        }
      } catch (error) {
        console.log(error)
        toast(error?.response?.data?.message || 'Internal server error')
      }
    };

    fetchPhotos();
  }, [id]);

  return (
    // <div className="px-6 py-4">
    //   <KeyboardBackspaceOutlinedIcon onClick={() => navigate(-1)} />
    //   <h2 className="text-2xl font-medium mt-4 mb-6">{albumname}</h2>
    //   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    //     {photos.map((photo) => (
    //       <Link to={`/photo/${photo._id}`} >
    //       <ImageCard
    //         key={photo._id}
    //         imgurl={photo.url}
    //         className="rounded shadow"
    //       />
    //       </Link> 
          
    //     ))}
    //   </div>
    // </div>
    <PhotoGridSection photos={photos} title={albumname} />
  );
};

export default AlbumDetail;
