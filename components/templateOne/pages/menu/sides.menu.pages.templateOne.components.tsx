import React, { FunctionComponent, useState } from 'react';

import { ICategoryProductSideProducts } from '../../../../interfaces/common/category.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { selectSidesArray } from '../../../../redux/slices/menu.slices.redux';
import {
  selectItemSelectionSideProduct,
  updateItemSelectionAddSideProduct,
  updateItemSelectionRemoveSideProduct,
} from '../../../../redux/slices/item-selection.slices.redux';
import {
  StyledOptionsWrapper,
  StyledOptionsTitleContainer,
  StyledOptionsListContainer,
  StyledOptionsList,
  StyledOptionsListItem,
  StyledOptionsRadioButton,
  StyledOptionsRadioButtonContainer,
} from './options-list.menu.pages.templateOne.components';
import formatCurrency from '../../../../utils/formatCurrency';
import CustomLink from '../../common/amplitude/customLink';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number | undefined;
  productId: number;
  sideProduct: ICategoryProductSideProducts;
  getNextIndex(): number;
  setSelectedOption(name: number | undefined): void;
}

const MenuPageSides: FunctionComponent<IPropsMenuPageCategoryListItem> = ({
  productId,
  selectedOption,
  sideProduct,
  getNextIndex,
  setSelectedOption,
}) => {
  const language = useAppSelector(selectLanguage);
  const languageCode = useAppSelector(selectLanguageCode);
  const sidesList = useAppSelector((state) => selectSidesArray(state, sideProduct.option_ids));
  const selectedSides = useAppSelector((state) => selectItemSelectionSideProduct(state, productId));
  const dispatch = useAppDispatch();
  const [optionKey] = useState(getNextIndex());

  // const isOptionOpen = selectedOption === optionKey;
  // const toggle = () => setSelectedOption(isOptionOpen ? optionKey + 1 : optionKey);

  return sidesList.length > 0 ? (
    <StyledOptionsWrapper>
      <CustomLink
        amplitude={{
          type: 'card',
          text: sideProduct.name_json[language],
        }}
        // callback={toggle}
        Override={StyledOptionsTitleContainer}
      >
        <p style={{ margin: 0, padding: 12 }}>{sideProduct.name_json[language]}</p>
      </CustomLink>

      <StyledOptionsListContainer>
        <StyledOptionsList>
          {sidesList.map((option, index) => (
            <StyledOptionsListItem
              key={option.name_json.english}
              onClick={() => {
                amplitudeEvent(constructEventName(option.name_json[language], 'card'), {
                  id: option.id,
                  data: {
                    product_index: index,
                    price: option.price,
                    name: option.name_json,
                  },
                });

                if (selectedSides && selectedSides[option.id]) {
                  dispatch(updateItemSelectionRemoveSideProduct(option.id));
                } else {
                  dispatch(
                    updateItemSelectionAddSideProduct({
                      id: option.id,
                      data: {
                        price: option.price,
                        name: option.name_json,
                      },
                    }),
                  );
                }
              }}
            >
              <StyledOptionsRadioButtonContainer>
                <StyledOptionsRadioButton multiselect={true} selected={selectedSides ? selectedSides[option.id] !== undefined : false} />
                <span style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</span>
              </StyledOptionsRadioButtonContainer>
              {option.price > 0 && <span style={{ margin: 0, padding: 12 }}>+{formatCurrency(option.price, languageCode)}</span>}
            </StyledOptionsListItem>
          ))}
        </StyledOptionsList>
      </StyledOptionsListContainer>
    </StyledOptionsWrapper>
  ) : (
    <></>
  );
};

export default MenuPageSides;
