import { FunctionComponent } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks.redux";
import { selectSearchQuery, updateSearchQuery } from "../../../../redux/slices/menu.slices.redux";

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.dimen.X4}px;
  margin: ${props => props.theme.dimen.X4*2}px 0;
  border: ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius}px;
`

const MenuSearch: FunctionComponent = () => {
  const searchQuery = useAppSelector(selectSearchQuery)
  const dispach = useAppDispatch()

  return <SearchInput
    placeholder="Search Here"
    value={searchQuery}
    onChange={ev => dispach(updateSearchQuery(ev.target.value.toLowerCase()))}
  />
}

export default MenuSearch