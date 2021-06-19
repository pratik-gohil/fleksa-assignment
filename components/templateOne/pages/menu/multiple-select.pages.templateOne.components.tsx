import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { ICategoryMultipleProductChoice } from "../../../../interfaces/common/category.common.interfaces";
import { ILanguageData } from "../../../../interfaces/common/language-data.common.interfaces";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.redux";
import { selectParts } from "../../../../redux/slices/menu.slices.redux";
import { updateItemSelectionNewItem } from "../../../../redux/slices/item-selection.slices.redux";
import MenuPageMultipleSelector from "./multiple-selector.pages.templateOne.components";
import MenuPageOptionsList, { IChoiceData } from "./options-list.menu.pages.templateOne.components";
import MenuPageSides from "./sides.menu.pages.templateOne.components";

export interface IChoiceDataWithId extends IChoiceData {
  options: Array<{
    name_json: ILanguageData
    price: number
    id: number
  }>
}

export interface IPropsMenuPageCategoryListItem {
  isOpen: boolean
  mainName: ILanguageData
  topProductId: number
  selectedOption: number|undefined
  choice: ICategoryMultipleProductChoice
  getNextIndex(reset?: boolean): number
  setSelectedOption(name: number|undefined): void
}

const MenuPageMultipleChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ mainName, isOpen, choice, topProductId, selectedOption, setSelectedOption, getNextIndex }) => {
  const [ selectionMultipleId, setSelectionMultipleId ] = useState<number>(choice.choice[0])
  const dispach = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      dispach(updateItemSelectionNewItem({
        topProductId,
        productId: selectionMultipleId,
        type: "MULTIPLE",
        mainName: mainName,
        partName: parts[selectionMultipleId].name_json,
        cost: parts[selectionMultipleId].price
      }))
    }
  }, [ isOpen, selectionMultipleId ])

  const parts = useAppSelector(state => selectParts(state, choice.choice))
  const choicesMulti: IChoiceDataWithId = {
    name_json: choice.name_json,
    options: [],
    type_: "SINGLE"
  }
  choice.choice.map(chId => {
    choicesMulti.options?.push({
      name_json: parts[chId].name_json,
      price: parts[chId].price,
      id: parts[chId].id
    })
  })
  return <>
    <MenuPageMultipleSelector
      selectedOption={selectedOption}
      choice={choicesMulti}
      selectionMultipleId={selectionMultipleId}
      setSelectionMultipleId={id => setSelectionMultipleId(id)}
      getNextIndex={getNextIndex}
      setSelectedOption={setSelectedOption}
    />
    {parts[selectionMultipleId] && parts[selectionMultipleId].choice?.map((cho, index) => {
      if (cho.options && cho.options.length > 0) {
        return <MenuPageOptionsList
          key={index}
          choiceIndex={index}
          selectedOption={selectedOption}
          choice={cho}
          productId={selectionMultipleId}
          getNextIndex={getNextIndex}
          setSelectedOption={setSelectedOption}
        />
      }
      return <></>
    })}
    {parts[selectionMultipleId] && parts[selectionMultipleId].side_products_json?.map(sideProduct => {
      return <MenuPageSides
        selectedOption={selectedOption}
        sideProduct={sideProduct}
        productId={selectionMultipleId}
        setSelectedOption={id => setSelectedOption(id)}
        getNextIndex={getNextIndex}
      />
    })}
  </>
}

export default MenuPageMultipleChoiceList