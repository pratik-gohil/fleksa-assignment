import React, { FunctionComponent } from "react";
import Main from "./main/main.common.templateOne.components";
import NavbarMobile from "./navbarMobile/navbar-mobile.common.templateOne.components";
import NavbarDesktop from "./navbarDesktop/navbar-desktop.common.templateOne.components";
import Footer from "./footer/footer.common.templateOne.components";

const PageContainer: FunctionComponent = ({ children }) => {
  
  return <>
    <NavbarDesktop />
    
    <Main>
      {children}
    </Main>

    <Footer />

    <NavbarMobile />
  </>

}

export default PageContainer