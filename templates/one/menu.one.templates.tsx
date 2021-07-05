import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppSelector } from "../../redux/hooks.redux";
import { useEffect } from "react";
import { selectSiblings } from "../../redux/slices/index.slices.redux";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: calc(100vh - ${props => props.theme.navMobile.height}px);
  @media (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const FullHeightColumn = styled.div`
  height: 50%;
  width: 100%;
  float: left;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    width: 50%;
    height: 100%;
  }
`

const FullHeightColumnLeft = styled(FullHeightColumn)`
  overflow: auto;
`

const FullHeightColumnRight = styled(FullHeightColumn)`

`

const List = styled.ul`

`

const ListItem = styled.li`

`

const MapContainer = styled.div`
  width: 100%;
  height: 100%
`

let map: google.maps.Map;

const MenuPageTemplateOne: FunctionComponent = ({}) => {
  const siblingsData = useAppSelector(selectSiblings)

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
      <List>
        {siblingsData.map(sibling => {
          return <ListItem>
            <a href={`/menu/${sibling.id}`}>
              <p>{sibling.name}</p>
            </a>
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
