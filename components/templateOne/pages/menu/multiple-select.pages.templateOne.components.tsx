import React, { Fragment, FunctionComponent } from "react";
import { useState } from "react";

import { ICategoryMultipleProductChoice, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectParts } from "../../../../redux/slices/menu.slices.redux";
import MenuPageOptionsList, { IChoiceData } from "./options-list.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number|undefined
  choice: ICategoryMultipleProductChoice
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageMultipleChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ choice, selectedOption, setSelectedOption, getNextIndex }) => {
  const [ selectionMultiple, setSelectionMultiple ] = useState<number>(choice.choice[0])

  const parts = useAppSelector(state => selectParts(state, choice.choice))
  const choicesMulti: IChoiceData = {
    name_json: choice.name_json,
    options: []
  }
  choice.choice.map(chId => {
    choicesMulti.options?.push({
      name_json: parts[chId].name_json,
      price: parts[chId].price
    })
  })
  const optionKeyTemp = getNextIndex()
  return <>
    <MenuPageOptionsList
      key={optionKeyTemp}
      optionKey={optionKeyTemp}
      choice={choicesMulti}
      isOptionOpen={selectedOption === optionKeyTemp}
      setSelectedOption={setSelectedOption}
    />
    {parts[selectionMultiple] && parts[selectionMultiple].choice?.map(choice => {
      if (choice.options && choice.options.length > 0) {
        const optionKey = getNextIndex()
        return <MenuPageOptionsList
          key={optionKey}
          optionKey={optionKey}
          choice={choice}
          isOptionOpen={selectedOption === optionKey}
          setSelectedOption={setSelectedOption}
        />
      }
      return <Fragment key={selectionMultiple} />
    })}
  </>
}

export default MenuPageMultipleChoiceList