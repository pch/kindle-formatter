import styled from "styled-components";
import { breakpoints } from "appConfig";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--header-bg);
  color: var(--header-text-volor);
  height: var(--header-height);
  padding: var(--header-padding);

  box-shadow: 0 0 5px var(--light-grey-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: var(--text-sm);

  a {
    color: var(--header-text-volor);
    display: block;
  }

  @media ${breakpoints.breakM} {
    padding: 0 var(--spacing-md);
  }
`;

export const Logo = styled.div`
  position: relative;
  font-weight: bold;

  svg {
    display: block;
    fill: var(--white);
  }
`;

export const Nav = styled.div`
  nav > ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  nav > ul > li {
    margin-left: var(--spacing-xl);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    margin-left: var(--spacing-xl);
  }
`;
