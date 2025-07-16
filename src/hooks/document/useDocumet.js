import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export const useDocument = (category) => {
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['documents', category],
        queryFn: async () => {
            if (!category) {
                navigate(-1)
                return
            }
            const response = await api.get(`/document/all?category=${category}`);
            return response.data.documents
        }
    })
}