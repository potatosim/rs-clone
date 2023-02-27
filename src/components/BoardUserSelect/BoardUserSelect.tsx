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
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import { collection, documentId, query, where } from 'firebase/firestore';
import { usersConverter } from 'helpers/converters';
import React, { FC, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
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

  const { t: translate } = useTranslation(TranslationNameSpaces.Inputs);

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
    <FormControl color="secondary" size="small" fullWidth>
      <InputLabel id="users-select-label">
        {translate(InputsTranslationKeys.Participants)}
      </InputLabel>
      <Select
        color="secondary"
        labelId="users-select-label"
        id="users-select"
        label={translate(InputsTranslationKeys.Participants)}
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
