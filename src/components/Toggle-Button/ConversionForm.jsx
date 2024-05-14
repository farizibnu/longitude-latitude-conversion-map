import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button } from '@mui/material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div 
      className='text-center'
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ConversionForm = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="p-4">
      <Tabs value={value} onChange={handleChange} aria-label="conversion tabs" centered>
        <Tab label="DMS to DD" />
        <Tab label="DD to DMS" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary">
          Convert
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary">
          Convert
        </Button>

      </TabPanel>
    </div>
  );
};

export default ConversionForm;
