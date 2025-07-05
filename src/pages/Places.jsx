import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/apiConfig';
import toast from 'react-hot-toast';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import PhotoGridSection from '../components/PhotoGridSection';

const Places = () => {

    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await api.get(`/photo/places`);

                if (response.status === 200) {
                    setPhotos(response.data.groupedPhotos);
                }
            } catch (error) {
                console.log(error)
                toast(error?.response?.data?.message || 'Internal server error')
            }
        };

        fetchPhotos();
    }, []);


    return (
        <main className="px-6 py-5 bg-blue-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <KeyboardBackspaceOutlinedIcon
                    onClick={() => navigate(-1)}
                    className="cursor-pointer text-blue-500"
                />
                <h2 className="text-2xl font-semibold text-gray-800">Places</h2>
            </div>

            {/* Grouped Photos by Location */}
            <section className="space-y-10">
                {/* {photos.length === 0 && (
                    <p className="text-gray-600">No photos with location available.</p>
                )} */}

                {photos.map((group, index) => (
                    <div key={index}>
                        {/* Location Heading */}
                        <h3 className="text-xl text-blue-700 font-medium ml-2 ">{group._id}</h3>

                        {/* Photo Grid */}
                        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"> */}
                            {/* {group.photos.map((photo) => (
                                <Link to={`/photo/${photo._id}`}>
                                    <div
                                        key={photo._id}
                                        className="bg-white rounded-lg shadow hover:shadow-md border border-gray-200 transition overflow-hidden"
                                    >
                                        <img
                                            src={photo.url}
                                            alt="location-img"
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                </Link>
                            ))} */}
                            <PhotoGridSection title={Places} photos={group.photos} backbutton={false} />
                        {/* </div> */}
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Places;
