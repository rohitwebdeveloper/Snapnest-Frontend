import { api } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";


export const useAllPhotos = () => {
    return useQuery({
        queryKey: ['allphotos'],
        queryFn: async () => {
            const response = await api.get('/photo/');
            if (response.status !== 200) throw new Error('Failed to fetch photos');

            const groupByDate = response.data.reduce((acc, item) => {
                const date = item.createdAt.slice(0, 10);
                if (!acc[date]) acc[date] = [];
                acc[date].push(item);
                return acc;
            }, {});

            const result = Object.entries(groupByDate).map(([date, items]) => ({
                date,
                items,
            }));

            return result;
        },
        retry:false
    });
}