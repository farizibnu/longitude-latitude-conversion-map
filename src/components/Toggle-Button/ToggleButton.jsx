import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ConversionForm from '../Forms/ConversionForm';

import { LuSettings } from "react-icons/lu";

/**
 * ToggleButton component that renders a button to open and close a conversion form.
 * 
 * @returns {JSX.Element} The rendered ToggleButton component.
 */
const ToggleButton = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={toggleDrawer} variant="contained"  
        style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', width: '4rem', height: '3rem'}}
      >
        <LuSettings className='text-black w-24 h-auto hover:text-emerald-500 hover:animate-[spin_1.5s_linear_0.5]' />
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
