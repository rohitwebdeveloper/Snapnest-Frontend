import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/apiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const useAddToAlbum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ albumId, photoId }) => {
      return await api.put('/album/add-photo', { albumId, photoId });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['albumphotos', variables.albumId]);
      toast.success('Image added to album');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
    },
  });
};



export const useCreateAlbum = (setshowCreateAlbum) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title) => {
      if (!title.trim()) {
        throw new Error('Enter album title');
      }
      const response = await api.post('/album/create', { albumname: title.trim() });
      return response?.data?.album;
    },
    onSuccess: (newAlbum) => {
      queryClient.setQueryData(['albums'], (oldAlbums = []) => [...oldAlbums, newAlbum]);
      toast.success('Album created');
      setshowCreateAlbum(false);
    },
    onError: (error) => {
      setshowCreateAlbum(false);
      toast.error(error?.response?.data?.message || error?.message || 'Failed to create album');
    },
  });
};



export const useDeleteAlbum = (setisVisible) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (albumId) => {
      const response = await api.delete('/album/delete', {
        data: { albumId }
      });
      if (response.status !== 200) toast('Failed to delete album');
      return albumId;
    },
    onSuccess: (deletedAlbumId) => {
      queryClient.setQueryData(['albums'], (oldAlbums = []) =>
        oldAlbums.filter((album) => album._id !== deletedAlbumId)
      );
      toast.success('Album deleted successfully');
      setisVisible(false);
    },
    onError: (error) => {
       toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
    }
  });
};



export const useRenameAlbum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ albumId, newname }) => {
      if (!newname) {
      throw new Error('Album name is required');
      }

      const response = await api.put('/album/rename', { albumId, newname });
      return response?.data?.album;
    },
    onSuccess: (updatedAlbum) => {
      queryClient.invalidateQueries(['albums']);
      //  setallAlbums((prevAlbums) =>
      //   prevAlbums.map((album, i) => i === index ? { ...album, albumname: newname } : album)
      // );
      toast.success('Album renamed successfully');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Internal server error');
    }
  });
};