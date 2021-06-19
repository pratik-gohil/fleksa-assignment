import React, { FunctionComponent } from "react";

import { ICategoryMultipleProductChoice, ICategoryProduct, ICategorySingleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import MenuPageOptionsList from "./options-list.menu.pages.templateOne.components";
import MenuPageMultipleChoiceList from "./multiple-select.pages.templateOne.components";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../redux/hooks.redux";
import { updateItemSelectionNewItem } from "../../../../redux/slices/item-selection.slices.redux";

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number|undefined
  choice: ICategorySingleProductChoice|ICategoryMultipleProductChoice
  choiceIndex: number
  isOpen: boolean
  product: ICategoryProduct
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ product, isOpen, choiceIndex, choice, selectedOption, setSelectedOption, getNextIndex }) => {
  const dispach = useAppDispatch()
  
  if (product.type_ === "MULTIPLE") {
    return <MenuPageMultipleChoiceList
      choice={choice as ICategoryMultipleProductChoice}
      getNextIndex={getNextIndex}
      isOpen={isOpen}
      mainName={product.name_json}
      topProductId={product.id}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  } else {
    useEffect(() => {
      if (isOpen) {
        dispach(updateItemSelectionNewItem({
          topProductId: product.id,
          productId: product.id,
          type: "SINGLE",
          mainName: product.name_json,
          cost: product.price
          // partName: Single product type do not have part name
        }))
      }
    }, [ isOpen ])
    const tempChoice = choice as ICategorySingleProductChoice
    if (tempChoice.options && tempChoice.options.length > 0) {
      return <MenuPageOptionsList
        selectedOption={selectedOption}
        choice={tempChoice}
        productId={product.id}
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