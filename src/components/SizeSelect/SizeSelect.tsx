import styled from '@emotion/styled';
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

interface ISizeItem {
  size: string;
  color: string;
  symbol: string;
}

export const sizeItems: ISizeItem[] = [
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

const SelectedBox = styled(Box)`
  display: flex;
  column-gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    column-gap: 0.5rem;
  }
`;

const SizeItem = ({ color, size, symbol }: ISizeItem) => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Typography);

  return (
    <SelectedBox>
      <Box sx={{ borderRadius: '50%', bgcolor: color, width: 16, height: 16 }} />
      <Box>{symbol}</Box>
      <Typography>{translate(size.toLowerCase())}</Typography>
    </SelectedBox>
  );
};

const sizes: OptionItem[] = sizeItems.map(({ color, size, symbol }) => ({
  value: size,
  title: <SizeItem color={color} size={size} symbol={symbol} />,
}));

interface SelectProps {
  currentSize: string;
  onSizeChange: (e: SelectChangeEvent) => void;
}

const SizeSelect: FC<SelectProps> = ({ currentSize, onSizeChange }) => {
  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

  return (
    <FormControl size="small">
      <InputLabel color="secondary" id="size-select-label">
        {translate(InputsTranslationKeys.Size)}
      </InputLabel>
      <Select
        color="secondary"
        labelId="size-select-label"
        id="size-select"
        label={translate(InputsTranslationKeys.Size)}
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
