import React, { useState, useEffect } from 'react';
import './ScrollAffordance.css';

const ScrollAffordance = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Strictly reveal at the 3-second mark after hero text animations settle
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`scroll-affordance ${isVisible ? 'is-visible' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={isVisible ? 0 : -1}
            aria-hidden={!isVisible}
            aria-label="Scroll to explore"
        >
            <span className="scroll-text">Scroll to explore</span>
            <svg className="scroll-chevron" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                    d="M7 10l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default ScrollAffordance;
