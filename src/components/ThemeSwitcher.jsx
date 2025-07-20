import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../features/theme/themeSlice';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === 'light') {
      dispatch(darkTheme());
      document.documentElement.classList.remove('light');
    } else {
      dispatch(lightTheme());
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div
      onClick={toggleTheme}
      color="inherit"
      style={{
        borderRadius: '100%',
        // backgroundColor: theme === 'light' ? '#f0f0f0' : '#333333',
        color: theme === 'light' ? '#333333' : '#f0f0f0',
      }}
    >
      {theme === 'light' ? <DarkModeIcon style={{ fontSize: '2rem', }} /> : <LightModeIcon style={{ fontSize: '2rem' }} />}
    </div>
  );
};

export default ThemeSwitcher;
