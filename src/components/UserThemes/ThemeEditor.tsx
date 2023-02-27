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
  Checkbox,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import ThemeThumbnail from './ThemeThumbnail';
import ArrowIcon from '@mui/icons-material/ExpandMore';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import styled from '@emotion/styled';
import { Collections } from 'enum/Collection';
import { ITheme } from 'types/Theme';
import { UserContext } from 'components/RequireAuth';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  InputsTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

interface ThemeCreatorProps extends ITheme {
  setIsEditing(value: boolean): void;
}

const ModalWrapper = styled(Box)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  background: rgba(158, 158, 158, 0.7);
`;

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
`;

const ThemeCreator: FC<ThemeCreatorProps> = ({
  id,
  name,
  primary,
  secondary,
  isPublic,
  mode,
  setIsEditing,
}) => {
  const { firestore } = useContext(FirebaseContext);
  const [newName, setNewName] = useState<string>(name);
  const [newPrimary, setNewPrimary] = useState<string>(primary);
  const [newSecondary, setNewSecondary] = useState<string>(secondary);
  const [checked, setChecked] = useState<boolean>(isPublic);
  const [themeMode, setMode] = useState<'light' | 'dark'>(mode);
  const { user } = useContext(UserContext);
  const theme = useTheme();

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

  const editTheme = async () => {
    if (user) {
      setIsEditing(false);
      updateDoc(doc(firestore, Collections.Themes, id), {
        name: newName,
        primary: newPrimary,
        secondary: newSecondary,
        isPublic: checked,
        mode: themeMode,
      });
    }
  };

  return (
    <ModalWrapper>
      <ModalContentWrapper
        elevation={24}
        sx={{
          flexDirection: { sm: 'row', xs: 'column' },
          maxHeight: '100%',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ maxWidth: '600px', width: '100%', flexShrink: '10', p: '0 auto' }}>
          <Accordion disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(InputsTranslationKeys.Name, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label={translate(InputsTranslationKeys.Name, { ns: TranslationNameSpaces.Inputs })}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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
              <TextField
                label={translate(InputsTranslationKeys.Primary, {
                  ns: TranslationNameSpaces.Inputs,
                })}
                type="color"
                value={newPrimary}
                onChange={(e) => setNewPrimary(e.target.value)}
                sx={{ width: '250px', mb: '20px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(InputsTranslationKeys.Primary, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label={translate(InputsTranslationKeys.Primary, {
                  ns: TranslationNameSpaces.Inputs,
                })}
                type="color"
                value={newSecondary}
                onChange={(e) => setNewSecondary(e.target.value)}
                sx={{ width: '250px' }}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">
                {translate(TypographyTranslationKeys.Privacy, {
                  ns: TranslationNameSpaces.Typography,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={<Checkbox checked={checked} />}
                onChange={() => {
                  if (checked) {
                    setChecked(false);
                  } else {
                    setChecked(true);
                  }
                }}
                label={translate(InputsTranslationKeys.AddToCommunityThemes, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              />
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ backgroundColor: 'black' }} />
          <Accordion square disableGutters={true}>
            <AccordionSummary expandIcon={<ArrowIcon />}>
              <Typography variant="h6">Mode</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Light</Typography>
              <Switch
                defaultChecked={mode === 'dark' ? true : false}
                onChange={(e) => {
                  if (e.target.checked) {
                    setMode('dark');
                  } else {
                    setMode('light');
                  }
                }}
              />
              <Typography>Dark</Typography>
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
          <ThemeThumbnail
            name={newName}
            primary={newPrimary}
            secondary={newSecondary}
            mode={themeMode}
          />
          <Box sx={{ m: '1rem auto 2rem' }}>
            <Button
              variant="contained"
              sx={{ width: '100px', mr: '1rem' }}
              onClick={() => editTheme()}
            >
              {translate(ButtonTranslationKeys.Confirm)}
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => setIsEditing(false)}>
              {translate(ButtonTranslationKeys.Cancel)}
            </Button>
          </Box>
        </ThumbnailWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default ThemeCreator;
