import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/apiConfig';
import toast from 'react-hot-toast';
import PhotoGridSection from '../components/PhotoGridSection';

const DocumentDetail = () => {

    const { category } = useParams();
    const [documents, setdocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!category) {
                toast("Category name is missing")
                return
            }
            try {
                const response = await api.get(`/document/all?category=${category}`);
                if (response.status === 200) {
                    setdocuments(response.data.documents);
                }
            } catch (error) {
                console.log(error)
                toast(error?.response?.data?.message || 'Internal server error')
            }
        };
        fetchDocuments();
    }, [category]);


    return (
        <PhotoGridSection title={category} photos={documents} />
    )
}

export default DocumentDetail