import { Avatar, Paper, Typography } from '@mui/material';
import {
  CommonWrapper,
  StyledItemWrapper,
  StyledPaper,
} from 'components/CurrentAccount/CurrentAccount';
import React, { FC } from 'react';
import { IUserItem } from 'types/User';

interface AnotherAccountProps {
  anotherUser: IUserItem;
}

const AnotherAccount: FC<AnotherAccountProps> = ({ anotherUser }) => {
  return (
    <CommonWrapper>
      <StyledPaper elevation={12}>
        <StyledItemWrapper>
          <Avatar src={anotherUser.avatar} sx={{ width: '150px', height: '150px' }} />

          <Typography variant="h4" fontWeight={600}>
            {anotherUser.login}
          </Typography>
        </StyledItemWrapper>
      </StyledPaper>
    </CommonWrapper>
  );
};

export default AnotherAccount;
