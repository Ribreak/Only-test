import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Bullet from "./Bullet";
import { dates } from '../../constants/dates';
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { SliderNav } from "./SliderNav";
import formatNumber from "../../utils/formatNumber";

interface outerSliderProps {
    setSlide: (arg0: number) => void;
}

export const OuterSlider = ({ setSlide }: outerSliderProps) => {
    const slidesNumber = dates.length;
    const angleBetween = 360 / slidesNumber;

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [currentAngle, setCurrentAngle] = useState<number>(-60);
    const [startDate, setStartDate] = useState<number>(Number(dates[0]?.events[0]?.date));
    const [endDate, setEndDate] = useState<number>(Number(dates[0]?.events[dates[0].events.length - 1]?.date));

    const minYearRef = useRef<HTMLElement | null>(null);
    const maxYearRef = useRef<HTMLElement | null>(null);

    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(useGSAP);

    function defineAngle(currSlide: number, prevSlide: number) {
        setCurrentAngle(() => currentAngle - (currSlide - prevSlide) * angleBetween);
    }

    useGSAP(() => {
        const newStartDate = Number(dates[currentSlide]?.events[0]?.date);
        const newEndDate = Number(dates[currentSlide]?.events[dates[currentSlide].events.length - 1]?.date);
        const startRange = newStartDate - startDate;
        const endRange = newEndDate - endDate;

        gsap.to(minYearRef.current, {
            duration: 1,
            textContent: `+=${startRange}`,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () => setStartDate(newStartDate)
        });
        gsap.to(maxYearRef.current, {
            duration: 1,
            textContent: `+=${endRange}`,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () => setEndDate(newEndDate)
        });
    }, [currentSlide])

    return (
        <>
            <StyledSlider
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={{
                    nextEl: ".mobileNext",
                    prevEl: ".mobilePrev",
                }}
                pagination={{
                    el: '.mobilePagination',
                    clickable: true,
                }}
                allowTouchMove={false}
                onSlideChange={swiper => {
                    setCurrentSlide(swiper.activeIndex);
                    setSlide(swiper.activeIndex);
                    defineAngle(swiper.activeIndex, swiper.previousIndex);
                }}
                onResize={swiper => {
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                    swiper.pagination.destroy();
                    swiper.pagination.init();
                    swiper.pagination.render()
                    swiper.pagination.update();
                }}
                breakpoints={{
                    768: {
                        pagination: {
                            el: 'bulletContainer',
                            bulletClass: 'outerCustomBullet',
                            bulletActiveClass: 'outerCustomBullet_active',
                        },
                        navigation: {
                            nextEl: ".outerNext",
                            prevEl: ".outerPrev",
                        }
                    }
                }}
            >
                {dates.map(item => {
                    return (
                        <StyledSlide key={item.title} />
                    )
                })}
                <Styledh2>
                    <StyledSpan ref={minYearRef} $color="blue">
                        {startDate}
                    </StyledSpan>
                    <StyledSpan ref={maxYearRef} $color="rose">
                        {endDate}
                    </StyledSpan>
                </Styledh2>
                <Circle $totalDegree={currentAngle} className='bulletContainer'>
                    {dates.map((item, index) => {
                        return (
                            <Bullet 
                                key={item.title} 
                                index={index} 
                                degree={index * angleBetween} 
                                backdegree={-currentAngle} 
                                sign={item.title} 
                                active={index === currentSlide ? true : false}
                            >
                                {index + 1}
                            </Bullet>
                        )
                    })}
                </Circle>
            </StyledSlider>
            <SliderNav 
                currSlide={formatNumber(currentSlide + 1)} 
                maxSlide={formatNumber(slidesNumber)} 
                isMobile={false} 
            />
        </>
    )
}

const StyledSlider = styled(Swiper)`
    height: 570px;
    display: flex;

    @media (max-width: 768px) {
        height: 150px;
    }
`;

const Circle = styled.div<{ $totalDegree: number }>`
    position: absolute;
    top: calc(50% - 265px);
    left: calc(50% - 265px);
    width: 530px;
    height: 530px;
    border-radius: 50%;
    border: 1px solid var(--accent-color);
    transform: rotate(${props => props.$totalDegree}deg);
    transition: all 1s ease-in-out .1s;
    z-index: 10;

    @media (max-width: 768px) {
        display: none;
    }
`;

const StyledSlide = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Styledh2 = styled.h2`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 200px;
    user-select: none;

    @media (max-width: 1200px) {
        font-size: 140px;
    }

    @media (max-width: 768px) {
        font-size: 56px;
    }

    @media (max-width: 768px) {
        font-size: 40px;
    }
`;

const StyledSpan = styled.span<{ $color: 'blue' | 'rose' }>`
    color: ${props => props.$color === 'blue' ? '#3877EE' : '#EF5DA8'};
`;