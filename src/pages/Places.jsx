import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import PhotoGridSection from '../components/PhotoGridSection';
import { usePlacesPhoto } from '../hooks/photo/usePlacesPhoto';
import Loader from '../components/Loader';
import Error from '../components/Error';
import NoData from '../components/NoData';

const Places = () => {

    const navigate = useNavigate();
    const { data: photos, isPending, isError, error } = usePlacesPhoto()

    if (isPending) return <Loader />
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


    return (
        <main className="px-3 md:px-6 py-5 bg-blue-50 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <KeyboardBackspaceOutlinedIcon
                    onClick={() => navigate(-1)}
                    className="cursor-pointer text-blue-500 dark:text-blue-400"
                />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Places</h2>
            </div>

            {/* Grouped Photos by Location */}
            <section className="space-y-10">
                {photos.length ? (
                    photos.map((group, index) => (
                        <div key={index}>
                            {/* Location Heading */}
                            <h3 className="text-xl text-blue-700 dark:text-blue-400 font-medium ml-2">{group._id}</h3>
                            <PhotoGridSection title={Places} photos={group.photos} backbutton={false} />
                        </div>
                    ))
                ) : (
                    <NoData message='No Photos by places' />
                )}
            </section>
        </main>

    );
};

export default Places;
