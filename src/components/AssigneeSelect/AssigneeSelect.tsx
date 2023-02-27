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
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { arrayUnion, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { tasksConverter, usersConverter } from 'helpers/converters';
import { getCurrentDate } from 'helpers/getCurrentDateInFormat';
import React, { FC, useContext } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from 'types/HistoryItem';
import { ITaskItem } from 'types/Task';
import { IUserItem } from 'types/User';

interface AssigneeSelectProps {
  boardId: string;
  currentUser: string | null;
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

  const [assignee] = useDocumentData<IUserItem>(
    doc(firestore, Collections.Users, currentUser || 'id').withConverter(usersConverter),
  );

  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

  const handleChangeAssignee = async (assigneeId: string) => {
    if (users) {
      const selectedUser = users.find((us) => us.id === assigneeId);
      if (selectedUser) {
        await updateDoc<ITaskItem>(
          doc(firestore, Collections.Tasks, taskId).withConverter(tasksConverter),
          {
            assignee: selectedUser.id,
            history: arrayUnion({
              initiator: user.id,
              action: 'assigneeChanged',
              from: assignee?.login || 'Unassigned',
              to: selectedUser.login,
              assigneeId: selectedUser.id,
              time: getCurrentDate(),
            } as HistoryItem),
          },
        );
      }
    }
  };

  if (!users) {
    return null;
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel color="secondary" id="assignee-select-label">
        {translate(InputsTranslationKeys.Assignee)}
      </InputLabel>
      <Select
        color="secondary"
        labelId="assignee-select-label"
        id="assignee-select"
        label={translate(InputsTranslationKeys.Assignee)}
        value={assignee?.id || ''}
        onChange={(e: SelectChangeEvent) => {
          handleChangeAssignee(e.target.value);
        }}
      >
        {users &&
          users.map(({ avatar, login, id }) => (
            <MenuItem divider value={id} key={login}>
              <Box display="flex" columnGap="1rem" alignItems="center">
                <Avatar sx={{ maxWidth: 25, maxHeight: 25 }} src={avatar} alt="user-avatar" />
                <Typography>{login}</Typography>
              </Box>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default AssigneeSelect;
