import Overlay from '../Overlay';

const DeleteAccountOverlay = ({ open, onClose, onConfirmDelete, loading }) => {
  if (!open) return null;
  return (
    <Overlay title="Delete Account" onClose={onClose}>
      <div className="space-y-4 px-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Are you sure you want to permanently delete your account? This action cannot be undone.
        </p>
        <button
          disabled={loading}
          className="w-full bg-red-600 text-sm sm:text-base text-white py-2 rounded hover:bg-red-700 transition"
          onClick={onConfirmDelete}
        >
          {loading ? 'Deleting' : 'Confirm Delete'}
        </button>
      </div>
    </Overlay>

  );
};

export default DeleteAccountOverlay;