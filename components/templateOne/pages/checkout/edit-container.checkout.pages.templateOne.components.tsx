import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 0.5rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin: 0.2rem;
  }
`;

const EditContainer: FunctionComponent = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default EditContainer;
