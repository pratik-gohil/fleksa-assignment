import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../constants/grid-system-configuration';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectOrderType } from '../../../../redux/slices/checkout.slices.redux';
import { selectLanguage } from '../../../../redux/slices/configuration.slices.redux';
import {
  selectViewableCategoriesSearch,
  selectMenuCategories,
  selectSearchQuery,
  updateMenuViewableCategories,
} from '../../../../redux/slices/menu.slices.redux';
import MenuPageProductListItem from './product-list-item.menu.pages.templateOne.components';
import { ICheckoutOrderTypes } from '../../../../redux/slices/checkout.slices.redux';
import { ICategory } from '../../../../interfaces/common/category.common.interfaces';

const List = styled.ul``;

const ListItem = styled.li`
  position: relative;
  z-index: 0;
`;

const CategoryImageContainer = styled.div`
  position: sticky;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  margin: 0 -15px;
  height: 200px;

  top: -80px;
  overflow: hidden;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin: inherit;
    top: -${(props) => props.theme.navDesktop.height - 20}px;
    border-radius: ${(props) => props.theme.borderRadius}px;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CategoryTitle = styled.h3`
  font-size: 26px;
  text-align: center;
  position: absolute;
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.01) 100%);
  padding: ${(props) => props.theme.dimen.X4 * 3}px 0 ${(props) => props.theme.dimen.X4}px 0;
  line-height: 1;
  span {
    font-size: 16px;
    font-weight: 400;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    padding: ${(props) => props.theme.dimen.X4 * 3}px 0 ${(props) => props.theme.dimen.X4}px 0;
  }
`;

const CategoryTitleSticky = styled.h3`
  font-size: 26px;
  margin: -2px -15px;
  text-align: center;
  position: sticky;
  top: 50px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  span {
    font-size: 16px;
    font-weight: 400;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    top: ${(props) => props.theme.navDesktop.height}px;
    padding: 0 0 ${(props) => props.theme.dimen.X4}px;
  }
`;

const Space = styled.div`
  width: 100%;
  height: 100px;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    height: 1rem;
  }
`;

const CateogryDescription = styled.p`
  padding: 0 0.5rem 0.5rem 0.5rem;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex: 1 1 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
const CategoryStickyTitle = styled.h3`
  padding: 0;
  margin: 0;
`;

const MenuPageCategoryList: FunctionComponent = ({}) => {
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector(selectSearchQuery);
  const categories = useAppSelector((state) => selectViewableCategoriesSearch(state, searchQuery));
  const orderType = useAppSelector(selectOrderType);
  const menuCategories = useAppSelector(selectMenuCategories);

  const [openItemId, setOpenItemId] = useState<number | undefined>();

  // TODO: Filter categories based on ordertype selection
  useEffect(() => {
    if (orderType) {
      const properOrderType = (orderType === 'DINE_IN' ? 'DINEIN' : orderType) as ICheckoutOrderTypes;

      const alwaysCategories = menuCategories.filter((category) => category.availability.always);

      const specificCategories: ICategory[] = [];

      // ?? Loop through specificCategories for update the array
      menuCategories
        .filter((category) => !category.availability.always)
        .forEach((category) => {
          if (category.availability.order_type_?.includes(properOrderType)) {
            specificCategories.push(category);
          }
        });

      dispatch(updateMenuViewableCategories([...specificCategories, ...alwaysCategories]));
    }
  }, [orderType]);

  return (
    <>
      <Space />

      <List>
        {categories.map((category, index) => {
          if (category.products.length === 0) return <Fragment key={index} />;

          return (
            <Fragment key={index}>
              <ListItem
                id={category.name_json.english
                  .toLowerCase()
                  .replace(/[^A-Za-z0-9]/g, '')
                  .split(' ')
                  .join('-')}
              >
                {!!category.image ? (
                  <CategoryImageContainer>
                    <CategoryImage src={category.image} alt="category image" />
                    <CategoryTitle>
                      {category.name_json[language]}
                      <br />
                      {!!category.description_json?.[language] && <span>{category.description_json[language]}</span>}
                    </CategoryTitle>
                  </CategoryImageContainer>
                ) : (
                  <CategoryTitleSticky>
                    <CategoryStickyTitle>{category.name_json[language]}</CategoryStickyTitle>
                    <CateogryDescription>
                      {!!category.description_json?.[language] && category.description_json[language]}
                    </CateogryDescription>
                  </CategoryTitleSticky>
                )}

                <List>
                  {category.products.map((product) => (
                    <MenuPageProductListItem
                      key={product.id}
                      product={product}
                      isOpen={product.id === openItemId}
                      setOpenItemId={setOpenItemId}
                    />
                  ))}
                </List>
              </ListItem>
            </Fragment>
          );
        })}
      </List>
    </>
  );
};

export default MenuPageCategoryList;
