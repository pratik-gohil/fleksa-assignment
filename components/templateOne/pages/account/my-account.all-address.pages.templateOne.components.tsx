import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { IParticularAddress } from '../../../../interfaces/common/customer.common.interfaces';
import MyAccountAllAddressLeftSide from './partials/my-account.all-address.left.partials.account.pages.templateOne.components';
import MyAccountAllAddressRightSide from './partials/my-account.all-address.right.partials.account.pages.templateOne.components';
import MobileBackButton from '../../common/backButton/backButton.common.templateOne.components';

const Wrapper = styled.section`
  height: calc(100vh - ${(p) => p.theme.navDesktop.height}px);
  margin: 0 1rem;
  overflow: hidden;
  position: relative;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: calc(100vh - ${(p) => p.theme.navMobile.height}px);
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 70%;
  flex-direction: column;
  padding: 0 2rem 0 1rem;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 0;
    width: 100%;
  }
`;

const RightWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  left: 35%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;

  height: 600px;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  z-index: 9999999999999999;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(p) => (p.show ? 1 : 0)};
  transition: opacity 0.1s ease-in;
  pointer-events: ${(p) => (p.show ? 'all' : 'none')};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    left: 50%;
    height: 530px;
    width: calc(100vw - 2rem);
  }
`;

const InvisibleLayer = styled.div<{ show: boolean }>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  bottom: 0;
  display: ${(p) => (p.show ? 'block' : 'none')};
  background: rgba(0, 0, 0, 0.3);
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
      <MobileBackButton path="/account" />
      <>
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
      </>
    </Wrapper>
  );
};

export default AccountPageAllAddress;
