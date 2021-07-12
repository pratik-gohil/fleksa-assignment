import React, { FunctionComponent, ReactNode, useRef } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.redux";
import { useEffect } from "react";
import { selectShop, selectSiblings } from "../../redux/slices/index.slices.redux";
import { useState } from "react";
import { ITimingsDay } from "../../interfaces/common/shop.common.interfaces";
import { ICheckoutOrderTypes, updateClearCheckout, updateOrderType, updateSelectedAddressId } from "../../redux/slices/checkout.slices.redux";
import { updateClearCart } from "../../redux/slices/cart.slices.redux";
import PyApiHttpPostAddress from "../../http/pyapi/address/post.address.pyapi.http";
import { selectConfiguration } from "../../redux/slices/configuration.slices.redux";
import { ISibling } from "../../interfaces/common/sibling.common.interfaces";
import { IGuestAddress } from "../../components/templateOne/common/addresses/address-add.common.templateOne.components";
import { LS_GUEST_USER_ADDRESS } from "../../constants/keys-local-storage.constants";
import { selectAddressByType, selectBearerToken, selectIsUserLoggedIn } from "../../redux/slices/user.slices.redux";
import NodeApiHttpPostCreateNewAddressRequest from "../../http/nodeapi/account/post.create-address.nodeapi.http";
import { updateError } from "../../redux/slices/common.slices.redux";
import NodeApiHttpPostUpdateAddressRequest from "../../http/nodeapi/account/post.update-address.nodeapi.http";

type Filters = "has_pickup"|"has_delivery"|"has_dinein"

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const FullHeightColumn = styled.div`
  float: left;
`

const FullHeightColumnLeft = styled(FullHeightColumn)`
  position: relative;
  width: 100%;
  height: 60%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 40%;
    height: 100%;
  }
`

const FullHeightColumnRight = styled(FullHeightColumn)`
  position: relative;
  width: 100%;
  height: 300px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 60%;
    height: 100%;
  }
`

const ContentContatiner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: sticky;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: ${props => props.theme.border};
`

const SelectionItem = styled.p<{ active: boolean }>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background: #f9f9f9;
  margin: 0;
  padding: ${props => props.theme.dimen.X4}px;
  border-bottom: 4px solid ${props => props.active? props.theme.primaryColor: "transparent"};
  border-right: ${props => props.theme.border};
  cursor: pointer;
`

const List = styled.ul`
  padding: 0 ${props => props.theme.dimen.X4}px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100% - 56px);
    overflow: auto;
  }
`

const ListItem = styled.li`
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  margin: ${props => props.theme.dimen.X4}px 0;
`

const ListItemLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  padding: 6px;
`

const Title = styled.h2`
  font-size: 16px;
  padding: 0;
  margin: ${props => props.theme.dimen.X4}px 0 0 0;
  line-height: 1.2;
`

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Address = styled.div`
  padding: ${props => props.theme.dimen.X3}px 0;
  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`

const TimingContainerHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 0 0 ${props => props.theme.dimen.X4}px 0;
`

const TimingContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const TimingContainerTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
`

const TimingContainerTiming = styled.div`
  
`

const InfoWithOrderButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
`

const InfoContainer = styled.div`

`

const OrderButton = styled.a`
  display: block;
  font-weight: 700;
  border-radius: ${props => props.theme.borderRadius}px;
  border: ${props => props.theme.border};
  margin: ${props => props.theme.dimen.X4}px;
  padding: ${props => props.theme.dimen.X}px ${props => props.theme.dimen.X4}px;
  background: ${props => props.theme.primaryColor};
`

const InputContainer = styled.div`
  display: flex;
  flex: 1;
`

const Input = styled.input`
  display: flex;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: ${props => props.theme.dimen.X4}px;
  margin-top: ${props => props.theme.dimen.X4}px;
  font-family: inherit;
`

const EnterAddress = styled.div`
  width: 100%;
  background: #f9f9f9;
  padding: ${props => props.theme.dimen.X4}px;
  margin-top: ${props => props.theme.dimen.X4}px;
  background: #e9e9e9;
  border-radius: ${props => props.theme.borderRadius}px;
  text-align: center;
`

