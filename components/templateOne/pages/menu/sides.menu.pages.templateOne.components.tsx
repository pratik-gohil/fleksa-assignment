import React, { FunctionComponent, useState } from "react";

import { ICategoryProductSideProducts } from "../../../../interfaces/common/category.common.interfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectSidesArray } from "../../../../redux/slices/menu.slices.redux";
import { selectItemSelectionSideProduct, updateItemSelectionAddSideProduct, updateItemSelectionRemoveSideProduct } from "../../../../redux/slices/item-selection.slices.redux";
import { StyledOptionsWrapper, StyledOptionsTitleContainer, StyledOptionsListContainer, StyledOptionsList, StyledOptionsListItem, StyledOptionsRadioButton, StyledOptionsRadioButtonContainer } from "./options-list.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number|undefined
  productId: number
  sideProduct: ICategoryProductSideProducts
  getNextIndex(): number
  setSelectedOption(name: number|undefined): void
}


const MenuPageSides: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ productId, selectedOption, sideProduct, getNextIndex, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)
  const sidesList = useAppSelector(state => selectSidesArray(state, sideProduct.option_ids))
  const selectedSides = useAppSelector(state => selectItemSelectionSideProduct(state, productId))
  const dispach = useAppDispatch()
  const [ optionKey ] = useState(getNextIndex())

  const isOptionOpen = selectedOption === optionKey
  const toggle = () => setSelectedOption(isOptionOpen? optionKey+1: optionKey)


  return sidesList.length > 0? <StyledOptionsWrapper>
    <StyledOptionsTitleContainer onClick={toggle}>
      <p style={{ margin: 0, padding: 12 }}>{sideProduct.name_json[language]}</p>
    </StyledOptionsTitleContainer>
    <StyledOptionsListContainer isOptionOpen={isOptionOpen}>
      <StyledOptionsList>
        {sidesList.map(option => <StyledOptionsListItem key={option.name_json.english} onClick={() => {
          if (selectedSides && selectedSides[option.id]) {
            dispach(updateItemSelectionRemoveSideProduct(option.id))
          } else {
            dispach(updateItemSelectionAddSideProduct({
              id: option.id,
              data: {
                price: option.price,
                name: option.name_json
              }
            }))
          }
        }}>
          <StyledOptionsRadioButtonContainer>
            <StyledOptionsRadioButton selected={selectedSides? selectedSides[option.id] !== undefined: false} />
            <span style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</span>
          </StyledOptionsRadioButtonContainer>
          {option.price > 0 && <span style={{ margin: 0, padding: 12 }}>+€{option.price}</span>}
        </StyledOptionsListItem>)}
      </StyledOptionsList>
    </StyledOptionsListContainer>
  </StyledOptionsWrapper>: <></>
}

export default MenuPageSides