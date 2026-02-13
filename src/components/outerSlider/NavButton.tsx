import React from "react";
import styled from "styled-components";

interface navButtonProps {
    direction: 'right' | 'left';
    isMobile: boolean;
}

const NavButton = ({ direction, isMobile }: navButtonProps) => {
    let classname: string;
    if (isMobile) {
        if (direction === 'left') {
            classname = 'mobilePrev';
        } else {
            classname = 'mobileNext';
        }
    } else {
        if (direction === 'left') {
            classname = 'outerPrev';
        } else {
            classname = 'outerNext';
        }
    }
    return (
        <StyledButton 
            $mobile={isMobile} 
            $direction={direction} 
            className={classname} 
        />
    )
}
export default NavButton;

const StyledButton = styled.button<{ $direction: 'right' | 'left', $mobile: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid var(--accent-color);
    cursor: pointer;
    z-index: 10;
    &:disabled {
        opacity: .5;
        cursor: auto;
    }
    ${props => props.$direction === "right" ?
        `&::after {
        border-right: 2px solid var(--accent-color);
        transform: rotate(45deg);
        left: calc(50% - var(--offset));
     }`
        :
        `&::after {
        border-left: 2px solid var(--accent-color);
        transform: rotate(-45deg);
        right: calc(50% - var(--offset));
     }`
    }
    &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-top: 2px solid var(--accent-color);
    }
    ${props => props.$mobile ? 
        `
            --offset: '4px';
            width: 25px;
            height: 25px;
            &::after {
                width: 4px;
                height: 4px;
            }
        `
        :
        `
            --offset: '6px';
            width: 50px;
            height: 50px;
        `
    }
`;