let map: google.maps.Map;
let autoComplete: google.maps.places.Autocomplete

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  const dispatch = useAppDispatch()
  const shopData = useAppSelector(selectShop)
  const siblingsData = useAppSelector(selectSiblings)
  const bearerToken = useAppSelector(selectBearerToken)
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn)
  const addressData = useAppSelector(state => selectAddressByType(state, "HOME"))
  const configuration = useAppSelector(selectConfiguration)
  const [deliveryFilterData, setDeliveryFilterData ] = useState<Array<ISibling>>()

  const refAddressInput = useRef<HTMLInputElement>(null)

  const [ addressMain, setAddressMain ] = useState("")
  const [ addressFloor, setAddressFloor ] = useState("")
  const [ filterName, setFilterName ] = useState<Filters>("has_delivery")

  function initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 16,
    });
    const latlngbounds = new google.maps.LatLngBounds();
  
    const features = siblingsData.map(sibling => {
      latlngbounds.extend(new google.maps.LatLng(sibling.address.lat, sibling.address.lon));
      return {
        position: new google.maps.LatLng(sibling.address.lat, sibling.address.lon),
        type: "info",
      }
    });

    map.fitBounds(latlngbounds)
  
    // Create markers.
    for (let i = 0; i < features.length; i++) {
      new google.maps.Marker({
        position: features[i].position,
        // icon: shopData?.logo,
        map: map,
      });
    }
  }

  function setFilterAndOrderType(filter: Filters) {
    setFilterName(filter)
    let orderType: ICheckoutOrderTypes|null = null
    switch(filter) {
      case "has_delivery":
        orderType = "DELIVERY"
        break
      case "has_dinein":
        orderType = "DINE_IN"
        break
      case "has_pickup":
        orderType = "PICKUP"
        break
    }
    dispatch(updateOrderType(orderType))
  }

  useEffect(() => {
    initMap()
    if (typeof window !== "undefined") {
      dispatch(updateClearCart())
      dispatch(updateClearCheckout())
      setFilterAndOrderType("has_delivery")
    }
  }, [ ])

  async function getAvaibleBasedOnAdress({ area = "", postalCode = "", main = "", city ="" }) {
    if (shopData?.id) {
      const response = await new PyApiHttpPostAddress(configuration).postAll({
        shopId: shopData?.id,
        area,
        postalCode
      })
      if (response && response.result) {
        const possibilities = Object.keys(response.possibilities)
        setDeliveryFilterData(siblingsData.filter(i => possibilities.indexOf(String(i.id)) !== -1))
        if (possibilities.length > 0) {
          if (isLoggedIn && bearerToken) {
            if (addressData?.id) {
              await updateExistingAddress(bearerToken, addressData.id, postalCode, main, city)
            } else {
              await addNewAddress(bearerToken, postalCode, main, city)
            }
          } else {
            const guestAddress: IGuestAddress = {
              floor: addressFloor,
              address: main,
              address_type: "HOME",
              city: city,
              postal_code: postalCode
            }
            // save the address to local storage. Add on server when checkout opens
            window.localStorage.setItem(LS_GUEST_USER_ADDRESS, JSON.stringify(guestAddress))
          }
        }
      } else {
        dispatch(updateSelectedAddressId(null))
        setDeliveryFilterData([])
        window.localStorage.removeItem(LS_GUEST_USER_ADDRESS)
      }
    }
  }

  async function addNewAddress(bearerToken: string, postalCode: string, main: string, city: string) {
    if (!isLoggedIn) return 
    const response = await new NodeApiHttpPostCreateNewAddressRequest(configuration, bearerToken).post({
      floor: addressFloor,
      address: main,
      address_type: "HOME",
      city: city,
      postal_code: postalCode
    })
    if (!response.result) {
      dispatch(
        updateError({
          show: true,
          message: response.message,
          severity: 'error',
        }),
      );
      return;
    }
    dispatch(updateSelectedAddressId(response.data?.address.id))
  }

  async function updateExistingAddress(bearerToken: string, addressId: number, postalCode: string, main: string, city: string) {
    if (!isLoggedIn) return 
    await new NodeApiHttpPostUpdateAddressRequest(configuration, bearerToken).post({
      customer_address_id: addressId,
      updating_values: {
        floor: addressFloor,
        address: main,
        address_type: "HOME",
        city: city,
        postal_code: postalCode
      }
    })
    dispatch(updateSelectedAddressId(addressId))
  }

  function onAddressChange() {
    const place = autoComplete.getPlace()
    let area: string | undefined = undefined
    let postalCode: string | undefined = undefined
    let main: string | undefined = undefined
    let city: string | undefined = undefined
    if (place.address_components) {
      for (let component of place.address_components) {
        if (component.types[0] === 'route') {
          let temp = '';
          for (let component2 of place.address_components) if (component2.types[0] === 'street_number') temp = component2.short_name;
          main = `${component.long_name} ${temp}`
          setAddressMain(main);
        } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1) {
          area = component.long_name.includes('Innenstadt') ? 'Innenstadt' : component.long_name
        } else if (component.types[0] === 'locality') {
          city = component.long_name
        } else if (component.types[0] === 'postal_code') {
          postalCode = component.short_name
        }
      }
    }
    if (postalCode) {
      getAvaibleBasedOnAdress({ area, postalCode, main, city })
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

  const restaurantsToShow = filterName === "has_delivery"? deliveryFilterData: siblingsData

  let restaurantListView: ReactNode
  if (restaurantsToShow && restaurantsToShow.length > 0) {
    restaurantListView = restaurantsToShow.filter(sibling => sibling.address.availability[filterName]).map(sibling => {
      const area = sibling.address?.area ? sibling.address?.area + ' ' : ''
      const address = sibling.address?.address || ''
      const city = sibling.address?.city || ''
      const postalCode = sibling.address?.postal_code || ''
      
      const day = new Date().toLocaleString('en-us', {  weekday: 'long' }).toUpperCase()
      return <ListItem key={`${sibling.id}`}>
        <ListItemLink>
          <ItemImage src={sibling.logo} />
          <ContentContatiner>
            <InfoWithOrderButton>
              <InfoContainer>
                <Title>{sibling.name}</Title>
                <Address>
                  <p>{area}{address}</p>
                  <p>{postalCode} {city}</p>
                </Address>
              </InfoContainer>
              <OrderButton href={`/menu/${sibling.id}`}>ORDER</OrderButton>
            </InfoWithOrderButton>
            <TimingContainerHolder>
              <TimingContainer>
                <TimingContainerTitle>STORE HOURS</TimingContainerTitle>
                <TimingContainerTiming>{(sibling.timings[day] as ITimingsDay).shop?.timings?.map((t) => `${t.open} - ${t.close}`).join(', ') || (
                  <span style={{ color: 'red', fontWeight: 500 }}>Closed</span>
                )}</TimingContainerTiming>
              </TimingContainer>
              <TimingContainer>
                <TimingContainerTitle>DELIVERY HOURS</TimingContainerTitle>
                <TimingContainerTiming>{(sibling.timings[day] as ITimingsDay).delivery?.timings?.map((t) => `${t.open} - ${t.close}`).join(', ') || (
                  <span style={{ color: 'red', fontWeight: 500 }}>Closed</span>
                )}</TimingContainerTiming>
              </TimingContainer>
            </TimingContainerHolder>
          </ContentContatiner>
        </ListItemLink>
      </ListItem>
    })
  } else {
    if (filterName === "has_delivery") {
      if (restaurantsToShow && restaurantsToShow.length === 0) {
        restaurantListView = <EnterAddress>
          <p>No locations deliver to your address</p>
        </EnterAddress>
      } else {
        restaurantListView = <EnterAddress>
          <p>Search to see which locations deliver to you</p>
        </EnterAddress>
      }
    }
  }

  return <ColumnContainer>
    <FullHeightColumnLeft>
      <SelectionContainer>
        {[{
          filter: "has_delivery" as Filters,
          title: "DELIVERY"
        }, {
          filter: "has_pickup" as Filters,
          title: "TAKEAWAY"
        }, {
          filter: "has_dinein" as Filters,
          title: "DINE-IN"
        }].map(item => <SelectionItem key={item.filter} active={filterName === item.filter} onClick={() => setFilterAndOrderType(item.filter)}>{item.title}</SelectionItem>)}
      </SelectionContainer>
      <List>
        <InputContainer>
          <Input
            style={{
              flex: 1
            }}
            value={addressMain}
            onChange={e => setAddressMain(e.target.value)}
            ref={refAddressInput}
            placeholder={"Where to deliver?"}
          />
          <Input
            style={{
              width: 100,
              marginLeft: 12
            }}
            value={addressFloor}
            onChange={e => setAddressFloor(e.target.value)}
            placeholder={"Optional"}
          />
        </InputContainer>
        {restaurantListView}
      </List>
    </FullHeightColumnLeft>
    <FullHeightColumnRight>
      <MapContainer id="map"></MapContainer>
    </FullHeightColumnRight>
  </ColumnContainer>
}

export default MenuPageTemplateOne
