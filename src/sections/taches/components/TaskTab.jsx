import * as React from 'react';
import PropTypes from "prop-types"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Grid from '@mui/material/Unstable_Grid2';

import TaskCard from './TaskCard';
import TaskGrid from '../list/TaskGrid';


export default function TaskTab({ tasks }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="task">
            <Tab label="Cards" value="1" />
            <Tab label="Data Grid" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Grid container spacing={3}>
        
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        )) }
      </Grid></TabPanel>
        <TabPanel value="2">
            <TaskGrid tasks={tasks}/>
        </TabPanel >
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
TaskTab.propTypes = {
  tasks: PropTypes.any
}
