import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface IPropsNavLink {
  title: string;
  path: string;
}

const Wrapper = styled.li`
  padding: 4px 4px;
  border: 1px solid transparent;
  transition: all 0.1s ease-in;

  &:hover {
    border: 3px solid #ffd100;
    backdrop-filter: blur(10px);
    box-shadow: -5px -5px 0px -2px #ffd100;
    -webkit-box-shadow: -5px -5px 0px -2px #ffd100;
    -moz-box-shadow: -5px -5px 0px -2px #ffd100;
  }
`;

const Title = styled.h2`
  font-size: 17px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  text-align: center;
`;

const CustomLink = styled.a`
  margin: 0 0.5rem;
  min-width: 100px;
`;

const NavLink: FunctionComponent<IPropsNavLink> = ({ title, path }) => {
  return (
    <CustomLink href={path}>
      <Wrapper>
        <Title>{title}</Title>
      </Wrapper>
    </CustomLink>
  );
};

export default NavLink;
