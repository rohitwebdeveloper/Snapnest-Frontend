import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/apiConfig';
import toast from 'react-hot-toast';

export const useAddToDocument = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ photoId, category }) => {
            if (!photoId || !category) throw new Error('Photo ID and category are required');
            return await api.post('/document/add', { photoId, category });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['documents', variables.category])
            toast.success(' Added to documents');
        },
        onError: (error) => {
            console.log(error)
            toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
        },
    });
};
