import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Typography,
  InputLabel,
  Skeleton,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { UserContext } from 'components/RequireAuth';
import { Collections } from 'enum/Collection';
import { collection, documentId, query, where } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import React, { FC, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IUserItem } from 'types/User';

interface BoardUserSelectProps {
  userIds: string[];
  setUserIds: (ids: string[]) => void;
}

const BoardUserSelect: FC<BoardUserSelectProps> = ({ userIds, setUserIds }) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [users, loading] = useCollectionData<IUserItem>(
    query(
      collection(firestore, Collections.Users).withConverter(usersConverter),
      where(documentId(), '!=', user.id),
    ),
  );

  const handleUserPick = (event: SelectChangeEvent<typeof userIds>) => {
    const {
      target: { value },
    } = event;
    setUserIds(typeof value === 'string' ? value.split(',') : value);
  };

  if (loading) {
    return <Skeleton width={336} height={50} />;
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="users-select-label">Participants</InputLabel>
      <Select
        labelId="users-select-label"
        id="users-select"
        label="Participants"
        multiple
        value={userIds}
        onChange={handleUserPick}
        renderValue={(selected) => {
          if (users) {
            return selected.map((selectItem) => {
              const pickedUser = users.find((findUser) => findUser.id === selectItem);
              if (pickedUser) {
                return (
                  <Chip
                    avatar={<Avatar src={pickedUser.avatar} />}
                    key={pickedUser.login}
                    label={pickedUser.login}
                  />
                );
              }
            });
          }
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

export default BoardUserSelect;
