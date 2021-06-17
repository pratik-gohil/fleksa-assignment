import React, { FunctionComponent } from "react";

import { ICategoryMultipleProductChoice, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { IType } from "../../../../interfaces/common/types.common.interfaces";
import MenuPageOptionsList from "./options-list.menu.pages.templateOne.components";
import MenuPageMultipleChoiceList from "./multiple-select.pages.templateOne.components";

export interface IPropsMenuPageCategoryListItem {
  productType: IType
  selectedOption: number|undefined
  choice: ICategorySingleProductChoice|ICategoryMultipleProductChoice
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ productType, choice, selectedOption, setSelectedOption, getNextIndex }) => {
  if (productType === "MULTIPLE") {
    return <MenuPageMultipleChoiceList
      choice={choice as ICategoryMultipleProductChoice}
      getNextIndex={getNextIndex}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
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