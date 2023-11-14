import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img className="png" src="./images/logo.png" alt="my logo img" />
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .logo {
    height: 5rem;
  }
  // .png{
  //   width:100%;
  //   height: 30rem;
  //   position:relative;
  //   margin:0;
  //   padding:0;
  // }
  .png {
    width: 62%;
    height: 10rem;
    position: relative;
    margin: 0;
    padding: 0;
  }
  
  @media only screen and (max-width: 767px) {
    .png {
      height: 10rem;
    }
  }
  
`;

export default Header;
