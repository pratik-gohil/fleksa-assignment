import React, { FunctionComponent, useState } from "react";
import styled, { css } from "styled-components";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { BREAKPOINTS } from "../../../../constants/grid-system-configuration";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { ICategoryProduct } from "../../../../interfaces/common/category.common.interfaces";
import MenuPageChoiceList from "./choice-list.menu.pages.templateOne.components";
import AddButton from "../../common/addButton/add-button.common.templateOne.components";
import { memo } from "react";
import MenuPageSides from "./sides.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  product: ICategoryProduct
  isOpen: boolean
  setOpenItemId(id: number|undefined): void
}

interface IPropsStyledBase {
  isOpen: boolean
}

interface IPropsBannerImage extends IPropsStyledBase { }
interface IPropsListItem extends IPropsStyledBase { }
interface IPropsOptionsContainer extends IPropsStyledBase { }
interface IPropsClosedViewInfoImage extends IPropsStyledBase { }

const ListItem = styled.li<IPropsListItem>`
  overflow: hidden;
  margin: -2px -15px;
  transition-duration: 500ms;

  @media (min-width: ${BREAKPOINTS.sm}px) {
    margin: -2px 0;
    border: ${props => props.isOpen? props.theme.border: "1px solid transparent"};
    ${props => props.isOpen && css`
      box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
    `}
    border-radius: ${props => props.theme.borderRadius}px;
    &:hover {
      border: ${props => props.theme.border};
    }
  }
`

const BannerImage = styled.img<IPropsBannerImage>`
  height: ${props => props.isOpen? 200: 0}px;
  width: 100%;
  object-fit: cover;
  display: block;
  transition-duration: 500ms;
`

const ClosedViewContainer = styled.div`
  cursor: pointer;
  transition-duration: 500ms;
  border-top: ${props => props.theme.border};
`

const ClosedViewInfoContainer = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
`

const ClosedViewInfoContainerSection1 = styled.div`

`

const ClosedViewInfoContainerSection2 = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin-left: 12px;
`

const ClosedViewInfoImage = styled.img<IPropsClosedViewInfoImage>`
  width: inherit;
  height: 70px;
  object-fit: cover;
  opacity: ${props => props.isOpen? 0: 1};
  border-radius: ${props => props.theme.borderRadius}px;
  transition-duration: 500ms;
`

const OptionsContainer = styled.div<IPropsOptionsContainer>`
  max-height: ${props => props.isOpen? '700px': '0px'};
  transition-duration: 500ms;
`

const RecipeName = styled.h4`
  margin: 0;
  padding: 0;
`

const RecipeDescription = styled.p`
  margin: 0;
  padding: 0;
`

const RecipeCost = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 700;
`

const MenuPageProductListItem: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ product, isOpen, setOpenItemId }) => {
  const language = useAppSelector(selectLanguage)
  const [ selectedOption, setSelectedOption ] = useState<number|undefined>(1)

  let optionsIndex = 0
  const getNextIndex = () => ++optionsIndex

  function toggle() {
    if (isOpen) {
      setOpenItemId(undefined)
    } else {
      setOpenItemId(product.id)
      setSelectedOption(1)
    }
  }

  return <ListItem isOpen={isOpen}>
    <ClosedViewContainer onClick={toggle}>
      {product.image &&  <BannerImage src={product.image} loading="lazy" isOpen={isOpen} />}
      <ClosedViewInfoContainer>
        <ClosedViewInfoContainerSection1>
          <RecipeName>{product.name_json[language]}</RecipeName>
          <RecipeDescription>{product.description_json[language]}</RecipeDescription>
          <RecipeCost>€ {product.price}</RecipeCost>
        </ClosedViewInfoContainerSection1>
        <ClosedViewInfoContainerSection2>
          {product.image && <ClosedViewInfoImage src={product.image} loading="lazy" isOpen={isOpen} />}
          <AddButton product={product} canOpen={!!product.choice && product.choice.length > 0 } hasImage={!!product.image} isOpen={isOpen} />
        </ClosedViewInfoContainerSection2>
      </ClosedViewInfoContainer>
    </ClosedViewContainer>
    <OptionsContainer isOpen={isOpen}>
      {product.choice && product.choice.map((cho, index) =><MenuPageChoiceList
        key={cho.name_json.english+index}
        getNextIndex={getNextIndex}
        choice={cho}
        isOpen={isOpen}
        product={product}
        choiceIndex={index}
        selectedOption={selectedOption}
        setSelectedOption={id => setSelectedOption(id)}
      />)}
      {product.type_ === "SINGLE" && product.side_products_json?.map(sideProduct => {
        return <MenuPageSides
          selectedOption={selectedOption}
          sideProduct={sideProduct}
          productId={product.id}
          setSelectedOption={id => setSelectedOption(id)}
          getNextIndex={getNextIndex}
        />
      })}
    </OptionsContainer>
  </ListItem>

}

export default memo(MenuPageProductListItem, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen
})