import { useNavigate } from "react-router-dom";
import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useAlbumPhotos = (id) => {
    const navigate = useNavigate()
    return useQuery({
        queryKey: ['albumphotos', id],
        queryFn: async () => {
            if (!id) {
                navigate(-1)
                return
            }
            const response = await api.get(`/album/${id}/photos`);
            return response.data.photos
        }
    })
}


export const useAllAlbums = () => {
    return useQuery({
        queryKey: ['albums'],
        queryFn: async () => {
            const response = await api.get('/album/all')
            return response.data.albums
        }
    })
}