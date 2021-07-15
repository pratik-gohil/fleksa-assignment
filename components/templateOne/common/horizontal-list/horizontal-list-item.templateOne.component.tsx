import { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";

export interface IResponsive extends Record<keyof typeof BREAKPOINTS, {width: number, height: number}> {}

export interface IPropsHorizontalListItem extends IListItemWrapper {}

interface IListItemWrapper {
  responsive: IResponsive
}

const ListItemWrapper = styled.li<IListItemWrapper>`
  flex-shrink: 0;
  width: ${props => props.responsive?.sm.width}px;
  height: ${props => props.responsive?.sm.height}px;
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: ${props => props.responsive?.md.width}px;
    height: ${props => props.responsive?.md.height}px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: ${props => props.responsive?.lg.width}px;
    height: ${props => props.responsive?.lg.height}px;
  }
  @media (min-width: ${BREAKPOINTS.xl}px) {
    width: ${props => props.responsive?.xl.width}px;
    height: ${props => props.responsive?.xl.height}px;
  }
  @media (min-width: ${BREAKPOINTS.xxl}px) {
    width: ${props => props.responsive?.xxl.width}px;
    height: ${props => props.responsive?.xxl.height}px;
  }
`

const HorizontalListItem: FunctionComponent<IPropsHorizontalListItem> = ({ responsive, children }) => {
  
  return <ListItemWrapper responsive={responsive}>
    {children}
  </ListItemWrapper>

}

export default HorizontalListItem