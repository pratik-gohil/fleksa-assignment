import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectAddress } from "../../../../redux/slices/index.slices.redux";

const Wrapper = styled.div`
  padding: ${props => props.theme.dimen.X3}px 0;
  p {
    padding: 0;
    margin: ${props => props.theme.dimen.X}px 0;
    font-size: 14px;
  }
`

const Address: FunctionComponent = () => {
  const addressData = useAppSelector(selectAddress)

  const area = addressData?.area ? addressData?.area + ' ' : ''
  const address = addressData?.address || ''
  const city = addressData?.city || ''
  const postalCode = addressData?.postal_code || ''
  const email = addressData?.email? <a href={`mailto:${addressData?.email}`}>{addressData?.email}</a>: ''
  const countryCode = addressData?.country_code || ''
  const phone = addressData?.phone? (
    <a href={`tel:+${addressData?.country_code}${addressData?.phone}`}>+{countryCode} {addressData?.phone}</a>
  ): ''
  
  return <Wrapper>
    <p>{area}{address}</p>
    <p>{postalCode} {city}</p>
    <p>{email}</p>
    <p>{phone}</p>
  </Wrapper>
}

export default Address