import { api } from "../../api/apiConfig";
import { useInfiniteQuery } from "@tanstack/react-query";


export const useAllPhotos = () => {
    return useInfiniteQuery({
        queryKey: ['allphotos'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get(`/photo/all?page=${pageParam}&limit=2`);
            // console.log(response)
            if (response.status !== 200) throw new Error('Failed to fetch photos');

            const groupByDate = response.data.photos.reduce((acc, item) => {
                const date = item.createdAt.slice(0, 10);
                if (!acc[date]) acc[date] = [];
                acc[date].push(item);
                return acc;
            }, {});

            const result = Object.entries(groupByDate).map(([date, items]) => ({
                date,
                items,
            }));

            return {
                data: result,
                nextPage: response.data.hasMore ? pageParam + 1 : undefined
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        // retry:false
    });
}

