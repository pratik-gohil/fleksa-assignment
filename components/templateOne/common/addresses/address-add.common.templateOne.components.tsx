import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
// import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
// import { selectLanguageCode } from "../../../../redux/slices/configuration.slices.redux";


const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: ${props => props.theme.navMobile.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.dimen.X4}px;
  z-index: 1;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${props => props.theme.navDesktop.height}px;
    bottom: 0;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 500px;
  max-height: 80%;
  background-color: #fff;
  overflow: auto;
  border-radius: ${props => props.theme.borderRadius}px;
`

const Title = styled.h3`
  margin: 0;
  padding: ${props => props.theme.dimen.X4}px;
  text-align: center;
  line-height: 1;
  border-bottom: ${props => props.theme.border};
`

// const SubTitle = styled.h4<{ selected: boolean }>`
//   padding: 0;
//   margin: 0;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 1;
//   color: ${props => props.selected? "rgb(25, 135, 84)": "#222"};
// `

const InputContainer = styled.div`
  margin: ${props => props.theme.dimen.X4}px;
`

const Input = styled.input`
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
`

const AddressAdd: FunctionComponent = () => {
  const { t } = useTranslation("add-address")
  // const languageCode = useAppSelector(selectLanguageCode)
  // const dispatch = useAppDispatch()

  let autoComplete

  function onAddressChange(address: any) {
    console.log(address)
  }

  useEffect(() => {
    const googleMaps = (window as any).google.maps
    autoComplete = new googleMaps.places.Autocomplete(document.getElementById('addressAutocomplete'), {
      types: ['geocode'],
    });
    autoComplete.addListener('place_changed', onAddressChange.bind(this));
  }, [ ])
  

  return <Wrapper>
    <ContentContainer>
      <Title>{t("@addNewAddress")}</Title>
      
      <InputContainer>
        <Input id="addressAutocomplete" placeholder={""} />
      </InputContainer>
    </ContentContainer>
  </Wrapper>
}

export default AddressAdd