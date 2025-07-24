import React from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ScreenshotOutlinedIcon from '@mui/icons-material/ScreenshotOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SideBar = ({ isSidebarOpen }) => {
  return (
    <aside className={`fixed sm:relative top-14 sm:top-0 left-0 z-40 bg-blue-50 dark:bg-gray-800 p-4 w-20 lg:w-[20vw] overflow-auto h-[calc(100vh_-_76px)] rounded-lg rounded-tr-none shadow-md transition-transform duration-300 ease-in-out transform
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  sm:translate-x-0`}>

      <ul className="text-bluegray flex flex-col gap-3 font-medium text-gray-700 dark:text-gray-200">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <InsertPhotoIcon /> <span className='hidden lg:block'>Photos</span>
          </li>
        </NavLink>
        <NavLink
          to="/screenshot"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <ScreenshotOutlinedIcon />  <span className='hidden lg:block'>Screenshots</span>
          </li>
        </NavLink>
        <NavLink
          to="/album"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <PhotoAlbumOutlinedIcon />  <span className='hidden lg:block'>Albums</span>
          </li>
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <StarBorderOutlinedIcon /><span className='hidden lg:block'>Favourites</span>
          </li>
        </NavLink>
        <NavLink
          to="/document"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <ArticleOutlinedIcon /><span className='hidden lg:block'>Documents</span>
          </li>
        </NavLink>
        <NavLink
          to="/places"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <LocationOnOutlinedIcon /><span className='hidden lg:block'>Places</span>
          </li>
        </NavLink>
        <NavLink
          to="/recently-added"
          className={({ isActive }) =>
            isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
          }
        >
          <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <ScheduleOutlinedIcon /><span className='hidden lg:block'>Recently Added</span>
          </li>
        </NavLink>

        <NavLink to='/help-feedback'>
          <li className=" mt-14 sm:hidden p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
            <HelpOutlineIcon />
          </li>
        </NavLink>

        <NavLink to='/account' >
          <li className=" sm:hidden p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200 text-xs">
            <AccountCircleIcon style={{ fontSize: '2em' }} />
          </li>
        </NavLink>

      </ul>
    </aside>

  )
}

export default SideBar