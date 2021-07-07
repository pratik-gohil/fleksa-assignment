import React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container: FunctionComponent = ({ children }) => <StyledContianer>{children}</StyledContianer>

const StyledContianer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.2em;

    &:first-of-type {
        margin-bottom: 3em;
    }
`

export default Container
