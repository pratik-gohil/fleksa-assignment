import { FunctionComponent } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const EditContainer:FunctionComponent = ({ children }) => {
  return <Wrapper>
    {children}
  </Wrapper>
}

export default EditContainer