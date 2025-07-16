import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/apiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const useUpdatePhotoDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ description, location, photoId }) => {
            const response = await api.put('/photo/update-detail', { description, location, photoId })
            return response.data.photo
        },
        onSuccess: (updatedphoto) => {
            toast.success('Details updated')
            queryClient.setQueryData(['photodetails', updatedphoto._id], updatedphoto)
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
        }
    })
}



export const useDeletePhoto = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (photoId) => {
            if (!photoId) {
                throw new Error('Photo ID is required');
            }
            return await api.delete(`/photo/delete/${photoId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['allphotos']);
            toast.success('Photo deleted');
            navigate(-1);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message|| error?.message || 'Internal server error');
        },
    });
};



export const useAddToFavourite = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (photoId) => {
            const response = await api.patch(`/photo/${photoId}/favourite`)
            return response.data.photo
        },
        onSuccess: (updatedphoto) => {
            queryClient.setQueryData(['photodetails', updatedphoto._id], updatedphoto)
            toast.success('Add to favourites')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
        }
    })
}



export const useRemoveFromFavourite = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (photoId) => {
            const response = await api.patch(`/photo/${photoId}/unfavourite`)
            return response.data.photo
        },
        onSuccess: (updatedphoto) => {
            queryClient.setQueryData(['photodetails', updatedphoto._id], updatedphoto)
            toast.success('Removed from favourites')
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
        }
    })
}



export const useAddToScreenshot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (photoId) => {
            return await api.put('/photo/add-screenshot', { photoId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['screenshots']);
            toast.success('Image added to screenshots');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
        },
    });
};



export const useUploadPhoto = (onClose, dispatch, add) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('category', 'photos')

            const response = await api.post('/photo/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            if (response.status !== 201) throw new Error('Faild to upload')
            return response.data.newPhoto
        },
        onSuccess: (newPhoto) => {
            toast.success('Uploaded Successfully')
            dispatch(add(newPhoto))
            onClose()
            queryClient.invalidateQueries(['allphotos'])
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong!");
        },
    })
}