import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { add } from '../features/image/recentSlice';
import { useUploadPhoto } from '../hooks/photo/photoMutation';


export default function AddMenu({ onClose }) {

  const dispatch = useDispatch()
  const { mutate: uploadphoto } = useUploadPhoto(onClose, dispatch, add)

  const fileuploadchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadphoto(file)
    }
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg w-fit absolute top-20 right-2 z-50">
      <CloseIcon
        onClick={onClose}
        style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '20px' }}
        className="text-bluegray dark:text-gray-300"
      />
      <ul className="text-base text-bluegray dark:text-gray-200 font-medium mt-10">
        <li className="px-5 py-3 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white cursor-pointer transition group">
          <label className="cursor-pointer flex items-center gap-4">
            <input type="file" accept="image/*" className="hidden" onChange={fileuploadchange} />
            <AddPhotoAlternateIcon className="text-bluegray dark:text-gray-300" /> Add Photo
          </label>
        </li>
      </ul>
    </div>

  );
}
