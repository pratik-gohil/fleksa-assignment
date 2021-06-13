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
  isOptionOpen: boolean
  choice: IChoiceData
  setSelectedOption(name: string|undefined): void
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
`

const List = styled.ul`
  border-top: ${props => props.theme.border};
`

const ListItem = styled.li`

`


const MenuPageOptionsList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ choice, isOptionOpen, setSelectedOption }) => {
  const language = useAppSelector(selectLanguage)

  return choice.options? <Wrapper>
    <TitleContainer onClick={() => setSelectedOption(choice.name_json.english)}>
      <p style={{ margin: 0, padding: 12 }}>{choice.name_json[language]}</p>
    </TitleContainer>
    <ListContainer isOptionOpen={isOptionOpen}>
      <List>
        {choice.options.map(option => <ListItem>
          <p style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</p>
        </ListItem>)}
      </List>
    </ListContainer>
  </Wrapper>: <></>
}

export default MenuPageOptionsList