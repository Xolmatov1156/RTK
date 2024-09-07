import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='!bg-red-500'>
        <Toolbar>
          <AppleIcon className='scale-125'/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button color="inherit" variant='outlined' onClick={() => navigate('/add')}>Add Product</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
