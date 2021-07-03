// import { FunctionComponent } from "react";
// import styled from "styled-components";
// import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
// import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";

// const Wrapper = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: ${props => props.theme.navMobile.height}px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.1);
//   padding: ${props => props.theme.dimen.X4}px;
//   z-index: 1;
//   @media (min-width: ${BREAKPOINTS.lg}px) {
//     top: ${props => props.theme.navDesktop.height}px;
//     bottom: 0;
//   }
// `

// const ContentContainer = styled.div`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   max-width: 500px;
//   max-height: 80%;
//   background-color: #fff;
//   overflow: auto;
//   border-radius: ${props => props.theme.borderRadius}px;
// `

// const Title = styled.h3`
//   margin: 0;
//   padding: ${props => props.theme.dimen.X4}px;
//   text-align: center;
//   line-height: 1;
//   border-bottom: ${props => props.theme.border};
// `

// const SubTitle = styled.h4<{ selected: boolean }>`
//   padding: 0;
//   margin: 0;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 1;
//   color: ${props => props.selected? "rgb(25, 135, 84)": "#222"};
// `

// const List = styled.ul`
//   margin: ${props => props.theme.dimen.X4}px 0;
// `

// const ListItem = styled.li<{ selected: boolean }>`
//   display: flex;
//   flex: 1 1 auto;
//   flex-direction: row;
//   cursor: pointer;
//   padding: ${props => props.theme.dimen.X4}px;
//   margin: ${props => props.theme.dimen.X4}px;
//   border-radius: ${props => props.theme.borderRadius}px;
//   &:hover {
//     background-color: #f9f9f9;
//   }
//   h3 {
//     text-align: left;
//     border: none;
//     margin: 0;
//     padding: 0;
//   }
//   svg {
//     width: 48px;
//     min-width: 48px;
//     height: 48px;
//     display: block;
//   }
// `

// const ListItemContent = styled.div<{ centerContent: boolean }>`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   justify-content: ${props => props.centerContent? "center": "space-between"};
//   margin-left: ${props => props.theme.dimen.X4}px;
// `

// const SelectedTick = styled.div`
//   svg {
//     padding: 12px;
//   }
// `

// const AddressManager: FunctionComponent = () => {
//   const dispach = useAppDispatch()


//   return <Wrapper>
//     <ContentContainer>
//       <Title>ORDER DETAILS</Title>
      
//       <List>
        
//       </List>
//     </ContentContainer>
//   </Wrapper>
// }

// export default AddressManager