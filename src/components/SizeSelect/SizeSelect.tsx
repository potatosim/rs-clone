import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { OptionItem } from 'components/common/CustomSelect';

import { FC } from 'react';

interface SizeItem {
  size: string;
  color: string;
  symbol: string;
}

export const sizeItems: SizeItem[] = [
  {
    size: 'X-Large',
    color: '#ff0000',
    symbol: '🐳',
  },
  {
    size: 'Large',
    color: '#ff8800',
    symbol: '🐙',
  },
  {
    size: 'Medium',
    color: '#d9ff00',
    symbol: '🐖',
  },
  {
    size: 'Small',
    color: '#1100ff',
    symbol: '🐈',
  },
  {
    size: 'Tiny',
    color: '#00ff00',
    symbol: '🐁',
  },
];

const sizes: OptionItem[] = sizeItems.map(({ color, size, symbol }) => ({
  value: size,
  title: (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Box sx={{ borderRadius: '50%', bgcolor: color, width: 16, height: 16 }} />
      <Box>{symbol}</Box>
      <Typography>{size}</Typography>
    </Box>
  ),
}));

interface SelectProps {
  currentSize: string;
  onSizeChange: (e: SelectChangeEvent) => void;
}

const SizeSelect: FC<SelectProps> = ({ currentSize, onSizeChange }) => {
  return (
    <FormControl size="small">
      <InputLabel id="size-select-label">Size</InputLabel>
      <Select
        labelId="size-select-label"
        id="size-select"
        label="Size"
        value={currentSize || 'Size'}
        onChange={onSizeChange}
      >
        {sizes.map(({ title, value }) => (
          <MenuItem value={value} key={value}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SizeSelect;
