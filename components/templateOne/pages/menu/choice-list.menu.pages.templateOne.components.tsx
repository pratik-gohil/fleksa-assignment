import React, { Fragment, FunctionComponent } from "react";

import { ICategoryMultipleProductChoice, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { IType } from "../../../../interfaces/common/types.common.interfaces";
import { useAppSelector } from "../../../../redux/hooks.redux";
import { selectParts } from "../../../../redux/slices/menu.slices.redux";
import MenuPageOptionsList, { IChoiceData } from "./options-list.menu.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  productType: IType
  selectedOption: number|undefined
  choice: ICategorySingleProductChoice|ICategoryMultipleProductChoice
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ productType, choice, selectedOption, setSelectedOption, getNextIndex }) => {
  if (productType === "MULTIPLE") {
    const tempChoice = choice as ICategoryMultipleProductChoice
    const parts = useAppSelector(state => selectParts(state, tempChoice.choice))
    const choicesMulti: IChoiceData = {
      name_json: tempChoice.name_json,
      options: []
    }
    tempChoice.choice.map(chId => {
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
      {tempChoice.choice.map(chId => {
        return parts[chId].choice?.map(choice => {
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
          return <Fragment key={chId} />
        })
      })}
    </>
  } else {
    const tempChoice = choice as ICategorySingleProductChoice
    const optionKey = getNextIndex()
    return <MenuPageOptionsList
      optionKey={optionKey}
      choice={tempChoice}
      isOptionOpen={selectedOption === optionKey}
      setSelectedOption={setSelectedOption}
    />
  }
}

export default MenuPageChoiceList