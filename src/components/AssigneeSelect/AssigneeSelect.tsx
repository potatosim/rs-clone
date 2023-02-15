import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { arrayUnion, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { tasksConverter, usersConverter } from 'helpers/converters';
import React, { FC, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ITaskItem } from 'types/Task';
import { IUserItem } from 'types/User';

interface AssigneeSelectProps {
  boardId: string;
  currentUser: IUserItem | null;
  taskId: string;
}

const AssigneeSelect: FC<AssigneeSelectProps> = ({ boardId, currentUser, taskId }) => {
  const { user } = useContext(UserContext);
  const { firestore } = useContext(FirebaseContext);

  const [users] = useCollectionData<IUserItem>(
    query(
      collection(firestore, Collections.Users).withConverter(usersConverter),
      where('boards', 'array-contains', boardId),
    ),
  );

  const handleChangeAssignee = async (assigneeId: string) => {
    if (users) {
      const selectedUser = users.find((us) => us.id === assigneeId);
      if (selectedUser) {
        await updateDoc<ITaskItem>(
          doc(firestore, Collections.Tasks, taskId).withConverter(tasksConverter),
          {
            assignee: selectedUser,
            history: arrayUnion({
              initiator: user,
              action: 'assigneeChanged',
              from: currentUser?.login || 'Unassigned',
              to: selectedUser.login,
              time: new Date().toLocaleString(),
            }),
          },
        );
      }
    }
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="assignee-select-label">Assignee</InputLabel>
      <Select
        labelId="assignee-select-label"
        id="assignee-select"
        label="Assignee"
        value={currentUser?.id}
        onChange={(e: SelectChangeEvent) => {
          handleChangeAssignee(e.target.value);
        }}
      >
        {users &&
          users.map(({ avatar, login, id }) => (
            <MenuItem divider value={id} key={login}>
              <Box display="flex" columnGap="5px" alignItems="center">
                <Avatar src={avatar} />
                <Typography>{login}</Typography>
              </Box>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default AssigneeSelect;
