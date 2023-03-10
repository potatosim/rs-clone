import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CommonWrapper, StyledPaper } from 'components/CurrentAccount/CurrentAccount';
import { FirebaseContext } from 'components/FirebaseProvider/FirebaseProvider';
import { Collections } from 'enum/Collection';
import { collection, query, where } from 'firebase/firestore';
import { boardsConverter } from 'helpers/converters';
import React, { FC, useContext, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IBoardItem } from 'types/Board';
import { IUserItem } from 'types/User';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BoardCardAccount from 'components/BoardCardAccount';
import { UserContext } from 'components/RequireAuth';
import CustomCollapse from 'components/CustomCollapse';
import { useTranslation } from 'react-i18next';
import {
  ButtonTranslationKeys,
  TranslationNameSpaces,
  TypographyTranslationKeys,
} from 'enum/Translations';

interface AnotherAccountProps {
  anotherUser: IUserItem;
}

const AnotherAccount: FC<AnotherAccountProps> = ({ anotherUser }) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down(768));

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Buttons,
    TranslationNameSpaces.Typography,
  ]);

  const [boards] = useCollectionData<IBoardItem>(
    query(
      collection(firestore, Collections.Boards).withConverter(boardsConverter),
      where('allowedUsers', 'array-contains', anotherUser.id),
    ),
  );

  const [isBoardsOpen, setIsBoardsOpen] = useState(false);

  const handleBoardsOpen = () => {
    setIsBoardsOpen(!isBoardsOpen);
  };

  const filteredBoards = boards?.filter((board) => board.allowedUsers.includes(user.id));

  return (
    <CommonWrapper>
      <StyledPaper elevation={12}>
        <Avatar src={anotherUser.avatar} sx={{ width: '150px', height: '150px' }} />

        <Typography variant="h4" fontWeight={600}>
          {anotherUser.login}
        </Typography>

        {filteredBoards && filteredBoards.length ? (
          <Box sx={{ width: '80%' }}>
            <ListItemButton onClick={handleBoardsOpen}>
              <ListItemText primary={translate(ButtonTranslationKeys.AvailableBoards)} />
              {isBoardsOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
            </ListItemButton>
            {mediaQuery && (
              <CustomCollapse
                orientation="vertical"
                isOpen={isBoardsOpen}
                children={
                  filteredBoards &&
                  filteredBoards.map((board) => <BoardCardAccount key={board.id} board={board} />)
                }
              />
            )}
          </Box>
        ) : (
          <Typography variant="h5" fontWeight={500}>
            {translate(TypographyTranslationKeys.BoardsNotMatched, {
              ns: TranslationNameSpaces.Typography,
            })}
          </Typography>
        )}
      </StyledPaper>
      {!mediaQuery && (
        <CustomCollapse
          isOpen={isBoardsOpen}
          children={
            filteredBoards &&
            filteredBoards.map((board) => <BoardCardAccount key={board.id} board={board} />)
          }
        />
      )}
    </CommonWrapper>
  );
};

export default AnotherAccount;
