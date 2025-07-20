import EditIcon from '@mui/icons-material/Edit';

const ProfileSection = ({ avatar, name, email, onEditClick }) => {
  return (
    <div className="flex items-center space-x-6">
      <div className="relative w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-semibold shadow-md">
        {avatar ? (
          <img src={avatar} alt="User" className="rounded-full w-full h-full object-cover" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 px-2.5 border border-gray-300 dark:border-gray-500 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <EditIcon fontSize="small" className="text-black dark:text-white" />
        </button>
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{name}</p>
        <p className="text-gray-500 dark:text-gray-300 text-sm">{email}</p>
      </div>
    </div>
  );
};

export default ProfileSection;