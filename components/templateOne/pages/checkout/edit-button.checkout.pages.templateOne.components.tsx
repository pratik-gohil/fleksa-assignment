import { FunctionComponent } from "react";
import styled from "styled-components";
import SvgEdit from "../../../../public/assets/svg/edit.svg";

export interface IPropsEditButton {
  onClick?(): void
  disabled?: boolean
}

const Wrapper = styled.div<{ disabled: boolean|undefined }>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => props.theme.border};
  border-radius: 1000px;
  cursor: pointer;
  margin-left: ${props => props.theme.dimen.X4}px;
  opacity: ${props => props.disabled? 0: 1};
  svg {
    width: 36px;
    height: 36px;
    display: block;
    padding: 6px
  }
`

const EditButton:FunctionComponent<IPropsEditButton> = ({ onClick, disabled }) => {
  return <Wrapper onClick={disabled? undefined: onClick} disabled={disabled} >
    <SvgEdit />
  </Wrapper>
}

export default EditButton