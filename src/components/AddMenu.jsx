import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../api/apiConfig'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { add } from '../features/image/recentSlice';


export default function AddMenu({ onClose }) {

  const dispatch = useDispatch()

  const fileuploadchange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('category', 'photos')

      try {
        const response = await api.post('/photo/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        })
        console.log(response)

        if(response.status === 201) {
          toast.success('Uploaded Successfully')
          dispatch(add(response.data.newPhoto))
          onClose()
        }

      } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong !')
      }
    }
  }

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg w-fit absolute top-20 right-2 z-50">
      <CloseIcon onClick={onClose} style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '20px' }} />
      <ul className="text-base text-bluegray font-medium mt-10">
        <li className="px-5 py-3 rounded-md hover:bg-blue-100  hover:text-black cursor-pointer transition group">
          <label className="cursor-pointer flex items-center  gap-4 ">
            <input type="file" accept="image/*" className="hidden" onChange={fileuploadchange} />
            <AddPhotoAlternateIcon /> Add Photo
          </label>
        </li>

        <li className="px-5 py-3 rounded-md  flex items-center gap-4 hover:bg-blue-100 hover:text-black cursor-pointer transition">
          <CollectionsBookmarkIcon />  Create Album
        </li>
      </ul>
    </div>
  );
}
