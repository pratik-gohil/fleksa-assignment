import React, { FunctionComponent } from "react";
import IndexPageFavouriteDishes from "../../components/templateOne/pages/index/favourite-dishes.index.pages.templateOne.components";
import IndexPageHero from "../../components/templateOne/pages/index/hero.index.pages.templateOne.components";
import IndexPageCustomerReviews from "../../components/templateOne/pages/index/customer-reviews.index.pages.templateOne.components";
import IndexPageAboutUs from "../../components/templateOne/pages/index/about-us.index.pages.templateOne.components";


const IndexPageTemplateOne: FunctionComponent = ({}) => {
  return <>
    <IndexPageHero />
    <IndexPageFavouriteDishes />
    <IndexPageAboutUs />
    <IndexPageCustomerReviews />
  </>

}

export default IndexPageTemplateOne
