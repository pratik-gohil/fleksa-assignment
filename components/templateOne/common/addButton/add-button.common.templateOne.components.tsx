import { FunctionComponent } from "react";
import styled, { css } from "styled-components";

export interface IPropsAddButton {
  hasImage: boolean
  isOpen: boolean
}

interface IPropsWrapperButton {
  hasImage: boolean
  isOpen: boolean
}

const WrapperButton = styled.div<IPropsWrapperButton>`
  display: flex;
  z-index: 1;
  ${props => !props.hasImage && css`
    flex: 1 1 auto;
  `}
  ${props => props.hasImage && (props.isOpen? css`
    margin-top: -48px;
  `: css`
    margin-top: -12px;
  `)}
  transition-duration: 500ms;
`

const AddButtonItem = styled.p`
  display: flex;
  flex-wrap: nowrap;
  margin: 0;
  background-color: ${props => props.theme.primaryColor};
  padding: 4px 12px;
  border-radius: ${props => props.theme.borderRadius}px;
  border: ${props => props.theme.border};
  align-self: center;
  font-weight: 700;
  transition-duration: 500ms;
`

const AddButton: FunctionComponent<IPropsAddButton> = ({ hasImage, isOpen }) => {
  return <WrapperButton hasImage={hasImage} isOpen={isOpen}>
    <AddButtonItem>ADD +</AddButtonItem>
  </WrapperButton>
}

export default AddButton