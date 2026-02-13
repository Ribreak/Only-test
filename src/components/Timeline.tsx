import React, { useState } from "react";
import styled from "styled-components";
import { OuterSlider, SliderNav } from './outerSlider';
import { InnerSlider } from './innerSlider';
import { dates } from "../constants/dates";
import formatNumber from "../utils/formatNumber";

const Timeline = () => {
    const [currentOuterSlide, setCurrentOuterSlide] = useState<number>(0);
    const [opacity, setOpacity] = useState<0 | 1>(1);

    function changeSlide(slide: number) {
        setOpacity(0);
        const timeout = setTimeout(() => {
            setCurrentOuterSlide(slide);
            setOpacity(1);
        }, 500)
    }

    return (
        <SliderContainer>
            <SliderWrapper>
                <OuterSlider setSlide={changeSlide} />
            </SliderWrapper>
            <SliderWrapper>
                <InnerSlider opacity={opacity} currentSlide={currentOuterSlide} />
            </SliderWrapper>
            <SliderNav 
                currSlide={formatNumber(currentOuterSlide + 1)} 
                maxSlide={formatNumber(dates.length)} 
                isMobile={true} 
            />
        </SliderContainer>
    )
}
export default Timeline;

const SliderContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 56px;
    overflow: hidden;
`;

const SliderWrapper = styled.div`
    position: relative;
    padding: 0 60px;

    @media (max-width: 1200px) {
        padding: 0 45px;
    }
`;

