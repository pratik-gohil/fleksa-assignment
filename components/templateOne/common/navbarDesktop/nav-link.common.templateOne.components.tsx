import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface IPropsNavLink {
  title: string
  path: string
}

const Wrapper = styled.li`
  padding: ${props => props.theme.dimen.X2}px ${props => props.theme.dimen.X4}px;
  border-radius: ${props => props.theme.borderRadius}px;
  &:hover {
    background-color: ${props => props.theme.primaryColor};
  }
`

const Title = styled.h2`
  font-size: 14px;
  padding: 0;
  margin: 0;
`

const NavLink: FunctionComponent<IPropsNavLink> = ({ title, path }) => {
  return <a href={path}>
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  </a>
}

export default NavLink