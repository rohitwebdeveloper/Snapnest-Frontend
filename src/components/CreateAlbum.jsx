import { useState } from "react";

const CreateAlbum = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);


  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6 mt-10 text-gray-800 space-y-4">
      <h2 className="text-2xl font-medium text-blue-700">Create New Album</h2>

      <input
        type="text"
        placeholder="Enter album title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border-b border-gray-500 outline-0 px-4 py-2 text-base   focus:border-b-[2px]"
      />

      <button
        onClick={() => onCreate(title)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
      >
        Save Album
      </button>

      {success && (
        <p className="text-green-600 text-sm font-medium">
          Album created successfully!
        </p>
      )}
    </div>
  );
};

export default CreateAlbum;
