import React, { FunctionComponent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';
import { selectLanguage, selectLanguageCode } from '../../../../redux/slices/configuration.slices.redux';
import { ICategoryProduct } from '../../../../interfaces/common/category.common.interfaces';
import MenuPageChoiceList from './choice-list.menu.pages.templateOne.components';
import AddButton from '../../common/addButton/add-button.common.templateOne.components';
import { memo } from 'react';
import MenuPageSides from './sides.menu.pages.templateOne.components';
import formatCurrency from '../../../../utils/formatCurrency';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { updateItemSelectionNewItem } from '../../../../redux/slices/item-selection.slices.redux';

export interface IPropsMenuPageCategoryListItem {
  product: ICategoryProduct;
  isOpen: boolean;
  setOpenItemId(id: number | undefined): void;
}

interface IPropsStyledBase {
  isOpen: boolean;
}

interface IPropsBannerImage extends IPropsStyledBase {}
interface IPropsListItem extends IPropsStyledBase {}
interface IPropsOptionsContainer extends IPropsStyledBase {}
interface IPropsClosedViewInfoImage extends IPropsStyledBase {}

const ListItem = styled.li<IPropsListItem>`
  overflow: hidden;
  margin: -2px -15px;
  transition-duration: 500ms;
  z-index: -1;
  padding: 0 20px;
  @media (min-width: ${BREAKPOINTS.sm}px) {
    margin: 20px 0;
    border: ${(props) => (props.isOpen ? props.theme.border : '1px solid transparent')};
    ${(props) =>
      props.isOpen &&
      css`
        box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.2);
      `}
    border-radius: ${(props) => props.theme.borderRadius}px;
    &:hover {
      border: ${(props) => props.theme.border};
    }
  }
`;

const BannerImage = styled.img<IPropsBannerImage>`
  height: ${(props) => (props.isOpen ? 200 : 0)}px;
  width: 100%;
  object-fit: contain;
  display: block;
  transition-duration: 500ms;
`;

const ClosedViewContainer = styled.div`
  cursor: pointer;
  transition-duration: 500ms;
  border-top: ${(props) => props.theme.border};
`;

const ClosedViewInfoContainer = styled.div`
  display: flex;
  padding: 12px 0;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    padding: 12px 0;
  }
`;

const ClosedViewInfoContainerSection1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClosedViewInfoContainerSection2 = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
`;

const ClosedViewInfoImage = styled.img<IPropsClosedViewInfoImage>`
  width: inherit;
  height: 100px;
  object-fit: cover;
  opacity: ${(props) => (props.isOpen ? 0 : 1)};
  border-radius: ${(props) => props.theme.borderRadius}px;
  transition-duration: 500ms;
`;

const OptionsContainer = styled.div<IPropsOptionsContainer>`
  ${(props) =>
    props.isOpen &&
    css`
      border-top: ${(props) => props.theme.border};
      border-bottom: ${(props) => props.theme.border};
      margin: 20px 0;
    `}
  max-height: ${(props) => (props.isOpen ? '700px' : '0px')};
  transition-duration: 500ms;
`;

const RecipeName = styled.h4`
  font-size: 18px;
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

const RecipeDescription = styled.p`
  font-size: 16px;
  margin: 0;
  padding: 0;
`;

const RecipeCost = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 700;
`;

const MenuPageProductListItem: FunctionComponent<IPropsMenuPageCategoryListItem> = ({ product, isOpen, setOpenItemId }) => {
  const language = useAppSelector(selectLanguage);
  const languageCode = useAppSelector(selectLanguageCode);
  const [selectedOption, setSelectedOption] = useState<number | undefined>(1);
  const dispatch = useAppDispatch();

  let optionsIndex = 0;
  const getNextIndex = () => ++optionsIndex;

  function toggle() {
    if (
      (!!product.choice && product.choice.length > 0) ||
      (!!product.side_products_json && product.side_products_json.length > 0) ||
      product.image
    ) {
      amplitudeEvent(constructEventName('product wrapper', 'card'), { product, isOpen });

      if (isOpen) setOpenItemId(undefined);
      else {
        setOpenItemId(product.id);
        setSelectedOption(1);
      }
    }
  }

  useEffect(() => {
    if (isOpen && product.type_ === 'SINGLE') {
      dispatch(
        updateItemSelectionNewItem({
          topProductId: product.id,
          productId: product.id,
          type: 'SINGLE',
          mainName: product.name_json,
          cost: product.price,
          // partName: Single product type do not have part name
        }),
      );
    }
  }, [isOpen]);

  return (
    <ListItem isOpen={isOpen} id={`product-id-${product.id}`}>
      <ClosedViewContainer onClick={toggle}>
        {product.image && <BannerImage src={product.image} loading="lazy" isOpen={isOpen} />}

        <ClosedViewInfoContainer>
          <ClosedViewInfoContainerSection1>
            <RecipeName>{product.name_json[language]}</RecipeName>

            <RecipeDescription>{product.description_json[language]}</RecipeDescription>

            <RecipeCost>{formatCurrency(product.price, languageCode)}</RecipeCost>
          </ClosedViewInfoContainerSection1>

          <ClosedViewInfoContainerSection2>
            {product.image && <ClosedViewInfoImage src={product.image} loading="lazy" isOpen={isOpen} />}

            {!isOpen && (
              <AddButton
                setOpenItemId={setOpenItemId}
                product={product}
                canOpen={
                  (!!product.choice && product.choice.length > 0) || (!!product.side_products_json && product.side_products_json.length > 0)
                }
                hasImage={!!product.image}
                isOpen={isOpen}
              />
            )}
          </ClosedViewInfoContainerSection2>
        </ClosedViewInfoContainer>
      </ClosedViewContainer>

      <OptionsContainer isOpen={isOpen}>
        {product.choice &&
          product.choice.map((cho, index) => (
            <MenuPageChoiceList
              key={cho.name_json.english + index}
              getNextIndex={getNextIndex}
              choice={cho}
              isOpen={isOpen}
              product={product}
              choiceIndex={index}
              selectedOption={selectedOption}
              setSelectedOption={(id) => setSelectedOption(id)}
            />
          ))}

        {product.type_ === 'SINGLE' &&
          Array.isArray(product.side_products_json) &&
          product.side_products_json?.map((sideProduct) => {
            return (
              <MenuPageSides
                key={sideProduct.name_json.english}
                selectedOption={selectedOption}
                sideProduct={sideProduct}
                productId={product.id}
                setSelectedOption={(id) => setSelectedOption(id)}
                getNextIndex={getNextIndex}
              />
            );
          })}
      </OptionsContainer>
      {((((!!product.choice && product.choice.length > 0) || (!!product.side_products_json && product.side_products_json.length > 0)) &&
        isOpen) ||
        (isOpen && !!product.image)) && (
        <AddButton
          isBottom={true}
          setOpenItemId={setOpenItemId}
          product={product}
          canOpen={
            (!!product.choice && product.choice.length > 0) || (!!product.side_products_json && product.side_products_json.length > 0)
          }
          hasImage={!!product.image}
          isOpen={isOpen}
        />
      )}
    </ListItem>
  );
};

export default memo(MenuPageProductListItem, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});
