import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppSelector } from "../../redux/hooks.redux";
import { useEffect } from "react";
import { selectSiblings } from "../../redux/slices/index.slices.redux";
import { useState } from "react";
import { ITimingsDay } from "../../interfaces/common/shop.common.interfaces";

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

const OrderButton = styled.div`
  font-weight: 700;
  border-radius: ${props => props.theme.borderRadius}px;
  border: ${props => props.theme.border};
  margin: ${props => props.theme.dimen.X4}px;
  padding: ${props => props.theme.dimen.X}px ${props => props.theme.dimen.X4}px;
  background: ${props => props.theme.primaryColor};
`

let map: google.maps.Map;

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  const siblingsData = useAppSelector(selectSiblings)

  const [ filterName, setFilterName ] = useState<Filters>("has_pickup")

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

  useEffect(() => {
    initMap()
  }, [ ])

  return <ColumnContainer>
    <FullHeightColumnLeft>
      <SelectionContainer>
        {[{
          filter: "has_pickup" as Filters,
          title: "PICKUP"
        }, {
          filter: "has_delivery" as Filters,
          title: "DELIVERY"
        }, {
          filter: "has_dinein" as Filters,
          title: "DINE-IN"
        }].map(item => <SelectionItem key={item.filter} active={filterName === item.filter} onClick={() => setFilterName(item.filter)}>{item.title}</SelectionItem>)}
      </SelectionContainer>
      <List>
        {siblingsData.filter(sibling => sibling.address.availability[filterName]).map(sibling => {
          const area = sibling.address?.area ? sibling.address?.area + ' ' : ''
          const address = sibling.address?.address || ''
          const city = sibling.address?.city || ''
          const postalCode = sibling.address?.postal_code || ''
          
          const day = new Date().toLocaleString('en-us', {  weekday: 'long' }).toUpperCase()
          return <ListItem key={`${sibling.id}`}>
            <ListItemLink href={`/menu/${sibling.id}`}>
              <ItemImage src={sibling.logo} />
              <ContentContatiner>
                <InfoWithOrderButton>
                  <InfoContainer>
                    <Title>{sibling.name}</Title>
                    {/* <Description>{sibling.category_json[language]}</Description> */}
                    <Address>
                      <p>{area}{address}</p>
                      <p>{postalCode} {city}</p>
                    </Address>
                  </InfoContainer>
                  <OrderButton>ORDER</OrderButton>
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
        })}
      </List>
    </FullHeightColumnLeft>
    <FullHeightColumnRight>
      <MapContainer id="map"></MapContainer>
    </FullHeightColumnRight>
  </ColumnContainer>
}

export default MenuPageTemplateOne
