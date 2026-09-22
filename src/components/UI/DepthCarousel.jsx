import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './DepthCarousel.css';

const DepthCarousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const isScrolling = useRef(false);
    const containerRef = useRef(null);

    const handleNext = useCallback(() => {
        if (activeIndex < items.length - 1) {
            setActiveIndex((prev) => prev + 1);
        }
    }, [activeIndex, items.length]);

    const handlePrev = useCallback(() => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
    }, [activeIndex]);

    // Handle Native wheel & Touch-swipe scrolling to prevent page scroll conflict
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleNativeWheel = (e) => {
            const direction = e.deltaY > 0 ? 'next' : 'prev';
            const canScrollNext = activeIndex < items.length - 1;
            const canScrollPrev = activeIndex > 0;

            // Trap the scroll inside the carousel only if we have pages to cycle
            if ((direction === 'next' && canScrollNext) || (direction === 'prev' && canScrollPrev)) {
                e.preventDefault();
                
                if (isScrolling.current) return;
                isScrolling.current = true;
                
                if (direction === 'next') {
                    handleNext();
                } else {
                    handlePrev();
                }

                setTimeout(() => {
                    isScrolling.current = false;
                }, 600); // 600ms scroll debounce matching spring transitions
            }
        };

        // Mobile touch-swipe handling (supports both horizontal & vertical gestures)
        let touchStartX = null;
        let touchStartY = null;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (touchStartX === null || touchStartY === null) return;
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
            const delta = isHorizontal ? diffX : diffY;

            const direction = delta > 0 ? 'next' : 'prev';
            const canScrollNext = activeIndex < items.length - 1;
            const canScrollPrev = activeIndex > 0;

            if ((direction === 'next' && canScrollNext) || (direction === 'prev' && canScrollPrev)) {
                // If it's a deliberate horizontal swipe on the carousel, prevent horizontal page panning
                if (isHorizontal && Math.abs(diffX) > 10) {
                    if (e.cancelable) e.preventDefault();
                }

                if (isScrolling.current) return;

                // Threshold of 35px swipe to trigger card change
                if (Math.abs(delta) > 35) {
                    isScrolling.current = true;
                    if (direction === 'next') {
                        handleNext();
                    } else {
                        handlePrev();
                    }
                    touchStartX = null;
                    touchStartY = null;
                    setTimeout(() => {
                        isScrolling.current = false;
                    }, 500);
                }
            }
        };

        const handleTouchEnd = () => {
            touchStartX = null;
            touchStartY = null;
        };

        // Bind non-passive wheel and touchmove events
        container.addEventListener('wheel', handleNativeWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('wheel', handleNativeWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeIndex, items.length, handleNext, handlePrev]);

    const handleCardClick = (e, index) => {
        if (index !== activeIndex) {
            e.preventDefault();
            setActiveIndex(index);
        }
        // When activeIndex === index, native navigation proceeds directly via href
    };

    // The Exact Mathematical Formula derived from the Framer HTML, upscaled and fanned out tightly
    const getTransformForOffset = (offset) => {
        const row = offset;
        
        // Alternate columns horizontally to build dynamic 3D stack cascade
        let col = 0;
        const abs = Math.abs(offset);
        if (abs % 3 === 1) col = offset > 0 ? -1 : 1;
        if (abs % 3 === 2) col = offset > 0 ? 1 : -1;
        if (abs % 3 === 0) col = 0;

        const maxDist = Math.max(Math.abs(row), Math.abs(col));
        
        // Compact 3D layout coordinates: width 260px, height 390px
        const x = col * 150; // Spacing of 150px (leaves beautiful overlaps)
        const y = row * 80;  // Balanced vertical spacing of 80px for elegant deck stack
        const z = -maxDist * 120; // Premium 3D depth stack
        
        // Angle rotations in degrees
        const rotateX = -row * 12;
        const rotateY = col * -7.5;
        
        // Slower scale and opacity decay so active + background cards look grand and premium
        const scale = Math.max(0.2, 1 - (maxDist * 0.14)); 
        const opacity = maxDist === 0 ? 1 : Math.max(0.1, 0.9 - (maxDist * 0.15)); 
        const blur = maxDist === 0 ? 0 : maxDist * 1.5;

        return { x, y, z, rotateX, rotateY, scale, opacity, blur, maxDist };
    };

    return (
        <div className="depth-carousel-wrapper">
            <div 
                ref={containerRef}
                className="depth-carousel-container"
            >
                <div className="depth-carousel-3d-scene">
                    <AnimatePresence mode="popLayout">
                        {items.map((item, index) => {
                            const offset = index - activeIndex;
                            const { x, y, z, rotateX, rotateY, scale, opacity, blur, maxDist } = getTransformForOffset(offset);
                            const isActive = offset === 0;
                            const badgePosClass = item.badgePosition || 'bottom-left';
                            
                            // Prevent rendering extremely distant cards to optimize performance
                            if (maxDist > 6) return null;

                            const zIndex = 100 - maxDist * 10;

                            return (
                                <motion.a
                                    key={item.id}
                                    href={item.route}
                                    className="carousel-card-3d"
                                    onClick={(e) => handleCardClick(e, index)}
                                    initial={false}
                                    animate={{
                                        x,
                                        y,
                                        z,
                                        rotateX,
                                        rotateY,
                                        scale,
                                        opacity,
                                        zIndex,
                                        filter: `blur(${blur}px)`
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 220,
                                        damping: 24,
                                        mass: 1.1
                                    }}
                                    drag={isActive ? "y" : false}
                                    dragConstraints={{ top: 0, bottom: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset: dragOffset }) => {
                                        if (dragOffset.y < -50) handleNext();
                                        else if (dragOffset.y > 50) handlePrev();
                                    }}
                                    whileHover={isActive ? { scale: 1.05 } : {}}
                                >
                                    <div className="carousel-card-inner-3d">
                                        {item.mediaType === 'image' && (
                                            <img 
                                                src={item.media} 
                                                alt={item.title} 
                                                className="card-media-3d" 
                                                draggable="false" 
                                                style={{
                                                    ...(item.fit ? { objectFit: item.fit } : {}),
                                                    ...(item.position ? { objectPosition: item.position } : {})
                                                }}
                                            />
                                        )}
                                        {item.mediaType === 'video' && (
                                            <video 
                                                src={item.media} 
                                                autoPlay 
                                                loop 
                                                muted 
                                                playsInline 
                                                className="card-media-3d" 
                                                style={{
                                                    ...(item.fit ? { objectFit: item.fit } : {}),
                                                    ...(item.position ? { objectPosition: item.position } : {})
                                                }}
                                            />
                                        )}
                                        
                                        <div className="card-gradient-overlay" aria-hidden="true"></div>
                                        
                                        {/* Animate text opacity: only fades in AFTER card settles in foreground */}
                                        <motion.div 
                                            className={`card-badge-3d ${badgePosClass}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isActive ? 1 : 0 }}
                                            transition={{ 
                                                duration: isActive ? 0.35 : 0.1, 
                                                delay: isActive ? 0.45 : 0 
                                            }}
                                        >
                                            {item.title}
                                        </motion.div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default DepthCarousel;
