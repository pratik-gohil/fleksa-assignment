import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import IndexPageFavouriteDishes from '../../components/templateOne/pages/index/favourite-dishes.index.pages.templateOne.components';
import IndexPageHero from '../../components/templateOne/pages/index/hero.index.pages.templateOne.components';
import IndexPageCustomerReviews from '../../components/templateOne/pages/index/customer-reviews.index.pages.templateOne.components';
import IndexPageAboutUs from '../../components/templateOne/pages/index/about-us.index.pages.templateOne.components';
import IndexBanner from '../../components/templateOne/pages/index/banner.index.pages.templateOne.components';
import IndexMultiRestaurantShowCase from '../../components/templateOne/pages/index/multi-restro-showcase.index.pages.templateOne.components';
import AppSection from '../../components/templateOne/common/appSection/app-section.common.template-one.compnent';

const Wrapper = styled.div``;

const IndexPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <Wrapper>
      <IndexBanner />
      <IndexPageHero />
      <IndexMultiRestaurantShowCase />
      <IndexPageFavouriteDishes />
      <IndexPageAboutUs />
      <IndexPageCustomerReviews />
      <AppSection />
    </Wrapper>
  );
};

export default IndexPageTemplateOne;
