import { FunctionComponent } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectShop } from "../../../../redux/slices/index.slices.redux";

const BannerContainer = styled.section`
  height: 400px;
  position: relative;
  border-bottom: ${props => props.theme.border};
`


const MenuPageBanner: FunctionComponent = ({}) => {
  // const language = useAppSelector(selectLanguage)
  const shopData = useAppSelector(selectShop)

  return <BannerContainer>
    {shopData?.cover && <Image src={shopData.cover} loading="eager" layout="fill" objectFit="cover" />}
    <p>{shopData?.name}</p>
  </BannerContainer>
}

export default MenuPageBanner