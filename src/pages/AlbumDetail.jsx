import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/apiConfig';
import toast from 'react-hot-toast';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if(!albumId) {
        return 
      }
      try {
        const res = await api.get(`/albums/${albumId}/photos`);
        if(res.status === 200) {
          setPhotos(res.data.photos);
        }
      } catch (error) {
        toast(error?.response?.data?.message || 'Internal server error')
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Album Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <img
            key={photo._id}
            src={photo.url}
            alt={photo.name}
            className="rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
