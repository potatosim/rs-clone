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
  ButtonGroup,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import ThemeThumbnail from 'components/Theme/ThemeThumbnail';
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
import { ModalWrapper } from 'components/common/ModalWrapper';
import { TwitterPicker } from 'react-color';

interface ThemeCreatorProps extends ITheme {
  setIsEditing(value: boolean): void;
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
    <ModalWrapper open={true} onClose={() => setIsEditing(false)}>
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
                {translate(InputsTranslationKeys.Name, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label={translate(InputsTranslationKeys.Name, { ns: TranslationNameSpaces.Inputs })}
                color="secondary"
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
              <TwitterPicker color={newPrimary} onChangeComplete={(c) => setNewPrimary(c.hex)} />
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
              <TwitterPicker
                color={newSecondary}
                onChangeComplete={(c) => setNewSecondary(c.hex)}
              />
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
                defaultChecked={mode === 'dark' ? true : false}
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
          <ThemeThumbnail
            name={newName}
            primary={newPrimary}
            secondary={newSecondary}
            mode={themeMode}
          />
          <ButtonGroup>
            <Button variant="contained" onClick={() => editTheme()}>
              {translate(ButtonTranslationKeys.Confirm)}
            </Button>
            <Button variant="contained" onClick={() => setIsEditing(false)}>
              {translate(ButtonTranslationKeys.Cancel)}
            </Button>
          </ButtonGroup>
        </ThumbnailWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default ThemeCreator;
