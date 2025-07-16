import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useFavourites = () => {
    return useQuery({
        queryKey: ['favourites'],
        queryFn: async () => {
           const response = await api.get(`photo/favourite/all`);
            return response.data.favourites
        }
    })
}