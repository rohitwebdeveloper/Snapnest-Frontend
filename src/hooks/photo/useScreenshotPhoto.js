import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useScreenshotPhoto = () => {
    return useQuery({
        queryKey: ['screenshots'],
        queryFn: async () => {
            const response = await api.get('/photo/screenshot/all')
            return response.data.screenshots
        }
    })
}