import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants/grid-system-configuration";
import { useAppSelector } from "../../redux/hooks.redux";
import { useEffect } from "react";
import { selectSiblings } from "../../redux/slices/index.slices.redux";

const FullHeightColumn = styled.div`
  display: block;
  height: calc(100vh - ${props => props.theme.navMobile.height}px);
  width: 50%;
  float: left;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: calc(100vh - ${props => props.theme.navDesktop.height}px);
  }
`

const FullHeightColumnLeft = styled(FullHeightColumn)`

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
      center: new google.maps.LatLng(-33.91722, 151.23064),
      zoom: 16,
    });
  
    const features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.2263),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91539, 151.2282),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.9191, 151.22907),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.9179, 151.23463),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.916988, 151.23364),
        type: "info",
      },
      {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: "parking",
      },
      {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: "library",
      },
    ];
  
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

  return <>
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
  </>
}

export default MenuPageTemplateOne
