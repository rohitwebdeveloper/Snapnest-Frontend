import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import AddMenu from '../components/AddMenu';


const Header = () => {
  const [isoverlay, setisoverlay] = useState(false)

  const onClose = () => {
    setisoverlay(!isoverlay)
  }

  return (
    <header className='flex justify-between items-center px-3 py-2 bg-blue-50'>
      <img src="/logo.png" alt="logo" className='h-12' />
      <div className='rounded-full  bg-transparent px-3 py-1.5 flex max-w-xl w-full shadow-sm'>
        <SearchIcon style={{ marginRight: '20px', color: 'gray' }} />
        <input type="search" placeholder="Search photos..." className='outline-0 w-full text-base placeholder-gray-600 bg-transparent' />
      </div>
      <div className='flex items-end gap-4 text-3xl text-gray-700 font-light px-3' >
        <AddIcon onClick={() => setisoverlay(!isoverlay)} style={{ fontSize: '2rem' }} />
        <HelpOutlineIcon style={{ fontSize: '2rem' }} />
        <NavLink to='/account'><AccountCircleIcon style={{ fontSize: '2rem' }} /></NavLink>
      </div>
      {isoverlay && <AddMenu onClose={onClose} />}

    </header>

  )
}

export default Header