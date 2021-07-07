import React from 'react'
import styled from 'styled-components'

const Right = ({ children }) => <Container>{children}</Container>

const Container = styled.div`
    display: flex;
    color: ${p => p.theme.dark_color};
    align-items: center;
`

export default Right
