import React, { FunctionComponent } from "react";
import { useState } from "react";
import styled from "styled-components";
import AccountPageMyAccount from "../../components/templateOne/pages/account/my-account.account.pages.templateOne.components";

const List = styled.ul`

`

const ListItem = styled.li`

`

const TitleContainer = styled.div`

`

const Title = styled.h2`

`

const ContentContainer = styled.div<{isOpen: boolean}>`
  max-height: ${props => props.isOpen? '500px': 0};
  overflow: hidden;
  transition-duration: 500ms;
`

const AccountPageTemplateOne: FunctionComponent = ({}) => {
  const [ indexOpen, setIndexOpen ] = useState<number|undefined>()

  return <List>
    {[{
      titleText: 'My Account',
      titleImage: '',
      content: AccountPageMyAccount,
    }, {
      titleText: 'Order History',
      titleImage: '',
      content: AccountPageMyAccount,
    }, {
      titleText: 'Addresses',
      titleImage: '',
      content: AccountPageMyAccount,
    }, {
      titleText: 'Logout',
      titleImage: '',
    }].map((item, index) => <ListItem key={index}>
      <TitleContainer onClick={() => item.content && setIndexOpen(indexOpen === index? undefined: index)}>
        <Title>{item.titleText}</Title>
      </TitleContainer>
      {item.content && <ContentContainer isOpen={indexOpen === index}>
        <item.content />
      </ContentContainer>}
    </ListItem>)}
  </List>

}

export default AccountPageTemplateOne
