import React, { FunctionComponent, useState } from "react";

import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";
import { IChoiceDataWithId } from "./multiple-select.pages.templateOne.components";
import { StyledOptionsWrapper, StyledOptionsTitleContainer, StyledOptionsListContainer, StyledOptionsList, StyledOptionsListItem, StyledOptionsRadioButton, IChoiceData, StyledOptionsRadioButtonContainer } from "./options-list.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number|undefined
  choice: IChoiceDataWithId
  selectionMultipleId: number
  setSelectionMultipleId(id: number): void
  getNextIndex(): number
  setSelectedOption(name: number|undefined): void
}


const MenuPageMultipleSelector: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ choice, selectedOption, selectionMultipleId, setSelectionMultipleId, getNextIndex, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)
  const [ optionKey ] = useState(getNextIndex())

  const isOptionOpen = selectedOption === optionKey
  const toggle = () => setSelectedOption(isOptionOpen? optionKey+1: optionKey)


  return choice.options && choice.options.length > 0? <StyledOptionsWrapper>
    <StyledOptionsTitleContainer onClick={toggle}>
      <p style={{ margin: 0, padding: 12 }}>{choice.name_json[language]}</p>
    </StyledOptionsTitleContainer>
    <StyledOptionsListContainer isOptionOpen={isOptionOpen}>
      <StyledOptionsList>
        {choice.options.map(option => <StyledOptionsListItem key={option.name_json.english} onClick={() => {
          if (option.id !== selectionMultipleId) {
            setSelectionMultipleId(option.id)
          }
        }}>
          <StyledOptionsRadioButtonContainer>
            <StyledOptionsRadioButton selected={option.id === selectionMultipleId} />
            <span style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</span>
          </StyledOptionsRadioButtonContainer>
          {option.price > 0 && <span style={{ margin: 0, padding: 12 }}>+€{option.price}</span>}
        </StyledOptionsListItem>)}
      </StyledOptionsList>
    </StyledOptionsListContainer>
  </StyledOptionsWrapper>: <></>
}

export default MenuPageMultipleSelector