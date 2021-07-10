import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import PyApiHttpPostAddress from "../../../../http/pyapi/address/post.address.pyapi.http";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectConfiguration } from "../../../../redux/slices/configuration.slices.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";
import { selectIsUserLoggedIn } from "../../../../redux/slices/user.slices.redux";
// import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
// import { selectLanguageCode } from "../../../../redux/slices/configuration.slices.redux";

import SvgHome from "../../../../public/assets/svg/address/home.svg";
import SvgWork from "../../../../public/assets/svg/address/work.svg";
import SvgMap from "../../../../public/assets/svg/address/map.svg";
import { AddressTypes } from "./address-manager.common.templateOne.components";


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
  max-height: 90%;
  background-color: #fff;
  overflow: auto;
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 0 0 ${props => props.theme.dimen.X4}px 0;
`

const Title = styled.h3`
  margin: 0 0 ${props => props.theme.dimen.X4}px 0;
  padding: ${props => props.theme.dimen.X4*2}px 0;
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
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 0 ${props => props.theme.dimen.X4}px;
`

const InputItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${props => props.theme.dimen.X4}px;
`

const Label = styled.label`
  font-weight: 700;
`

const Input = styled.input`
  width: 100%;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  font-family: inherit;
`

const InputSubmit = styled(Input)`
  font-weight: 700;
  cursor: pointer;
  background: #333;
  color: #fff;
  margin: ${props => props.theme.dimen.X4}px;
`

const Error = styled.p`
  color: #f44336;
  margin: 0 ${props => props.theme.dimen.X4}px;
`

const AddressTypeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => props.theme.dimen.X4}px;
  label {
    padding: 0 ${props => props.theme.dimen.X4}px;
  }
`

const AddressTypeItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`

const AddressTypeItem = styled.div<{ active: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${props => props.theme.border};
  margin: ${props => props.theme.dimen.X4}px;
  padding: ${props => props.theme.dimen.X4}px 0;
  border-radius: ${props => props.theme.borderRadius}px;
  background: ${props => props.active? "#222": "#fff"};
  svg {
    fill: ${props => props.active? "#fff": "#222"};
    width: 48px;
    height: 48px;
  }
  p {
    color: ${props => props.active? "#fff": "#222"};
    margin: 0;
    padding-top: 6px;
  }
`

const AddressTypeName = styled.p`
  font-size: 14px;
  font-weight: 500;
`

const AddressAdd: FunctionComponent = () => {
  const { t } = useTranslation("add-address")
  const refAddressInput = useRef<HTMLInputElement>(null)
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn)
  const configuration = useAppSelector(selectConfiguration)
  const shopData = useAppSelector(selectShop)
  const [ addressType, setAddressType ] = useState<AddressTypes>("HOME")
  // const languageCode = useAppSelector(selectLanguageCode)
  // const dispatch = useAppDispatch()

  const [ errorMessage, setErrorMessage ] = useState<string>()
  const [ addressMain, setAddressMain ] = useState("")
  const [ addressStreet, setAddressStreet ] = useState("")
  const [ addressArea, setAddressArea] = useState("")
  const [ addressCity, setAddressCity] = useState("")
  const [ addressPostalCode, setAddressPostalCode] = useState("")
  const [ addressFloor, setAddressFloor ] = useState("")

  let autoComplete: google.maps.places.Autocomplete

  function onAddressChange() {
    console.log(autoComplete.getPlace())
    const place = autoComplete.getPlace()
    if (place.address_components) {
      for (let component of place.address_components) {
        if (component.types[0] === 'route') {
          let temp = '';
          for (let component2 of place.address_components) if (component2.types[0] === 'street_number') temp = component2.short_name;
          setAddressMain(`${component.long_name} ${temp}`);
          setAddressStreet(component.long_name);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1)
          setAddressArea(component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name);
        else if (component.types[0] === 'locality') setAddressCity(component.long_name);
        else if (component.types[0] === 'postal_code') setAddressPostalCode(component.short_name);
      }
    }
  }

  useEffect(() => {
    if (window !== "undefined" && refAddressInput.current) {
      autoComplete = new google.maps.places.Autocomplete(refAddressInput.current, {
        types: ['geocode'],
      });
      autoComplete.setFields(['address_component']);
      autoComplete.addListener('place_changed', onAddressChange);
    }
  }, [ refAddressInput ])
  
  async function onClickSubmit() {
    if (shopData?.urlpath) {
      const response = await new PyApiHttpPostAddress(configuration).post({
        area: addressArea,
        street: addressStreet,
        city: addressCity,
        floor: addressFloor,
        address: addressMain,
        addressType: addressType,
        urlpath: shopData?.urlpath,
        postalCode: Number(addressPostalCode)
      })

      if (response?.can_deliver) {
        if (isLoggedIn) {

        } else {

        }
      } else {
        setErrorMessage(response?.description)
      }
    }
  }

  return <Wrapper>
    <ContentContainer>
      <Title>{t("@addNewAddress")}</Title>
      <InputContainer>
        <InputItem>
          <Label>{t("@streetAddress")}</Label>
          <Input ref={refAddressInput} placeholder={t("@streetAddress")} />
        </InputItem>
      </InputContainer>
      <InputContainer>
        <InputItem>
          <Label>{t("@additionalDeliveryInfo")}</Label>
          <Input
            placeholder={t("@additionalDeliveryInfo")}
            value={addressFloor}
            onChange={e => setAddressFloor(e.target.value)}
          />
        </InputItem>
      </InputContainer>

      <InputContainer>
        <InputItem>
          <Label>{t("@city")}</Label>
          <Input
            placeholder={t("@city")}
            value={addressCity}
            onChange={e => setAddressCity(e.target.value)}
          />
        </InputItem>
        <InputItem>
          <Label>{t("@postalCode")}</Label>
          <Input
            placeholder={t("@postalCode")}
            value={addressPostalCode}
            onChange={e => setAddressPostalCode(e.target.value)}
          />
        </InputItem>
      </InputContainer>

      <AddressTypeContainer>
        <Label>{t("@addressType")}</Label>
        <AddressTypeItemContainer>
          {[{
            title: "HOME" as AddressTypes,
            icon: SvgHome
          }, {
            title: "WORK" as AddressTypes,
            icon: SvgWork
          }, {
            title: "OTHER" as AddressTypes,
            icon: SvgMap
          }].map(item => {
            return <AddressTypeItem active={addressType === item.title} onClick={() => setAddressType(item.title)}>
              <item.icon />
              <AddressTypeName>{item.title}</AddressTypeName>
            </AddressTypeItem>
          })}
        </AddressTypeItemContainer>
      </AddressTypeContainer>
      
      {errorMessage && <InputContainer>
        <Error>{t("@addressPart1")}<a href="/contact-us"> {t("@contact")} </a>{t("@addressPart2")}</Error>
      </InputContainer>}

      <InputContainer>
        <InputSubmit type="submit" value="SAVE ADDRESS" onClick={onClickSubmit} />
      </InputContainer>
    </ContentContainer>
  </Wrapper>
}

export default AddressAdd