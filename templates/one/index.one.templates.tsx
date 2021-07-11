import React, { FunctionComponent } from 'react';
import IndexPageFavouriteDishes from '../../components/templateOne/pages/index/favourite-dishes.index.pages.templateOne.components';
import IndexPageHero from '../../components/templateOne/pages/index/hero.index.pages.templateOne.components';
import IndexPageCustomerReviews from '../../components/templateOne/pages/index/customer-reviews.index.pages.templateOne.components';
import IndexPageAboutUs from '../../components/templateOne/pages/index/about-us.index.pages.templateOne.components';
import IndexBanner from '../../components/templateOne/pages/index/banner.index.pages.templateOne.components';
import IndexMultiRestaurantShowCase from '../../components/templateOne/pages/index/multi-restro-showcase.index.pages.templateOne.components';

const IndexPageTemplateOne: FunctionComponent = ({}) => {
  return (
    <>
      <IndexBanner />
      <IndexPageHero />
      <IndexMultiRestaurantShowCase />
      <IndexPageFavouriteDishes />
      <IndexPageAboutUs />
      <IndexPageCustomerReviews />
    </>
  );
};

export default IndexPageTemplateOne;
