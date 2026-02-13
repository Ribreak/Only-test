import React from "react";
import styled from "styled-components";

interface navButtonProps {
    direction: 'right' | 'left';
    hidden: boolean;
}

const NavButton = ({ direction, hidden }: navButtonProps) => {
    return (
        <StyledButton 
            className={direction === 'left' ? 'innerPrev' : 'innerNext'} 
            $direction={direction} 
            $hidden={hidden} 
        />
    )
}
export default NavButton;

const StyledButton = styled.button<{ $direction: "right" | "left", $hidden: boolean }>`
    display: ${props => props.$hidden ? "none" : "flex"};
    position: absolute;
    top: calc(50% - 20px);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;

    ${props => props.$direction === "right" ?
        `right: 0;
         &::after {
            border-right: 2px solid var(--secondary-color);
            transform: rotate(45deg);
            left: calc(50% - 6px);
         }`
        :
        `left: 0;
         &::after {
            border-left: 2px solid var(--secondary-color);
            transform: rotate(-45deg);
            right: calc(50% - 6px);
         }`
    }

    &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-top: 2px solid var(--secondary-color);
    }

    @media (max-width: 768px) {
        display: none;
    }
`;
