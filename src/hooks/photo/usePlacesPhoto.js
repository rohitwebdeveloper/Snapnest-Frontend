import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const usePlacesPhoto = () => {
    return useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            const response = await api.get(`/photo/places`);
            return response.data.groupedPhotos
        }
    })
}