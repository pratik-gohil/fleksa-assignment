import React from 'react'
import styled from 'styled-components'

const Left = ({ children }) => <Container>{children}</Container>

const Container = styled.div`
    color: ${p => p.theme.dark_color};
`

export default Left
