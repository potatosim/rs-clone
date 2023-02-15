import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

export interface OptionItem {
  value: string;
  title: React.ReactNode | React.ReactElement;
}

interface SelectProps {
  options: Array<OptionItem>;
  currentOption: OptionItem;
  onChange: (e: SelectChangeEvent) => void;
}

const CustomSelect: FC<SelectProps> = ({ options, currentOption, onChange }) => {
  return (
    <FormControl size="small">
      <InputLabel id="status-select-label">Status</InputLabel>
      <Select
        labelId="status-select-label"
        id="status-select"
        label="Status"
        value={currentOption.value}
        onChange={onChange}
      >
        {options.map(({ title, value }) => (
          <MenuItem value={value} key={value}>
            {title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
