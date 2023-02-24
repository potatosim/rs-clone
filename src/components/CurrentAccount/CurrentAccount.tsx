import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  Collapse,
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
// import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TaskCardAccount from 'components/TaskCardAccount';

export const StyledItemWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
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
  width: 80%;
  column-gap: 1rem;
  align-items: flex-start;
`;

const CurrentAccount = () => {
  const { firestore } = useContext(FirebaseContext);
  // const [updatePassword, , error] = useUpdatePassword(auth);
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user.avatar);
  const [login, setLogin] = useState(user.login);
  // const [password, setPassword] = useState('');
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

  // const handleUpdatePassword = async (newPassword: string) => {
  //   await updatePassword(newPassword);
  // };

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
        <StyledItemWrapper>
          <UploadButton
            getFileUrl={(fileUrl) => {
              handleUpdateAvatar(fileUrl, user.id);
            }}
          >
            <Avatar src={avatar} sx={{ width: '100%', height: '100%' }} />
          </UploadButton>
          {!isLoginChange ? (
            <>
              <Typography variant="h4" fontWeight={600}>
                {login}
              </Typography>
              <Tooltip title="Change my login">
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsLoginChange(true);
                  }}
                >
                  Change login
                </Button>
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
                    <Tooltip title="Close">
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
                Accept changes
              </Button>
            </>
          )}
        </StyledItemWrapper>
        <Box sx={{ width: '80%' }}>
          <ListItemButton onClick={handleBoardsOpen}>
            <ListItemText primary="Available boards" />
            {isBoardsOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </ListItemButton>
        </Box>
        <Box sx={{ width: '80%' }}>
          <ListItemButton onClick={handleTasksOpen}>
            <ListItemText primary="My list of tasks" />
            {isTasksOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </ListItemButton>
        </Box>
        {/* <StyledItemWrapper>
        <TextField
          label="New password"
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={() => {
            handleUpdatePassword(password);
          }}
        >
          Update password
        </Button>
      </StyledItemWrapper> */}
      </StyledPaper>
      <Collapse orientation="horizontal" in={isBoardsOpen}>
        <Box
          sx={{
            maxHeight: 600,
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {boards && boards.length ? (
              <>
                {boards && boards.map((board) => <BoardCardAccount key={board.id} board={board} />)}
              </>
            ) : (
              <Typography variant="h5" fontWeight={500}>
                You don`t have any boards yet
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
      <Collapse orientation="horizontal" in={isTasksOpen}>
        <Box
          sx={{
            maxHeight: 600,
            overflowY: 'scroll',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 1,
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tasks && tasks.length ? (
              <>{tasks && tasks.map((task) => <TaskCardAccount key={task.id} task={task} />)}</>
            ) : (
              <Typography variant="h5" fontWeight={500}>
                You don`t have any tasks yet
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
    </CommonWrapper>
  );
};

export default CurrentAccount;
