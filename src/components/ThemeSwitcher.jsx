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
    <IconButton onClick={toggleTheme} color="inherit" style={theme==='light' ? { backgroundColor:'white'} : {backgroundColor:'khaki'}} >
      {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
