import React, { useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Close, CalendarToday, LocationOn } from '@mui/icons-material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DetailMenu from '../components/DetailMenu';
import { useNavigate } from 'react-router-dom';

const ImageDetail = () => {

  const [infovisible, setinfovisible] = useState(false)
  const [detailmenuVisible, setdetailmenuVisible] = useState(false)
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate()

  return (
    <main className='bg-gray-900 h-screen flex'>
      <div className='w-full' >
        <div className='flex justify-between px-4 text-white py-6 mb-10'>
          <KeyboardBackspaceOutlinedIcon style={{ fontSize: '25px' }} onClick={() => navigate(-1)} />
          <div className='flex gap-5 '>
            <ShareOutlinedIcon style={{ fontSize: '25px' }} />
            <InfoOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setinfovisible(!infovisible)} />
            <StarBorderOutlinedIcon style={{ fontSize: '25px' }} />
            <DeleteForeverOutlinedIcon style={{ fontSize: '25px' }} />
            <MoreVertOutlinedIcon style={{ fontSize: '25px' }} onClick={() => setdetailmenuVisible(!detailmenuVisible)} />
          </div>
        </div>
        <figure className=' bg-transparent flex justify-center '>
          <img src="https://images.unsplash.com/photo-1749810364373-5e2f18bb842a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo"
            className='max-h-[70vh] rounded-sm'
          />
        </figure>
      </div>
      {
        infovisible &&
        <aside className="w-[30vw] bg-white p-7 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl  ">Info</h2>
            <Close className="cursor-pointer" onClick={() => setinfovisible(false)} />
          </div>

          <div className="space-y-8 text-lg text-gray-700 ">
            <div className="flex items-center  gap-5">
              <InsertDriveFileOutlinedIcon style={{ fontSize: '25px' }} />
              <span>Logo.png</span>
            </div>
            <div className="flex items-center gap-5">
              <CalendarToday style={{ fontSize: '25px' }} />
              <span>21 June 2024</span>
            </div>
            <div className="flex items-center gap-5">
              <StorageOutlinedIcon style={{ fontSize: '25px' }} />
              <span> 5.04MB</span>
            </div>
            <div className="flex items-center justify-between rounded  ">
              <LocationOn className="text-xl mr-2" />
              <input
                type="text"
                className="w-full outline-none border-b "
                placeholder="Add Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <CreateOutlinedIcon />
            </div>
          </div>


          <input
            type='text'
            className="w-full border-b rounded p-2  outline-0"
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
          // onClick={() => onSave({ description, location })}
          >
            Save
          </button>
        </aside>
      }
      {
        detailmenuVisible &&
        <DetailMenu setdetailmenuVisible={setdetailmenuVisible} />
      }
    </main>
  )
}

export default ImageDetail