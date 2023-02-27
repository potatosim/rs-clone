import {
  Accordion,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControlLabel,
  Checkbox,
  Switch,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import ThemeThumbnail from 'components/Theme/ThemeThumbnail';
import ArrowIcon from '@mui/icons-material/ExpandMore';
import { addDoc, collection } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import styled from '@emotion/styled';
import { UserContext } from 'components/RequireAuth';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';
import { ModalWrapper } from 'components/common/ModalWrapper';
import ButtonGroup from '@mui/material/ButtonGroup';
import { TwitterPicker } from 'react-color';

interface ThemeCreatorProps {
  setIsCreating: (value: boolean) => void;
}

const ModalContentWrapper = styled(Paper)`
  position: fixed;
  display: flex;
  align-items: start;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  margin: 25px;
  border: 10px solid grey;
`;

const ThumbnailWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  flex-grow: 10;
  padding: 1rem;
`;

const ThemeCreator: FC<ThemeCreatorProps> = ({ setIsCreating }) => {
  const { firestore } = useContext(FirebaseContext);
  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);
  const [name, setName] = useState<string>('New Theme');
  const [primary, setPrimary] = useState<string>('#9E9E9E');
  const [secondary, setSecondary] = useState<string>('#9E9E9E');
  const [checked, setChecked] = useState<boolean>(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { user } = useContext(UserContext);
  const theme = useTheme();

  const addTheme = async () => {
    if (user) {
      setIsCreating(false);
      await addDoc(collection(firestore, 'themes'), {
        creator: user.id,
        name: name,
        primary: primary,
        secondary: secondary,
        isPublic: checked,
        holders: [user.id],
        mode,
      });
    }
  };

  return (
    <ModalWrapper open={true} onClose={() => setIsCreating(false)}>
      <ModalContentWrapper
        elevation={24}
        sx={{
          flexDirection: { sm: 'row', xs: 'column' },
          maxHeight: '100%',
          overflowY: 'auto',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box sx={{ maxWidth: '600px', width: '100%', flexShrink: '10', p: '0 auto' }}>
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(InputsTranslationKeys.Name, { ns: TranslationNameSpaces.Inputs })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label={translate(InputsTranslationKeys.Name, { ns: TranslationNameSpaces.Inputs })}
                type="text"
                color="secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: '250px', mb: '20px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(InputsTranslationKeys.Primary, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TwitterPicker color={primary} onChangeComplete={(c) => setPrimary(c.hex)} />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(InputsTranslationKeys.Secondary, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TwitterPicker color={secondary} onChangeComplete={(c) => setSecondary(c.hex)} />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(TypographyTranslationKeys.Privacy, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={<Checkbox color="secondary" checked={checked} />}
                onChange={() => {
                  setChecked(!checked);
                }}
                label={translate(InputsTranslationKeys.AddToCommunityThemes, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(TypographyTranslationKeys.Mode, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>
                {translate(TypographyTranslationKeys.Light, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
              <Switch
                color="secondary"
                onChange={(e) => {
                  if (e.target.checked) {
                    setMode('dark');
                  } else {
                    setMode('light');
                  }
                }}
              />
              <Typography>
                {translate(TypographyTranslationKeys.Dark, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
        </Box>
        <Divider
          orientation={useMediaQuery(theme.breakpoints.down('sm')) ? 'horizontal' : 'vertical'}
          sx={{ backgroundColor: 'grey', width: '4px' }}
          flexItem={true}
        />
        <ThumbnailWrapper>
          <ThemeThumbnail name={name} primary={primary} secondary={secondary} mode={mode} />
          <ButtonGroup>
            <Button variant="contained" onClick={() => addTheme()}>
              {translate(ButtonTranslationKeys.Create)}
            </Button>
            <Button variant="contained" onClick={() => setIsCreating(false)}>
              {translate(ButtonTranslationKeys.Cancel)}
            </Button>
          </ButtonGroup>
        </ThumbnailWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default ThemeCreator;
