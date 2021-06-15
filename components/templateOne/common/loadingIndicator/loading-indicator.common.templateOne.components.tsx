import { FunctionComponent } from "react";
import styled from "styled-components";

export interface IPropsLoadingIndicator extends IWrapper { }

interface IWrapper {
  width?: number
  borderWidth?: number
}

const Wrapper = styled.div<IWrapper>`
  border: ${props => props.borderWidth}px solid #fff;
  border-top: ${props => props.borderWidth}px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoadingIndicator: FunctionComponent<IPropsLoadingIndicator> = ({ width=22, borderWidth=4 }) => {
  return <Wrapper width={width} borderWidth={borderWidth} />
}

export default LoadingIndicator