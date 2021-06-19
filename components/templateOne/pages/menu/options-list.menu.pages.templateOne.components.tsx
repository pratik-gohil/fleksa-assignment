import React, { FunctionComponent } from "react";
import { useState } from "react";
import styled from "styled-components";

import { ICategoryProductChoiceOptions } from "../../../../interfaces/common/category.common.interfaces";
import { ILanguageData } from "../../../../interfaces/common/language-data.common.interfaces";
import { IType } from "../../../../interfaces/common/types.common.interfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { selectItemSelectionChoice, updateItemSelectionChoice } from "../../../../redux/slices/item-selection.slices.redux";

export interface IChoiceData {
  name_json: ILanguageData
  options: Array<ICategoryProductChoiceOptions>|undefined
  type_: IType
}

export interface IPropsMenuPageCategoryListItem {
  choice: IChoiceData
  selectedOption: number|undefined
  productId: number
  choiceIndex: number
  getNextIndex(): number
  setSelectedOption(name: number|undefined): void
}

export const StyledOptionsWrapper = styled.div`
  border-top: ${props => props.theme.border};
`

export const StyledOptionsTitleContainer = styled.div`
  cursor: pointer;
`

export const StyledOptionsListContainer = styled.div<{ isOptionOpen: boolean }>`
  max-height: ${props => props.isOptionOpen? "260px": "0px"};
  overflow: auto;
  background-color: #f9f9f9;
  transition-duration: 500ms;
`

export const StyledOptionsList = styled.ul`
  border-top: ${props => props.theme.border};
`

export const StyledOptionsListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const StyledOptionsRadioButton = styled.span<{selected: boolean}>`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  display: block;
  border-radius: 100%;
  border: ${props => props.theme.border};
  background-color: ${props => props.selected && props.theme.primaryColor};
`

export const StyledOptionsRadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const MenuPageOptionsList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ productId, choiceIndex, getNextIndex, choice, selectedOption, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)
  const optionData = useAppSelector(state => selectItemSelectionChoice(state, productId))
  const dispach = useAppDispatch()
  const [ optionKey ] = useState(getNextIndex())

  const selectedIndex = optionData && optionData[choiceIndex]
  if (optionData && !selectedIndex && choice.options) {
    dispach(updateItemSelectionChoice({
      id: choiceIndex,
      data: {
        product_index: 0,
        price: choice.options[0].price,
        name: choice.options[0].name_json
      }
    }))
  }

  const isOptionOpen = selectedOption === optionKey
  const toggle = () => setSelectedOption(isOptionOpen? optionKey+1: optionKey)

  return <StyledOptionsWrapper>
    <StyledOptionsTitleContainer onClick={toggle}>
      <p style={{ margin: 0, padding: 12 }}>{choice.name_json[language]}</p>
    </StyledOptionsTitleContainer>
    <StyledOptionsListContainer isOptionOpen={isOptionOpen}>
      <StyledOptionsList>
        {choice.options?.map((option, index) => <StyledOptionsListItem key={option.name_json.english} onClick={() => {
          dispach(updateItemSelectionChoice({
            id: choiceIndex,
            data: {
              product_index: index,
              price: option.price,
              name: option.name_json
            }
          }))
        }}>
          <StyledOptionsRadioButtonContainer>
            <StyledOptionsRadioButton selected={index === selectedIndex?.product_index} />
            <span style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</span>
          </StyledOptionsRadioButtonContainer>
          {option.price > 0 && <span style={{ margin: 0, padding: 12 }}>+€{option.price}</span>}
        </StyledOptionsListItem>)}
      </StyledOptionsList>
    </StyledOptionsListContainer>
  </StyledOptionsWrapper>
}

export default MenuPageOptionsList