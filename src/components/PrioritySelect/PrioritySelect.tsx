import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { OptionItem } from 'components/common/CustomSelect';

import { FC } from 'react';

interface PriorityItem {
  priority: string;
  color: string;
  symbol: string;
}

export const priorityItems: PriorityItem[] = [
  {
    priority: 'Urgent',
    color: '#ff0000',
    symbol: '🌋',
  },
  {
    priority: 'High',
    color: '#ff8800',
    symbol: '🪓',
  },
  {
    priority: 'Medium',
    color: '#0000ff',
    symbol: '⚔️',
  },
  {
    priority: 'Low',
    color: '#00ff00',
    symbol: '🎉',
  },
];

const priorities: OptionItem[] = priorityItems.map(({ color, priority, symbol }) => ({
  value: priority,
  title: (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Box sx={{ borderRadius: '50%', bgcolor: color, width: 16, height: 16 }} />
      <Box>{symbol}</Box>
      <Typography>{priority}</Typography>
    </Box>
  ),
}));

interface SelectProps {
  currentPriority: string;
  onPriorityChange: (e: SelectChangeEvent) => void;
}

const PrioritySelect: FC<SelectProps> = ({ currentPriority, onPriorityChange }) => {
  return (
    <FormControl size="small">
      <Select value={currentPriority || 'Priority'} onChange={onPriorityChange}>
        {priorities.map(({ title, value }) => (
          <MenuItem value={value} key={value}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
