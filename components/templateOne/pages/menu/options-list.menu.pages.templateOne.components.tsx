import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { ICategoryProductChoiceOptions } from "../../../../interfaces/common/category.common.interfaces";
import { ILanguageData } from "../../../../interfaces/common/language-data.common.interfaces";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectLanguage } from "../../../../redux/slices/configuration.slices.redux";

export interface IChoiceData {
  name_json: ILanguageData
  options: Array<ICategoryProductChoiceOptions>|undefined
}

export interface IPropsMenuPageCategoryListItem {
  optionKey: number
  isOptionOpen: boolean
  choice: IChoiceData
  setSelectedOption(name: number|undefined): void
}

const Wrapper = styled.div`
  border-top: ${props => props.theme.border};
`

const TitleContainer = styled.div`
  cursor: pointer;
`

const ListContainer = styled.div<{ isOptionOpen: boolean }>`
  max-height: ${props => props.isOptionOpen? "260px": "0px"};
  overflow: auto;
  background-color: #f9f9f9;
  transition-duration: 500ms;
`

const List = styled.ul`
  border-top: ${props => props.theme.border};
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RadioButton = styled.span`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  display: block;
  border-radius: 100%;
  border: ${props => props.theme.border};
  background-color: ${props => props.theme.primaryColor};
`


const MenuPageOptionsList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ optionKey, choice, isOptionOpen, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)

  function toggle() {
    setSelectedOption(isOptionOpen? optionKey+1: optionKey)
  }

  return choice.options? <Wrapper>
    <TitleContainer onClick={toggle}>
      <p style={{ margin: 0, padding: 12 }}>{choice.name_json[language]}</p>
    </TitleContainer>
    <ListContainer isOptionOpen={isOptionOpen}>
      <List>
        {choice.options.map(option => <ListItem key={option.name_json.english}>
          <RadioButton /><p style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</p>
        </ListItem>)}
      </List>
    </ListContainer>
  </Wrapper>: <></>
}

export default MenuPageOptionsList