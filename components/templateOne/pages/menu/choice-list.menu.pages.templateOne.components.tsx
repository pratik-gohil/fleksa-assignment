import React, { FunctionComponent } from "react";

import { ICategoryMultipleProductChoice, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { IType } from "../../../../interfaces/common/types.common.interfaces";
import MenuPageOptionsList from "./options-list.menu.pages.templateOne.components";
import MenuPageMultipleChoiceList from "./multiple-select.pages.templateOne.components";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../redux/hooks.redux";
import { updateItemSelectionNewItem } from "../../../../redux/slices/item-selection.slices.redux";

export interface IPropsMenuPageCategoryListItem {
  productType: IType
  selectedOption: number|undefined
  choice: ICategorySingleProductChoice|ICategoryMultipleProductChoice
  choiceIndex: number
  topProductId: number
  isOpen: boolean
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ isOpen, topProductId, choiceIndex, productType, choice, selectedOption, setSelectedOption, getNextIndex }) => {
  const dispach = useAppDispatch()
  
  if (productType === "MULTIPLE") {
    return <MenuPageMultipleChoiceList
      choice={choice as ICategoryMultipleProductChoice}
      getNextIndex={getNextIndex}
      isOpen={isOpen}
      topProductId={topProductId}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  } else {
    useEffect(() => {
      if (isOpen) {
        dispach(updateItemSelectionNewItem({
          topProductId: topProductId,
          productId: topProductId,
          type: "SINGLE",
          mainName: choice.name_json,
          // partName: Single product type do not have part name
        }))
      }
    }, [ isOpen ])
    const tempChoice = choice as ICategorySingleProductChoice
    if (tempChoice.options && tempChoice.options.length > 0) {
      return <MenuPageOptionsList
        selectedOption={selectedOption}
        choice={tempChoice}
        productId={topProductId}
        choiceIndex={choiceIndex}
        getNextIndex={getNextIndex}
        setSelectedOption={setSelectedOption}
      />
    } else {
      return <></>
    }
  }
}

export default MenuPageChoiceList