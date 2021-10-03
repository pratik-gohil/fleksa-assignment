import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, useState } from 'react';

import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import formatCurrency from '../../../../utils/formatCurrency';
import CustomLink from '../../common/amplitude/customLink';
import { IChoiceDataWithId } from './multiple-select.pages.templateOne.components';
import {
  StyledOptionsWrapper,
  StyledOptionsTitleContainer,
  StyledOptionsListContainer,
  StyledOptionsList,
  StyledOptionsListItem,
  StyledOptionsRadioButton,
  StyledOptionsRadioButtonContainer,
} from './options-list.menu.pages.templateOne.components';

export interface IPropsMenuPageCategoryListItem {
  selectedOption: number | undefined;
  choice: IChoiceDataWithId;
  selectionMultipleId: number;
  setSelectionMultipleId(id: number): void;
  getNextIndex(): number;
  setSelectedOption(name: number | undefined): void;
}

const MenuPageMultipleSelector: FunctionComponent<IPropsMenuPageCategoryListItem> = ({
  choice,
  selectedOption,
  selectionMultipleId,
  setSelectionMultipleId,
  getNextIndex,
  setSelectedOption,
}) => {
  const language = useAppSelector(selectLanguage);
  const languageCode = useAppSelector(selectLanguageCode);
  const [optionKey] = useState(getNextIndex());
  const { t } = useTranslation('page-menu-by-id');

  const isOptionOpen = selectedOption === optionKey;
  const toggle = () => setSelectedOption(isOptionOpen ? optionKey + 1 : optionKey);

  return choice.options && choice.options.length > 0 ? (
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
        <p style={{ margin: 0, padding: 12 }}>
          {isOptionOpen ? t('@choose-one') : choice.options.filter((i) => i.id === selectionMultipleId)[0].name_json[language]}
        </p>
      </CustomLink>

      <StyledOptionsListContainer isOptionOpen={isOptionOpen}>
        <StyledOptionsList>
          {choice.options.map((option, index) => (
            <StyledOptionsListItem
              key={option.name_json.english}
              onClick={() => {
                if (option.id !== selectionMultipleId) {
                  setSelectionMultipleId(option.id);
                }
                setSelectedOption(optionKey + 1);

                amplitudeEvent(constructEventName(option.name_json[language], 'card'), {
                  id: option.id,
                  data: {
                    product_index: index,
                    price: option.price,
                    name: option.name_json,
                  },
                });
              }}
            >
              <StyledOptionsRadioButtonContainer>
                <StyledOptionsRadioButton multiselect={false} selected={option.id === selectionMultipleId} />
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

export default MenuPageMultipleSelector;
