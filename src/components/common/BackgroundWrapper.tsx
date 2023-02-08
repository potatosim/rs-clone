import styled from '@emotion/styled';
import { Background } from 'types/Background';

interface BackgroundWrapperProps {
  bg: Background;
  fullSize?: boolean;
}

export const BackgroundWrapper = styled('div')<BackgroundWrapperProps>`
  width: 100%;
  height: 0;
  padding-top: 40%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${({ fullSize }) =>
    fullSize &&
    `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}
  ${({ bg }) =>
    bg.type === 'color' ? `background-color: ${bg.source}` : `background-image: url(${bg.source})`};
`;
