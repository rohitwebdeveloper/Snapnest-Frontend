import Overlay from '../Overlay';

const UploadImageOverlay = ({ open, onClose, onFileChange, onSave }) => {
  if (!open) return null;
  return (
    <Overlay title="Upload Profile Image" onClose={onClose}>
      <div className="space-y-4 px-4">
        <input type="file" className="w-full border rounded px-3 py-2" onChange={onFileChange} />
        <button onClick={onSave} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Save
        </button>
      </div>
    </Overlay>
  );
};

export default UploadImageOverlay;