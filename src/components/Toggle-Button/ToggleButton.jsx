import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ConversionForm from './ConversionForm';

import { LuSettings } from "react-icons/lu";

const ToggleButton = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={toggleDrawer} variant="contained" style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', width: '4rem', height: '3rem'}}>
        <LuSettings className='text-black w-24 h-auto' />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div style={{ width: '400px' }}>
          <ConversionForm />
        </div>
      </Drawer>
    </>
  );
};

export default ToggleButton;
