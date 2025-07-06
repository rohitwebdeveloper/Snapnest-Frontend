import Overlay from '../Overlay';

const DeleteAccountOverlay = ({ open, onClose, onConfirmDelete }) => {
  if (!open) return null;
  return (
    <Overlay title="Delete Account" onClose={onClose}>
      <div className="space-y-4 px-3">
        <p className="text-sm text-gray-700">
          Are you sure you want to permanently delete your account? This action cannot be undone.
        </p>
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition" onClick={onConfirmDelete}>
          Confirm Delete
        </button>
      </div>
    </Overlay>
  );
};

export default DeleteAccountOverlay;