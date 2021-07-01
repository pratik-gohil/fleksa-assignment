import { createRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import SvgNext from '../../../../public/assets/svg/next.svg';
import SvgPrevious from '../../../../public/assets/svg/previous.svg';

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ListItemsContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftButton = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  left: -34px;
  border-radius: 50%;
  background: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: none;
  cursor: pointer;
  transition: 0.3s;

  svg {
    transition: 0.3s;
    fill: rgba(0, 0, 0, 0.4);
  }
  &:hover svg {
    fill: rgba(0, 0, 0, 1);
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`;

const RightButton = styled(LeftButton)`
  left: auto;
  right: -34px;
`;

const HorizontalList: FunctionComponent = ({ children }) => {
  const refHorizontalDrawer = createRef<HTMLUListElement>();
  let currentScrollPosition = 0;
  let scrollDistance = 400;

  function scrollLeft() {
    currentScrollPosition -= scrollDistance;
    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }
    refHorizontalDrawer.current?.scroll({ left: currentScrollPosition, behavior: 'smooth' });
  }

  function scrollRight() {
    currentScrollPosition += scrollDistance;
    if (refHorizontalDrawer.current?.scrollWidth && currentScrollPosition > refHorizontalDrawer.current?.scrollWidth) {
      currentScrollPosition = refHorizontalDrawer.current?.scrollWidth;
    }
    refHorizontalDrawer.current?.scroll({ left: currentScrollPosition, behavior: 'smooth' });
  }

  return (
    <ListWrapper>
      <ListItemsContainer ref={refHorizontalDrawer}>{children}</ListItemsContainer>
      <LeftButton onClick={scrollLeft}>
        <SvgPrevious />
      </LeftButton>
      <RightButton onClick={scrollRight}>
        <SvgNext />
      </RightButton>
    </ListWrapper>
  );
};

export default HorizontalList;
