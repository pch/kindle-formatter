import React from "react";
import { Header, Logo, NavGroup, Nav } from "./PageHeaderStyles";

export const PageHeader = () => {
  return (
    <Header>
      <NavGroup>
        <Logo>
          <span role="img" aria-label="books icon">
            📚
          </span>{" "}
          Kindle Highlights Formatter
        </Logo>
      </NavGroup>

      <Nav>
        <nav>
          <ul>
            <li>
              <a href="https://github.com/pch/kindle-formatter">Source Code</a>
            </li>
          </ul>
        </nav>
      </Nav>
    </Header>
  );
};
