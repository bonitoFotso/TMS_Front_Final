import PropTypes from "prop-types"

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import StatusSort from './StatusSort';
import ActivitesSort from './ActivitesSort';
import PrioritesSort from './PrioritesSort';
import CategoriesSort from './CategoriesSort';
import AssociationsSort from './AssociationsSort';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sort({setTasks}) {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Item>
            <ActivitesSort setTasks={setTasks}/>
        </Item>
        <Item>
            <CategoriesSort setTasks={setTasks}/>
        </Item>
        <Item>
            <StatusSort setTasks={setTasks}/>
        </Item>
        <Item>
            <AssociationsSort setTasks={setTasks}/>
        </Item>
        <Item>
            <PrioritesSort setTasks={setTasks}/>
        </Item>
      </Stack>
    </div>
  );
}
Sort.propTypes = {
  setTasks: PropTypes.any
}
