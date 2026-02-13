import React from "react";
import styled from "styled-components"

interface SlideContentProps {
    year: string;
    text: string;
}

const SlideContent = ({year, text}: SlideContentProps) => {
  return (
    <StyledDiv>
        <SlideYear>{year}</SlideYear>
        <SlideText>{text}</SlideText>
    </StyledDiv>
  )
}
export default SlideContent;

const StyledDiv = styled.div`
    min-height: 135px;
    overflow-wrap: break-word;
`;

const SlideYear = styled.h3`
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 400;
    font-size: 25px;
    color: var(--secondary-color);
    margin-bottom: 15px;
`;

const SlideText = styled.p`
    font-size: 20px;
    color: var(--accent-color);

    @media (max-width: 420px) {
        font-size: 14px;
    }
`;