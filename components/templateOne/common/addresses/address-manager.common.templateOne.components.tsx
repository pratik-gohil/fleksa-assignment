import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

export type AddressTypes = 'HOME' | 'WORK' | 'OTHER';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${(props) => props.theme.navMobile.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.dimen.X4}px;
  z-index: 1;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${(props) => props.theme.navDesktop.height}px;
    bottom: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  max-height: 80%;
  background-color: #fff;
  overflow: auto;
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const Title = styled.h3`
  margin: 0;
  padding: ${(props) => props.theme.dimen.X4}px;
  text-align: center;
  line-height: 1;
  border-bottom: ${(props) => props.theme.border};
`;

const List = styled.ul`
  margin: ${(props) => props.theme.dimen.X4}px 0;
`;

const AddressManager: FunctionComponent = () => {
  return (
    <Wrapper>
      <ContentContainer>
        <Title>ORDER DETAILS</Title>

        <List />
      </ContentContainer>
    </Wrapper>
  );
};

export default AddressManager;
