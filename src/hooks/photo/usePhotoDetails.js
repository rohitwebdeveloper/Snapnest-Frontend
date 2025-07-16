import { useNavigate } from "react-router-dom";
import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";



export const usePhotoDetails = (photoId) => {
    const navigate = useNavigate();

    return useQuery({
        queryKey: ['photodetails', photoId],
        queryFn: async () => {
            if (!photoId) {
                navigate(-1)
                return
            }
            const response = await api.get(`/photo/${photoId}`);
            return response.data.photo;
        },
        // enabled: !!photoId,
        retry:false
    })
}