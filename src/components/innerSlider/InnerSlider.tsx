import React, { useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { dates } from '../../constants/dates';
import SlideContent from "./SlideContent";
import NavButton from "./NavButton";

interface innerSlideProps {
  currentSlide: number;
  opacity: 0 | 1;
}

export const InnerSlider = ({ currentSlide, opacity }: innerSlideProps) => {
  const [position, setPosition] = useState<'start' | 'middle' | 'end'>('start');

  return (
    <>
      <StyledSlider
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={80}
        navigation={{
          nextEl: ".innerNext",
          prevEl: ".innerPrev"
        }}
        grabCursor
        onReachBeginning={() => setPosition('start')}
        onReachEnd={() => setPosition('end')}
        onFromEdge={() => setPosition('middle')}
        $opacity={opacity}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 25,

          },
          769: {
            slidesPerView: 3,
            spaceBetween: 80
          }
        }}
      >
        {dates[currentSlide]?.events.map(item => {
          return (
            <StyledSlide>
              <SlideContent year={item.date} text={item.description} />
            </StyledSlide>
          )
        })}
      </StyledSlider>
      <NavButton hidden={position === 'start'} direction='left' />
      <NavButton hidden={position === 'end'} direction='right' />
    </>
  )
}

const StyledSlider = styled(Swiper) <{ $opacity: 0 | 1 }>`
    position: relative;
    opacity: ${props => props.$opacity};
    transition: opacity .3s ease-in-out;

    @media (max-width: 768px) {
      .swiper-slide {
        opacity: 0.5; 
      }
      .swiper-slide-active {
        opacity: 1;
      }
    }
`;

const StyledSlide = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    align-items: center;
`;