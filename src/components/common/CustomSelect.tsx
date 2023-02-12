import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
      <Select value={currentOption.value} onChange={onChange}>
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
