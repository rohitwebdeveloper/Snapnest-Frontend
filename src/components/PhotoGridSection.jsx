import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import NoData from './NoData';

const PhotoGridSection = ({ title, photos = [], backbutton = true }) => {
  const navigate = useNavigate();

  return (
    <main className="px-6 dark:bg-gray-900">
      {backbutton && (
        <KeyboardBackspaceOutlinedIcon
          onClick={() => navigate(-1)}
          className="cursor-pointer text-black dark:text-gray-100"
        />
      )}
      <h2 className="text-2xl font-medium mt-4 mb-6 text-black dark:text-gray-100">{title}</h2>

      <div className="flex flex-wrap gap-4">
        {photos.length !== 0 ? (
          photos.map((item, i) => {
            const photo = item.photo || item;
            const id = photo._id || i;
            const url = photo.url;
            const date = photo.createdAt
              ? new Date(photo.createdAt).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
              })
              : '';

            return (
              <Link key={i} to={`/photo/${id}`}>
                {date && (
                  <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">{date}</div>
                )}
                <div className="relative w-fit max-h-52 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:scale-105">
                  <img
                    src={url}
                    alt="img"
                    className="max-h-52 object-cover"
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <NoData message={`No ${title} !`} />
        )}
      </div>
    </main>

  );
};

export default PhotoGridSection;
