import Overlay from '../Overlay';

const ChangePasswordOverlay = ({ open, onClose, onSubmit, loading }) => {
  if (!open) return null;
  return (
    <Overlay title="Change Password" onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-3 px-3">
        <input
          type="password"
          name='newpassword'
          placeholder="New Password"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 rounded"
        />
        <input
          type="password"
          name='confirmpassword'
          placeholder="Confirm New Password"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 rounded"
        />
        <button
          type='submit'
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Update Password
        </button>
      </form>
    </Overlay>

  );
};

export default ChangePasswordOverlay;