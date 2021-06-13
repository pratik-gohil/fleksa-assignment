import { FunctionComponent } from "react";
import styled from "styled-components";
// import Image from "next/image";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";

const BannerContainer = styled.section`
  height: 400px;
  position: relative;
  border-bottom: ${props => props.theme.border};
`


const MenuPageBanner: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage)
  // const categories = useAppSelector(selectCategories)

  return <BannerContainer>
    
  </BannerContainer>
}

export default MenuPageBanner