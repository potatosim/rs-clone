import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

  return (
    <FormControl size="small">
      <InputLabel color="secondary" id="status-select-label">
        {translate(InputsTranslationKeys.Status)}
      </InputLabel>
      <Select
        color="secondary"
        labelId="status-select-label"
        id="status-select"
        label={translate(InputsTranslationKeys.Status)}
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
