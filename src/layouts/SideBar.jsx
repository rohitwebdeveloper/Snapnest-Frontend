import React from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ScreenshotOutlinedIcon from '@mui/icons-material/ScreenshotOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
   <aside className="bg-blue-50 dark:bg-gray-800 p-4 w-[20vw] h-[calc(100vh_-_76px)] rounded-lg shadow-md">
  <ul className="text-bluegray flex flex-col gap-3 font-medium text-gray-700 dark:text-gray-200">
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <InsertPhotoIcon /> Photos
      </li>
    </NavLink>
    <NavLink
      to="/screenshot"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <ScreenshotOutlinedIcon /> Screenshots
      </li>
    </NavLink>
    <NavLink
      to="/album"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <PhotoAlbumOutlinedIcon /> Albums
      </li>
    </NavLink>
    <NavLink
      to="/favourites"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <StarBorderOutlinedIcon /> Favourites
      </li>
    </NavLink>
    <NavLink
      to="/document"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <ArticleOutlinedIcon /> Documents
      </li>
    </NavLink>
    <NavLink
      to="/places"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <LocationOnOutlinedIcon /> Places
      </li>
    </NavLink>
    <NavLink
      to="/recently-added"
      className={({ isActive }) =>
        isActive ? 'bg-blue-200 dark:bg-gray-700 rounded-full' : undefined
      }
    >
      <li className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-full flex items-center gap-3 transition-colors duration-200">
        <ScheduleOutlinedIcon /> Recently Added
      </li>
    </NavLink>
  </ul>
</aside>

  )
}

export default SideBar