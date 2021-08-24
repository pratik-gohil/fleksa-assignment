import React, { FunctionComponent } from 'react';

import {
  ICategoryMultipleProductChoice,
  ICategoryProduct,
  ICategorySingleProductChoice,
} from '../../../../interfaces/common/category.common.interfaces';
import MenuPageOptionsList from './options-list.menu.pages.templateOne.components';
import MenuPageMultipleChoiceList from './multiple-select.pages.templateOne.components';

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number | undefined;
  choice: ICategorySingleProductChoice | ICategoryMultipleProductChoice;
  choiceIndex: number;
  isOpen: boolean;
  product: ICategoryProduct;
  getNextIndex(reset?: boolean): number;
  setSelectedOption(name: number | undefined): void;
}

const MenuPageChoiceList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({
  product,
  isOpen,
  choiceIndex,
  choice,
  selectedOption,
  setSelectedOption,
  getNextIndex,
}) => {
  if (product.type_ === 'MULTIPLE') {
    return (
      <MenuPageMultipleChoiceList
        choice={choice as ICategoryMultipleProductChoice}
        getNextIndex={getNextIndex}
        isOpen={isOpen}
        mainName={product.name_json}
        topProductId={product.id}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    );
  } else {
    const tempChoice = choice as ICategorySingleProductChoice;
    if (tempChoice.options && tempChoice.options.length > 0) {
      return (
        <MenuPageOptionsList
          selectedOption={selectedOption}
          choice={tempChoice}
          productId={product.id}
          choiceIndex={choiceIndex}
          getNextIndex={getNextIndex}
          setSelectedOption={setSelectedOption}
        />
      );
    } else {
      return <></>;
    }
  }
};

export default MenuPageChoiceList;
