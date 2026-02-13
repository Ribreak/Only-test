import React from "react"
import styled, { css } from "styled-components";
import { useSwiper } from "swiper/react";

interface bulletProps {
    index: number;
    sign: string;
    active: boolean;
    degree: number;
    backdegree: number;
    children: React.ReactNode;
}

const Bullet = ({ index, sign, active, degree, backdegree, children }: bulletProps) => {
    const swiper = useSwiper();

    return (
        <BulletCircle $degree={degree} $backdegree={backdegree} >
            <BulletArea $active={active} onClick={() => swiper.slideTo(index)}>
                <BulletContent 
                    $active={active} 
                    className={`outerCustomBullet ${active && 'outerCustomBullet_active'}`}
                >
                    <BulletText>{children}</BulletText>
                    <BulletTitle>{sign}</BulletTitle>
                </BulletContent>
            </BulletArea>
        </BulletCircle>
    )
}
export default Bullet;

const BulletCircle = styled.div<{ $degree: number, $backdegree: number }>`
    position: absolute;
    top: calc(50% - 265px);
    left: calc(50% - 265px);
    width: 530px;
    height: 530px;
    border-radius: 50%;
    ${props => 
        `
            transform: rotate(${props.$degree}deg);
            ${BulletContent} {
                transform: rotate(${props.$backdegree - props.$degree}deg);
            }
        `
    }
    pointer-events: none;
`;

const BulletArea = styled.div<{ $active: boolean }>`
    position: absolute; 
    width: 56px;
    height: 56px;
    border-radius: 50%;
    top: calc(50% - 28px);
    right: -28px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    ${props => 
        `
            cursor: ${props.$active ? 'auto' : 'pointer'};
            ${!props.$active && `
                &:hover ${BulletContent} {
                    ${activeStyles}
                }
                &:hover ${BulletText} {
                    opacity: 1;
                    transition: all .3s ease-in-out 0s;
                }
            `}
        `
    }
`;

const BulletContent = styled.div<{ $active: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease-in-out 0s;
    border-radius: 50%; 
    ${props => props.$active ?
        `
            ${activeStyles}
            ${BulletText} {
                opacity: 1;
            }
            ${BulletTitle} {
                opacity: 1;
                transition: opacity .5s ease-in-out 1s;
            }
        `
        :
        `
            width: 6px;
            height: 6px;
            background-color: var(--accent-color);
        `
    };
`;

const BulletText = styled.p`
    opacity: 0;
    z-index: 10;
`;

const BulletTitle = styled.p`
    position: absolute;
    top: calc(50% - 10px);
    left: 70px;
    font-size: 20px;
    opacity: 0;
`

const activeStyles = css`
    width: 56px;
    height: 56px;
    border: 1px solid #303E58;
    gap: 20px;
    background: var(--background-color);
`;
