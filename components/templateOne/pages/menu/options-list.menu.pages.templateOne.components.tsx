import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ICategoryProductChoiceOptions } from '../../../../interfaces/common/category.common.interfaces';
import { ILanguageData } from '../../../../interfaces/common/language-data.common.interfaces';
import { IType } from '../../../../interfaces/common/types.common.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { selectItemSelectionChoice, updateItemSelectionChoice } from '../../../../redux/slices/item-selection.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import formatCurrency from '../../../../utils/formatCurrency';
import CustomLink from '../../common/amplitude/customLink';

export interface IChoiceData {
  name_json: ILanguageData;
  options: Array<ICategoryProductChoiceOptions> | undefined;
  type_: IType;
}

export interface IPropsMenuPageCategoryListItem {
  choice: IChoiceData;
  selectedOption: number | undefined;
  productId: number;
  choiceIndex: number;
  getNextIndex(): number;
  setSelectedOption(name: number | undefined): void;
}

export const StyledOptionsWrapper = styled.div``;

export const StyledOptionsTitleContainer = styled.a`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const StyledOptionsListContainer = styled.div<{ isOptionOpen: boolean }>`
  max-height: ${(props) => (props.isOptionOpen ? '260px' : '0px')};
  overflow: auto;
  transition-duration: 500ms;
`;

export const StyledOptionsList = styled.ul``;

export const StyledOptionsListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const StyledOptionsRadioButton = styled.span<{ selected: boolean; multiselect: boolean }>`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  display: block;
  border-radius: ${(props) => (props.multiselect ? '4px' : '100%')};
  background-color: ${(props) => props.selected && props.theme.primaryColor};
`;

export const StyledOptionsRadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuPageOptionsList: FunctionComponent<IPropsMenuPageCategoryListItem> = ({
  productId,
  choiceIndex,
  getNextIndex,
  choice,
  selectedOption,
  setSelectedOption,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('page-menu-id');

  const language = useAppSelector(selectLanguage);
  const languageCode = useAppSelector(selectLanguageCode);
  const optionData = useAppSelector((state) => selectItemSelectionChoice(state, productId));
  const [optionKey] = useState(getNextIndex());

  const selectedIndex = optionData && optionData[choiceIndex];
  if (optionData && !selectedIndex && choice.options) {
    dispatch(
      updateItemSelectionChoice({
        id: choiceIndex,
        data: {
          product_index: 0,
          price: choice.options[0].price,
          name: choice.options[0].name_json,
        },
      }),
    );
  }

  const isOptionOpen = selectedOption === optionKey;
  const toggle = () => setSelectedOption(isOptionOpen ? optionKey + 1 : optionKey);

  return (
    <StyledOptionsWrapper>
      <CustomLink
        amplitude={{
          type: 'card',
          text: choice.name_json[language],
        }}
        callback={toggle}
        Override={StyledOptionsTitleContainer}
      >
        <p style={{ margin: 0, padding: 12, fontWeight: 'bold' }}>{choice.name_json[language]}</p>
        <p style={{ margin: 0, padding: 12 }}>{isOptionOpen ? t('@choose-one') : selectedIndex?.name[language]}</p>
      </CustomLink>

      <StyledOptionsListContainer isOptionOpen={isOptionOpen}>
        <StyledOptionsList>
          {choice.options?.map((option, index) => (
            <StyledOptionsListItem
              key={option.name_json.english}
              onClick={() => {
                dispatch(
                  updateItemSelectionChoice({
                    id: choiceIndex,
                    data: {
                      product_index: index,
                      price: option.price,
                      name: option.name_json,
                    },
                  }),
                );
                setSelectedOption(optionKey + 1);
                amplitudeEvent(constructEventName(option.name_json[language], 'card'), {
                  id: choiceIndex,
                  data: {
                    product_index: index,
                    price: option.price,
                    name: option.name_json,
                  },
                });
              }}
            >
              <StyledOptionsRadioButtonContainer>
                <StyledOptionsRadioButton multiselect={false} selected={index === selectedIndex?.product_index} />

                <span style={{ margin: 0, padding: 12 }}>{option.name_json[language]}</span>
              </StyledOptionsRadioButtonContainer>

              {option.price > 0 && <span style={{ margin: 0, padding: 12 }}>+{formatCurrency(option.price, languageCode)}</span>}
            </StyledOptionsListItem>
          ))}
        </StyledOptionsList>
      </StyledOptionsListContainer>
    </StyledOptionsWrapper>
  );
};

export default MenuPageOptionsList;
