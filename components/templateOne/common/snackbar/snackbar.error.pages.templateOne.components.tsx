import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import XCrossIcon from '../../../../public/assets/svg/x-circle.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectError, updateError } from '../../../../redux/slices/common.slices.redux';

const snackbarColor = {
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17a2b8',
} as const;

const Wrapper = styled.div<{
  show: boolean;
}>`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  padding: 0.5rem 1rem;
  width: max-content;
  z-index: 1;
  display: ${(p) => (p.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  animation: bubble 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.49);

  @keyframes bubble {
    0% {
      transform: scaleY(0) translateX(-50%);
    }
    100% {
      transform: scaleY(1) translateX(-50%);
    }
  }
`;

const Message = styled.p`
  padding: 0;
  margin: 0;
  color: #fff;
`;

const CrossIcon = styled(XCrossIcon)`
  margin: 0 0 0 0.5rem;
  color: #000;
  cursor: pointer;
`;

export const Snackbar = () => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const handleSnackbarCrossButtonClick = async () => {
    dispatch(
      updateError({
        show: !error.show,
      }),
    );
  };

  useEffect(() => {
    const viewTimer = setTimeout(() => {
      dispatch(
        updateError({
          show: false,
        }),
      );
    }, error.duration);

    return () => {
      clearTimeout(viewTimer);
    };
  }, []);

  return (
    <Wrapper
      style={{
        background: snackbarColor[error.severity],
      }}
      show={error.show}
    >
      <Message>{error.message}</Message>
      <CrossIcon stroke="green" onClick={handleSnackbarCrossButtonClick} />
    </Wrapper>
  );
};
