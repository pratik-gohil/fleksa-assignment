import React from 'react'
import styled from 'styled-components'
import { getLanguageValue } from '../../../functions/utilities'
import ProfileLanguage from '../../../constant/language/profile'
import { getLanguage } from '../../../redux/languageSlice'
import { useSelector } from 'react-redux'

const DownloadButton = ({ pdf }) => {
    const language = useSelector(getLanguage)

    return (
        <Button>
            <Anchor href={pdf} target='_blank' rel='noopener noreferrer'>
                {getLanguageValue(ProfileLanguage, 'Download Receipt', language)}
            </Anchor>
        </Button>
    )
}

const Button = styled.div`
    /* padding: 1em; */
    background-color: ${p => p.theme.dark_color};
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: 500;
    display: block;
    text-align: center;
    max-width: 600px;
    height: 60px;
    bottom: 0;
    left: 0;
    width: 100%;
    position: fixed;
    margin: 0 auto;
    /* align-self: flex-end; */

    &:hover {
        filter: brightness(1.3);
    }

    @media (min-width: 600px) {
        position: relative;
        /* left: 0; */
    }
`
const Anchor = styled.a`
    /* background-color: green; */
    display: block;
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`

export default DownloadButton
