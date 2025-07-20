import { useState } from 'react';
import { Close, LocationOn, CreateOutlined as EditIcon } from '@mui/icons-material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CalendarToday from '@mui/icons-material/CalendarToday';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { useUpdatePhotoDetails } from '../hooks/photo/photoMutation';

const PhotoInfoSidebar = ({ photo, onClose }) => {
  const [location, setLocation] = useState(photo.location || '');
  const [description, setDescription] = useState(photo.description || '');
  const [editLocation, setEditLocation] = useState(!photo.location);
  const [editDescription, setEditDescription] = useState(!photo.description);
  const { mutate } = useUpdatePhotoDetails()

  const onSave = async (photoId) => {
    mutate({ description, location, photoId }, {
      onSuccess: () => {
        setEditDescription(false)
        setEditLocation(false)
      }
    })
  }

  return (
    <aside className="w-[30vw] bg-white dark:bg-gray-900 p-7 flex flex-col justify-between shadow-md rounded-xl border border-blue-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Info</h2>
        <Close
          className="cursor-pointer text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        />
      </div>

      {/* Info Section */}
      <div className="space-y-6 text-[16px] text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-4">
          <InsertDriveFileOutlinedIcon className="text-blue-500" style={{ fontSize: '22px' }} />
          <span className="truncate">{photo.name}</span>
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400 text-sm border-y py-2 border-blue-50 dark:border-gray-700">
          {`${photo.width} x ${photo.height}`}
        </div>

        <div className="flex items-center gap-4">
          <CalendarToday className="text-blue-500" style={{ fontSize: '22px' }} />
          <span>{photo.createdAt.slice(0, 10)}</span>
        </div>

        <div className="flex items-center gap-4">
          <StorageOutlinedIcon className="text-blue-500" style={{ fontSize: '22px' }} />
          <span>{((photo.size) / 1024).toFixed(2)} KB</span>
        </div>

        {/* Location Field */}
        {photo.location && !editLocation ? (
          <div className="flex items-center justify-between border-b-[2px] border-b-gray-500 dark:border-b-gray-600 py-2">
            <div className="flex items-center gap-2">
              <LocationOn className="text-blue-500" />
              <span className="text-gray-800 dark:text-gray-200">{location}</span>
            </div>
            <EditIcon
              className="text-gray-500 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300"
              onClick={() => setEditLocation(true)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 border-b-[2px] border-b-gray-500 dark:border-b-gray-600 bg-blue-50 dark:bg-gray-700 rounded-lg py-2 ">
            <LocationOn className="text-blue-500" />
            <input
              type="text"
              className="w-full bg-transparent text-gray-800 dark:text-gray-100 outline-none placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="Add Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Description Field */}
      <div className="mt-6">
        {photo.description && !editDescription ? (
          <div className="flex items-center justify-between border-b-[2px] border-b-gray-500 dark:border-b-gray-600 px-4 py-2">
            <span className="text-gray-800 dark:text-gray-200">{description}</span>
            <EditIcon
              className="text-gray-500 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300"
              onClick={() => setEditDescription(true)}
            />
          </div>
        ) : (
          <input
            type="text"
            className="w-full border-b-[2px] border-b-gray-500 dark:border-b-gray-600 outline-0 px-4 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 bg-transparent"
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>

      {/* Save Button */}
      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-200"
        onClick={() => onSave(photo._id)}
        disabled={!editLocation && !editDescription}
      >
        Save
      </button>
    </aside>

  );
};

export default PhotoInfoSidebar;
