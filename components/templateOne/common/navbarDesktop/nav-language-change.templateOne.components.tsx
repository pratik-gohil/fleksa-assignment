import { useRouter } from "next/dist/client/router"
import React from "react"
import Link from 'next/link'
import styled from "styled-components"

const SvgFlagGerman = "/assets/svg/flag-german.svg"
const SvgFlagUnitedKingdom = "/assets/svg/flag-united-kingdom.svg"

const FlagContainer = styled.div`
  padding: 0 ${props => props.theme.dimen.X4}px;
`

const FlagImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 40px;
  border: 1px solid #efefef;
  cursor: pointer;
  display: block;
`

const NavLanguageChange = ({}) => {
  const router = useRouter()
  
  return <Link href="" locale={router.locale === "en"? "de": "en"}>
    <FlagContainer>
      <FlagImage src={router.locale === "en"? SvgFlagUnitedKingdom: SvgFlagGerman} />
    </FlagContainer>
  </Link>
}

export default NavLanguageChange