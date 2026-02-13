import React from "react";
import styled from "styled-components";
import NavButton from "./NavButton";

interface sliderNavProps {
    currSlide: string;
    maxSlide: string;
    isMobile: boolean;
}

export const SliderNav = ({ currSlide, maxSlide, isMobile }: sliderNavProps) => {
    return (
        <Nav $mobile={isMobile}>
                <NavWrapper>
                    <StyledCounter>{`${currSlide}/${maxSlide}`}</StyledCounter>
                    <SliderButtons>
                        <NavButton isMobile={isMobile} direction='left' />
                        <NavButton isMobile={isMobile} direction='right' />
                    </SliderButtons>
                </NavWrapper>
            {isMobile && <StyledPagination className="mobilePagination"></StyledPagination>}
        </Nav>
    )
}

const Nav = styled.div<{ $mobile: boolean }>`
    ${props => props.$mobile ? 
        `
            position: relative;
            @media (min-width: 768px) {
                display: none;
            }
        ` 
        : 
        `
            position: absolute;
            bottom: 0;
            flex-direction: column;
            @media (max-width: 768px) {
                display: none;
            }
        `
    }
`;

const NavWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SliderButtons = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledCounter = styled.div`
    font-family: 'PT Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
`;

const StyledPagination = styled.div`
    position: absolute;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;
