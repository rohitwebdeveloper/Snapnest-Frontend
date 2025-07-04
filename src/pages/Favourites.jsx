import React, {useEffect, useState} from 'react'
import PhotoGridSection from '../components/PhotoGridSection'
import { api } from '../api/apiConfig'
import toast from 'react-hot-toast'

 


const Favourites = () => {
 
  const [favourite, setfavourite] = useState([])

   useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await api.get(`photo/favourite/all`);

        if(response.status === 200) {
          setfavourite(response.data.favourites);
        }
      } catch (error) {
        console.log(error)
        toast(error?.response?.data?.message || 'Internal server error')
      }
    };

    fetchFavourites();
  }, []);


  return (
   <PhotoGridSection photos={favourite} title='Favourites' />
  )
}

export default Favourites