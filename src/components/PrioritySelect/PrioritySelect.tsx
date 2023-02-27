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
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IPriorityItem {
  priority: string;
  color: string;
  symbol: string;
}

export const priorityItems: IPriorityItem[] = [
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

interface SelectProps {
  currentPriority: string;
  onPriorityChange: (e: SelectChangeEvent) => void;
}

const PriorityItem = ({ color, priority, symbol }: IPriorityItem) => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Typography);

  return (
    <Box sx={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
      <Box sx={{ borderRadius: '50%', bgcolor: color, width: 16, height: 16 }} />
      <Box>{symbol}</Box>
      <Typography>{translate(priority.toLowerCase())}</Typography>
    </Box>
  );
};

const priorities: OptionItem[] = priorityItems.map(({ color, priority, symbol }) => ({
  value: priority,
  title: <PriorityItem color={color} priority={priority} symbol={symbol} />,
}));

const PrioritySelect: FC<SelectProps> = ({ currentPriority, onPriorityChange }) => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

  return (
    <FormControl size="small">
      <InputLabel color="secondary" id="priority-select-label">
        {translate(InputsTranslationKeys.Priority)}
      </InputLabel>
      <Select
        color="secondary"
        labelId="priority-select-label"
        id="priority-select"
        label={translate(InputsTranslationKeys.Priority)}
        value={currentPriority || 'Priority'}
        onChange={onPriorityChange}
      >
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
