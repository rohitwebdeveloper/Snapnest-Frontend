import React, { useRef, useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Link, NavLink } from 'react-router-dom';
import AddMenu from '../components/AddMenu';
import toast from 'react-hot-toast';
import ThemeSwitcher from '../components/ThemeSwitcher';

import { api } from '../api/apiConfig';


const Header = () => {
  const [isoverlay, setisoverlay] = useState(false)
  const [resultvisible, setresultvisible] = useState(false)
  const [searchval, setsearchval] = useState('')
  const [searchResult, setsearchResult] = useState([])
  const searchbarRef = useRef(null)
  const intervalRef = useRef(null)


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


  const onClose = () => {
    setisoverlay(!isoverlay)
  }


  return (
    <header className='flex justify-between items-center px-3 py-2 bg-blue-50 relative'>
      <img src="/logo.png" alt="logo" className='h-12' />
      <div
        ref={searchbarRef}
        className={`absolute left-1/4 top-2 z-50 max-w-xl w-full flex flex-col rounded-2xl transition-all duration-300 ${resultvisible ? 'bg-white shadow-lg' : 'bg-blue-100'
          }`}
      >
        {/* Search Input */}
        <div
          className={`flex items-center gap-3 px-4 py-3 ${resultvisible ? 'border-b border-gray-300' : ''
            }`}
        >
          <SearchIcon style={{ color: 'gray' }} />
          <input
            type="search"
            value={searchval}
            onChange={(e) => setsearchval(e.target.value)}
            onFocus={() => setresultvisible(true)}
            placeholder="Search photos..."
            className="w-full outline-none text-base placeholder-gray-500 text-gray-700 bg-transparent"
          />
        </div>

        {/* Search Results */}
        {resultvisible && (
          <div className="px-4 py-3 max-h-96 overflow-y-auto grid grid-cols-2 gap-4">
            {searchResult?.length ? (
              searchResult.map((item, i) => (
                <Link to={`/photo/${item._id}`} key={i} className="group relative">
                  <img
                    src={item.url}
                    className="h-40  object-cover rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
                    alt="search result"
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">No results found.</p>
            )}
          </div>
        )}
      </div>

      <div className='flex items-end gap-4 text-3xl text-gray-700 font-light px-3' >
        <AddIcon onClick={() => setisoverlay(!isoverlay)} style={{ fontSize: '2rem' }} />
        <NavLink to='/help-feedback'><HelpOutlineIcon style={{ fontSize: '2rem' }} /></NavLink>
        <NavLink to='/account'><AccountCircleIcon style={{ fontSize: '2rem' }} /></NavLink>
        <ThemeSwitcher />
      </div>
      {isoverlay && <AddMenu onClose={onClose} />}

    </header>

  )
}

export default Header