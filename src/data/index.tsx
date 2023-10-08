import React from 'react';

export const navbarItems = [
    {
        id: 1,
        title: 'Home',
        to: '/#home'
    },
    {
        id: 2,
        title: 'Mint',
        to: '/#mint'
    },
    {
        id: 3,
        title: 'About',
        to: '/#about'
    },
];

export const scrollWithOffset = (el: any, offset: any) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
        top: elementPosition,
        left: 0,
        behavior: 'smooth'
    });
};