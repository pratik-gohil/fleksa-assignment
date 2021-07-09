import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
import MyAccountAllAddressLeftSide from './partials/my-account.all-address.left.partials.account.pages.templateOne.components';
import MyAccountAllAddressRightSide from './partials/my-account.all-address.right.partials.account.pages.templateOne.components';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  display: flex;
  margin: auto 1rem;
  overflow: hidden;
`;

const LeftWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 50%;
  flex-direction: column;
  padding: 0 2rem 0 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;

    width: 100%;
  }
`;

const RightWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  height: 100vh;
  width: 400px;
  padding: 0 1rem 0 2rem;
  animation: slider 0.3s ease-in;
  top: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  z-index: 999999;
  background: #fff;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);

  transform: ${(p) => (p.show ? 'translate3d(0, 0, 0)' : 'translate3d(100vw, 0, 0)')};
  ::after {
    content: '';
    width: 0.5rem;
    height: 100%;
    position: absolute;
    background: ${(p) => p.theme.primaryColor};
    top: 0;
    left: 0;
    z-index: 1;
  }

  @keyframes slider {
    from {
      right: -400px;
    }
    to {
      right: 0;
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}px) {
    width: 100vw;
  }
`;

const InvisibleLayer = styled.div<{ show: boolean }>`
  position: fixed;
  height: 100vh;
  width: calc(100vw - 400px);
  left: 0;
  bottom: 0;
  background: transparent;
  display: ${(p) => (p.show ? 'block' : 'none')};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const AccountPageAllAddress: FunctionComponent = ({}) => {
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existAddress, setExistAddress] = useState<IParticularAddress | null>(null);

  const handleShowNewAddressModal = (isEditMode: boolean) => {
    setShow(!show);
    setIsEditMode(isEditMode);
  };
  const handleChangeEditMode = () => setIsEditMode(!isEditMode);
  const handleSetExistAddress = (address: IParticularAddress) => setExistAddress(address);

  return (
    <Wrapper>
      <LeftWrapper>
        <MyAccountAllAddressLeftSide
          handleShowNewAddressModal={handleShowNewAddressModal}
          show={show}
          handleChangeEditMode={handleChangeEditMode}
          handleSetExistAddress={handleSetExistAddress}
        />
      </LeftWrapper>

      <RightWrapper show={show}>
        <MyAccountAllAddressRightSide handleShowNewAddressModal={handleShowNewAddressModal} isEditMode={isEditMode} existAddress={existAddress} />
      </RightWrapper>
      <InvisibleLayer onClick={() => handleShowNewAddressModal(false)} show={show} />
    </Wrapper>
  );
};

export default AccountPageAllAddress;
