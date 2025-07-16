import { useParams } from 'react-router-dom';
import PhotoGridSection from '../components/PhotoGridSection';
import { useDocument } from '../hooks/document/useDocumet';
import Loader from '../components/Loader';
import Error from '../components/Error';

const DocumentDetail = () => {

    const { category } = useParams();
    const { isPending, isError, error, data: documents } = useDocument(category)

    if (isPending) return <Loader />
    if (isError) return <Error errorMessage={error?.message || 'Internal Server Error'} />


    return (
        <PhotoGridSection title={category} photos={documents} />
    )
}

export default DocumentDetail