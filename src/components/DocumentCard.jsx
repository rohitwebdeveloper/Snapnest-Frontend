import React from 'react'

const DocumentCard = ({documentname, imgurl}) => {
    return (
            <figure className=" relative overflow-hidden aspect-square max-w-52  bg-gradient-to-b from-blue-100  via-blue-100 to-gray-500  rounded-md">
                <img
                    src={imgurl}
                    alt="Document"
                    className="w-fit h-fit"
                />
                <span className='absolute left-1/2 transform -translate-x-1/2 bottom-2 text-white font-medium'>{documentname}</span>
            </figure>
    )
}

export default DocumentCard