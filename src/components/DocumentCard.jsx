import React from 'react'

const DocumentCard = ({ documentname, imgurl }) => {
    return (
        <figure className="relative overflow-hidden aspect-square bg-gradient-to-b from-blue-100 via-blue-100 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-800 rounded-md">
            <img src={imgurl} alt="Document" className="w-fit h-fit" />
            <span className='absolute left-1/2 transform -translate-x-1/2 bottom-2 text-sm sm:text-base text-white font-medium'>
                {documentname}
            </span>
        </figure>

    )
}

export default DocumentCard