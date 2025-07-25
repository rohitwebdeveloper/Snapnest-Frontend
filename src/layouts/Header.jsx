import React, { useRef, useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import ThemeSwitcher from '../components/ThemeSwitcher';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { api } from '../api/apiConfig';
import { add } from '../features/image/recentSlice';
import { useDispatch } from 'react-redux';
import { useUploadPhoto } from '../hooks/photo/photoMutation';


const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [searchbarVisible, setsearchbarVisible] = useState(false);
  const [resultvisible, setresultvisible] = useState(false)
  const [searchval, setsearchval] = useState('')
  const [searchResult, setsearchResult] = useState([])
  const searchbarRef = useRef(null)
  const intervalRef = useRef(null)
  const dispatch = useDispatch()
  const { mutate: uploadphoto } = useUploadPhoto(dispatch, add)


  useEffect(() => {
    const handleclickoutside = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setresultvisible(false)
        setsearchResult([])
        setsearchval('')
      }
    }
    document.addEventListener('mousedown', handleclickoutside)

    return () => document.removeEventListener('mousedown', handleclickoutside)
  }, [searchbarRef, resultvisible])


  useEffect(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current)

    intervalRef.current = setTimeout(async () => {
      if (searchval) {
        try {
          const response = await api.get(`/photo/search?searchquery=${searchval}`)
          console.log(response)
          if (response.status === 200) {
            setsearchResult(response.data.searchresult)
          }
        } catch (error) {
          toast.error('Failed to find photos')
          console.log(error)
        }
      }
    }, 1000);

    return () => {
      clearTimeout(intervalRef.current)
      intervalRef.current = null
    }
  }, [searchval])



  const fileuploadchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadphoto(file)
    }
  }


  return (
    <header className='flex justify-between items-center px-3 py-2 bg-blue-50 dark:bg-gray-800 relative'>

      {/* Left Section: Hamburger and Logo */}
      <div className='flex items-center gap-3'>
        {/* Hamburger visible below md */}
        <span className='sm:hidden'>
          {isSidebarOpen ? <CloseRoundedIcon onClick={toggleSidebar} className='md:hidden text-gray-700 dark:text-gray-200 cursor-pointer' style={{ fontSize: '2rem' }} /> :
            <MenuRoundedIcon onClick={toggleSidebar} className='md:hidden text-gray-700 dark:text-gray-200 cursor-pointer' style={{ fontSize: '2rem' }} />
          }
        </span>
        <img src="/logo.png" alt="logo" className='h-10 md:h-12 rounded-md dark:invert' />
      </div>

      {/* Center Section: Searchbar */}
      <div
        ref={searchbarRef}
        className={`absolute left-2  md:left-1/5 top-2 z-50 ${searchbarVisible ? 'flex' : 'hidden'} md:flex flex-col w-[95%] sm:w-[97%] md:max-w-[400px] lg:max-w-xl  md:w-full rounded-2xl transition-all duration-300 ${resultvisible ? 'bg-white dark:bg-gray-900 shadow-lg' : 'bg-blue-100 dark:bg-gray-700'
          }`}
      >
        {/* Search Input */}
        <div
          className={`flex items-center gap-3 px-2 sm:px-4 py-2 sm:py-3 ${resultvisible ? 'border-b border-gray-300 dark:border-gray-600' : ''}`}
        >
          <SearchIcon style={{ color: 'gray' }} />
          <input
            type="search"
            value={searchval}
            onChange={(e) => setsearchval(e.target.value)}
            onFocus={() => setresultvisible(true)}
            placeholder="Search photos..."
            className="w-full outline-none text-sm md:text-base placeholder-gray-500 dark:placeholder-gray-400 text-gray-700 dark:text-gray-200 bg-transparent"
          />
          {/* Close button only below md */}
          <button onClick={() => setsearchbarVisible(false)} className='md:hidden text-gray-700 dark:text-gray-200 text-base md:text-lg'>✖</button>
        </div>

        {/* Search Results */}
        {resultvisible && (
          <div className="px-4 py-3 max-h-96 overflow-y-auto grid grid-cols-2 gap-4">
            {searchResult?.length ? (
              searchResult.map((item, i) => (
                <Link to={`/photo/${item._id}`} key={i} className="group relative">
                  <img
                    src={item.url}
                    className=" object-cover rounded-sm md:rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
                    alt="search result"
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm md:text-base col-span-2">No results found.</p>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className='flex items-end gap-2 md:gap-4 text-sm  sm:text-md text-gray-700 dark:text-gray-200 font-light px-1.5 md:px-3'>
        {/* Search icon only below md */}
        <span className='md:hidden'>
          <SearchRoundedIcon onClick={() => setsearchbarVisible(!searchbarVisible)} className='md:hidden cursor-pointer' style={{ fontSize: '2em' }} />
        </span>

        {/* Action Icons */}
        <label className="cursor-pointer flex items-center gap-4">
          <input type="file" accept="image/*" className="hidden" onChange={fileuploadchange} />
          <AddIcon style={{ fontSize: '2em' }} className="text-bluegray dark:text-gray-300" />
        </label>
        <NavLink to='/help-feedback' className='hidden sm:block'><HelpOutlineIcon style={{ fontSize: '2em' }} /></NavLink>
        <NavLink to='/account' className='hidden sm:block' ><AccountCircleIcon style={{ fontSize: '2em' }} /></NavLink>
        <ThemeSwitcher />
      </div>

    </header>

  )
}

export default Header