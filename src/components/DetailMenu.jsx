import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { bgcolor } from '@mui/system';

const DetailMenu = ({setdetailmenuVisible}) => {

  return (
    <ul className='rounded-md bg-white text-gray-800  w-52 font-medium absolute right-1 top-20 '>
        <li className='p-3 text-right'> <CloseIcon className='hover:bg-gray-200'  onClick={() => setdetailmenuVisible(false)} /> </li>
        <li className='p-3 hover:bg-blue-50'>Add to album</li>
        <li className='p-3 hover:bg-blue-50'>Add to document</li>
        <li className='p-3 hover:bg-blue-50'>Add to screenshot</li>
        <li className='p-3 hover:bg-blue-50'>Download</li>
    </ul>
  )
}

export default DetailMenu