import React, { FunctionComponent } from "react";
import Main from "./main/main.common.templateOne.components";
import NavbarMobile from "./navbarMobile/navbar-mobile.common.templateOne.components";
import NavbarDesktop from "./navbarDesktop/navbar-desktop.common.templateOne.components";
import Footer from "./footer/footer.common.templateOne.components";
import LoginAllPages from "./login/login.common.templateOne.components";

export interface IPropsPageContainer {
  showFooter?: boolean
}

const PageContainer: FunctionComponent<IPropsPageContainer> = ({ children, showFooter=true }) => {
  
  return <>
    <NavbarDesktop />
    
    <Main>
      {children}
    </Main>

    {showFooter && <Footer />}

    <NavbarMobile />

    <LoginAllPages />
  </>

}

export default PageContainer