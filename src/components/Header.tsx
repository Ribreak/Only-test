import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Head>
      <Title>Исторические <br/> даты</Title>
    </Head>
  )
}
export default Header;

const Head = styled.header`
    position: absolute;
    left: 0;
    padding-left: 80px;
    border-left: 5px solid transparent;
    border-image: linear-gradient(
      to bottom,
      #3877EE 0,
      #EF5DA8 100%) 1; 
    @media (max-width: 768px) {
      border-left: none;
      padding-left: 0;
      position: static;
    }  
`;

const Title = styled.h1`
    font-size 56px;
    color: var(--accent-color);
    font-weight: 700;
    line-height: 1.2;
    overflow-wrap: break-word; 
`;
