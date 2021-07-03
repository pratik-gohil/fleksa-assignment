import React from 'react';
import styled from 'styled-components';

interface ISnackbarProps {
  message: string;
}

const Wrapper = styled.div``;

export const Snackbar = ({ message }: ISnackbarProps) => {
  return <Wrapper>{message}</Wrapper>;
};
