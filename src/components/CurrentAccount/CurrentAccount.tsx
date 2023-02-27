import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import UploadButton from 'components/UploadButton/UploadButton';
import { Collections } from 'enum/Collection';
import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { tasksConverter, usersConverter } from 'helpers/converters';
import { useBoards } from 'hooks/boardHooks/useBoards';
import React, { useContext, useState } from 'react';
import { IUserItem } from 'types/User';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BoardCardAccount from 'components/BoardCardAccount';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TaskCardAccount from 'components/TaskCardAccount';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'enum/AppRoutes';
import EditIcon from '@mui/icons-material/Edit';
import CustomCollapse from 'components/CustomCollapse';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

export const StyledItemWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding: 1rem;
`;

export const StyledPaper = styled(Paper)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  flex-direction: column;
  row-gap: 2rem;
`;

export const CommonWrapper = styled(Box)`
  display: flex;
  width: 50%;
  column-gap: 1rem;
  align-items: flex-start;
`;

const CurrentAccount = () => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user.avatar);
  const [login, setLogin] = useState(user.login);
  const [isLoginChange, setIsLoginChange] = useState(false);
  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  const { boards } = useBoards();
  const [tasks] = useCollectionData(
    query(
      collection(firestore, Collections.Tasks).withConverter(tasksConverter),
      where('assignee', '==', user.id),
    ),
  );
  const navigate = useNavigate();

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  const handleUpdateAvatar = async (newAvatar: string, userId: string) => {
    setAvatar(newAvatar);
    await updateDoc<IUserItem>(
      doc(firestore, Collections.Users, userId).withConverter(usersConverter),
      {
        avatar: newAvatar,
      },
    );
  };

  const handleUpdateLogin = async (userLogin: string, userId: string) => {
    await updateDoc<IUserItem>(
      doc(firestore, Collections.Users, userId).withConverter(usersConverter),
      {
        login: userLogin,
      },
    );
  };

  const handleBoardsOpen = () => {
    setIsBoardsOpen(!isBoardsOpen);
    if (isTasksOpen) {
      setIsTasksOpen(false);
    }
  };

  const handleTasksOpen = () => {
    setIsTasksOpen(!isTasksOpen);
    if (isBoardsOpen) {
      setIsBoardsOpen(false);
    }
  };

  const handleCloseChanges = () => {
    setIsLoginChange(false);
    setLogin(user.login);
  };

  return (
    <CommonWrapper>
      <StyledPaper elevation={12}>
        <UploadButton
          getFileUrl={(fileUrl) => {
            handleUpdateAvatar(fileUrl, user.id);
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={avatar} sx={{ width: '100px', height: '100px' }} />
            <PanToolAltIcon />
          </Box>
        </UploadButton>
        <StyledItemWrapper>
          {!isLoginChange ? (
            <>
              <Typography variant="h4" fontWeight={600}>
                {login}
              </Typography>

              <Tooltip title={translate(ButtonTranslationKeys.ChangeLogin)}>
                <IconButton
                  onClick={() => {
                    setIsLoginChange(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <TextField
                size="small"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title={translate(ButtonTranslationKeys.Close, {
                        ns: TranslationNameSpaces.Buttons,
                      })}
                    >
                      <IconButton color="error" onClick={handleCloseChanges}>
                        {' '}
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />

              <Button
                disabled={login === user.login || login === ''}
                onClick={() => {
                  handleUpdateLogin(login, user.id);
                  setIsLoginChange(false);
                }}
              >
                {translate(ButtonTranslationKeys.AcceptChanges)}
              </Button>
            </>
          )}
        </StyledItemWrapper>
        {boards && boards.length ? (
          <Box sx={{ width: '70%' }}>
            <ListItemButton onClick={handleBoardsOpen}>
              <ListItemText primary={translate(ButtonTranslationKeys.MyBoards)} />
              {isBoardsOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
            </ListItemButton>
          </Box>
        ) : (
          <Paper
            elevation={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1rem',
              rowGap: '1rem',
              width: '70%',
            }}
          >
            <Typography variant="h6" fontWeight={500}>
              {translate(TypographyTranslationKeys.NoBoardsYet, {
                ns: TranslationNameSpaces.Typography,
              })}
            </Typography>
            <Button
              onClick={() => {
                navigate(AppRoutes.Boards);
              }}
              color="secondary"
              variant="contained"
            >
              {translate(ButtonTranslationKeys.CreateMyBoard)}
            </Button>
          </Paper>
        )}
        {tasks && tasks.length ? (
          <Box sx={{ width: '70%' }}>
            <ListItemButton onClick={handleTasksOpen}>
              <ListItemText primary={translate(ButtonTranslationKeys.MyListOfTasks)} />
              {isTasksOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
            </ListItemButton>
          </Box>
        ) : (
          <Typography variant="h6" fontWeight={500}>
            {translate(TypographyTranslationKeys.NoTasksYet, {
              ns: TranslationNameSpaces.Typography,
            })}
          </Typography>
        )}
      </StyledPaper>
      <CustomCollapse
        isOpen={isBoardsOpen}
        children={
          boards && boards.map((board) => <BoardCardAccount key={board.id} board={board} />)
        }
      />
      <CustomCollapse
        isOpen={isTasksOpen}
        children={tasks && tasks.map((task) => <TaskCardAccount key={task.id} task={task} />)}
      />
    </CommonWrapper>
  );
};

export default CurrentAccount;
