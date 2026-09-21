import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DeepDiveNfsMw2005 = () => {
    const navigate = useNavigate();
    const [introFinished, setIntroFinished] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // Default true for safe autoplay initialization
    
    // Interactive states
    const [activeFaction, setActiveFaction] = useState('racer'); // 'racer' or 'cop'
    const [storySlide, setStorySlide] = useState(0); // 0, 1, 2
    const [paybackFlipped, setPaybackFlipped] = useState(false);
    const [impoundFlipped, setImpoundFlipped] = useState(false);

    const videoRef = useRef(null);
    const playTimeoutRef = useRef(null);

    // Pause battlefield background music on mount, resume on unmount
    useEffect(() => {
        const bgMusicEl = document.getElementById('bg-music');
        let wasPlaying = false;
        
        if (bgMusicEl) {
            wasPlaying = !bgMusicEl.paused;
            bgMusicEl.pause();
        }

        return () => {
            if (bgMusicEl && wasPlaying) {
                bgMusicEl.play().catch(err => console.log('Music resume blocked:', err));
            }
            if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
            }
        };
    }, []);

    // Scroll lock and video playback state management
    useEffect(() => {
        if (!introFinished) {
            document.body.style.overflow = 'hidden';
            setIsMuted(false); // Play unmuted during the cinematic intro
            
            if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(err => {
                    console.log('Autoplay unmuted blocked, falling back to muted:', err);
                    setIsMuted(true);
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
                    }
                });
            }
        } else {
            document.body.style.overflow = '';
            setIsMuted(true); // Always mute video post-intro
            
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.muted = true;
            }
            
            window.scrollTo(0, 0); // Reset scroll position to top
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [introFinished]);

    const handleVideoPlay = () => {
        // Start 1.05s timer to fade out title card overlay after playback starts
        if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = setTimeout(() => {
            setShowOverlay(false);
        }, 1050);
    };

    const handleSkipIntro = () => {
        if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
        setIntroFinished(true);
        setShowOverlay(false);
        setIsMuted(true);
        if (videoRef.current) {
            videoRef.current.muted = true;
            // Jump to the end frame of the video
            if (videoRef.current.duration) {
                videoRef.current.currentTime = videoRef.current.duration;
            }
            videoRef.current.pause();
        }
    };

    const handleVideoEnded = () => {
        if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
        setIntroFinished(true);
        setShowOverlay(false);
        setIsMuted(true);
    };

    const storySlides = [
        {
            title: "📖 The Storyline & Universe",
            content: "Cars are unlocked based on tiers and infamy within the rankings of The Blacklist, as the corrupt racers control the city's car stock. Phoenix climbs the ranks of street racers while Lazarus gathers evidence from within the police department. Their paths cross in a solitary confrontation before joining forces to expose the corrupt Police Captain, Cain."
        },
        {
            title: "🌐 Online Sandbox Experience",
            content: "Seamlessly transition from offline story mode to shared region-based servers. Engage in classic Online Races, high-stakes Cops vs Racers chases, co-op heist modes, and free roam with friends."
        },
        {
            title: "📊 Shared Leaderboard Tracking",
            content: "Progress is tracked globally across both factions. Cops earn prestige through the 'Exemplary Service Record', while Racers build notoriety through the 'Infamy System / Rap Sheet'."
        }
    ];

    const nextSlide = () => {
        setStorySlide((prev) => (prev + 1) % storySlides.length);
    };

    const prevSlide = () => {
        setStorySlide((prev) => (prev - 1 + storySlides.length) % storySlides.length);
    };

    const cardBackground = 'linear-gradient(135deg, rgba(85, 37, 131, 0.65) 0%, rgba(20, 10, 30, 0.85) 50%, rgba(10, 10, 10, 0.95) 100%)';
    const glassBorder = '1px solid rgba(255, 255, 255, 0.1)';
    const unifiedCardStyle = {
        background: cardBackground,
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '750px',
        margin: '0 auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        minWidth: 0
    };
    const sectionHeaderStyle = {
        color: '#ff8f00',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        textAlign: 'center',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100vh', background: '#050505', color: '#fff', position: 'relative' }}
        >
            {/* Fixed Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="back-btn-fixed"
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '2rem',
                    zIndex: 500,
                    background: 'rgba(10, 10, 10, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 143, 0, 0.5)';
                    e.currentTarget.style.boxShadow = '0 4px 25px rgba(255, 143, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
                }}
            >
                &larr; Back to Portfolio
            </button>

            {/* Cinematic Intro Title Card */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div 
                        className="cinematic-intro-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(5, 5, 5, 0.85)',
                            backdropFilter: 'blur(20px)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.h2 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                marginBottom: '2rem',
                                color: '#fff',
                                textShadow: '0 0 20px rgba(255, 143, 0, 0.6)'
                            }}
                        >
                            NFS Most Wanted (2005)
                        </motion.h2>
                        <p style={{ color: '#aaa', marginBottom: '3rem', fontSize: '1.1rem', letterSpacing: '2px' }}>
                            Experiencing Cinematic Overview...
                        </p>
                        
                        <button 
                            onClick={handleSkipIntro}
                            style={{
                                background: 'rgba(255, 143, 0, 0.2)',
                                border: '1px solid rgba(255, 143, 0, 0.6)',
                                color: '#fff',
                                padding: '12px 30px',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 143, 0, 0.4)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 143, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 143, 0, 0.2)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            Skip Intro
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fixed Background Video */}
            <video 
                ref={videoRef}
                src="/assets/video/Most Wanted Style Background.mp4"
                muted={isMuted}
                playsInline
                preload="auto"
                onPlay={handleVideoPlay}
                onEnded={handleVideoEnded}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Ambient Dark Overlay */}
            <AnimatePresence>
                {introFinished && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'radial-gradient(circle, rgba(5, 5, 5, 0.72) 0%, rgba(5, 5, 5, 0.92) 100%)',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Scrolling snap-scrollable content cards */}
            {introFinished && (
                <div style={{ position: 'relative', zIndex: 10 }}>
                    
                    {/* Section 1: Executive Summary */}
                    <section className="section">
                        <div className="container">
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.8 }}
                                    style={{ ...unifiedCardStyle, border: '1px solid rgba(255, 143, 0, 0.3)' }}
                                >
                                    <h2 style={sectionHeaderStyle}>
                                        Executive Summary
                                    </h2>
                                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ddd', marginBottom: '1.2rem' }}>
                                        Need for Speed: Most Wanted (2005) stands as the ultimate golden benchmark of arcade racing games. By combining tuner customization culture with intense police pursuits, EA crafted an engaging player progression loop that laid the foundations of a franchise.
                                    </p>
                                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ddd', marginBottom: '1.2rem' }}>
                                        Modern PMs might want to sanitize these experiences to protect D7 retention for the 2026 and markets beyond.
                                    </p>
                                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ddd', margin: 0 }}>
                                        That’s a product mistake.
                                    </p>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '15px', color: '#888', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                        <span>🔑 PROGRESSION LOOP</span>
                                        <span>⚡ RISK MANAGEMENT</span>
                                        <span>🔥 HIGH RETENTION</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: The Legacy Framework */}
                    <section className="section">
                        <div className="container">
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.8 }}
                                    style={{ ...unifiedCardStyle, border: '1px solid rgba(255, 23, 68, 0.35)' }}
                                >
                                    <h2 style={sectionHeaderStyle}>
                                        The Legacy Framework
                                    </h2>
                                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ddd', marginBottom: '1.2rem' }}>
                                        The original <em>Most Wanted</em> featured an antagonistic, linear loop. The police force functioned as an interruptive layer designed to disrupt the player's racing flow state.
                                    </p>
                                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ddd', margin: 0 }}>
                                        <strong>Friction & Loss Aversion:</strong> Progression required completing specific milestones and earning Bounty via pursuits. However, a "Busted" event triggered a severe session wipe—losing all accrued Bounty, Milestones, and risking cash-gated impound strikes.
                                    </p>
                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '15px', color: '#ef5350', fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                                        <span>⚠️ HIGH FRICTION</span>
                                        <span>💥 PROGRESS WIPE</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Setting up The Modernized Framework - Unified Switcher Card */}
                    <section className="section">
                        <div className="container">
                            
                            {/* Unified Card Container */}
                            <div style={{
                                background: cardBackground,
                                border: activeFaction === 'racer' ? '1px solid rgba(255, 143, 0, 0.35)' : '1px solid rgba(79, 195, 247, 0.35)',
                                backdropFilter: 'blur(15px)',
                                WebkitBackdropFilter: 'blur(15px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                maxWidth: '750px',
                                margin: '0 auto',
                                boxShadow: activeFaction === 'racer' ? '0 15px 40px rgba(255, 143, 0, 0.08)' : '0 15px 40px rgba(79, 195, 247, 0.08)',
                                transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                            }}>
                                {/* Header Card content */}
                                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                    <h2 style={sectionHeaderStyle}>
                                        Setting up The Modernized Framework
                                    </h2>
                                    <p style={{ 
                                        color: '#fff', 
                                        fontSize: '1.05rem', 
                                        lineHeight: '1.7', 
                                        margin: '0 auto 2rem', 
                                        maxWidth: '650px' 
                                    }}>
                                        To resolve the persona conflict where cops disrupt racers, the new product design synthesizes the factions into a sequential narrative and gameplay structure through two distinct protagonists: Phoenix (Racer) and Lazarus (Cop).
                                    </p>
                                    
                                    {/* Faction Tab Selector */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                        <button
                                            onClick={() => setActiveFaction('racer')}
                                            style={{
                                                background: activeFaction === 'racer' ? 'rgba(255, 143, 0, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                                                border: activeFaction === 'racer' ? '1px solid #ff8f00' : '1px solid rgba(255, 255, 255, 0.1)',
                                                color: activeFaction === 'racer' ? '#fff' : '#aaa',
                                                padding: '10px 24px',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                fontWeight: '700',
                                                fontSize: '0.95rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                transition: 'all 0.25s ease'
                                            }}
                                        >
                                            🏎️ Racer Faction (Phoenix)
                                        </button>
                                        <button
                                            onClick={() => setActiveFaction('cop')}
                                            style={{
                                                background: activeFaction === 'cop' ? 'rgba(79, 195, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                                                border: activeFaction === 'cop' ? '1px solid #4fc3f7' : '1px solid rgba(255, 255, 255, 0.1)',
                                                color: activeFaction === 'cop' ? '#fff' : '#aaa',
                                                padding: '10px 24px',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                fontWeight: '700',
                                                fontSize: '0.95rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                transition: 'all 0.25s ease'
                                            }}
                                        >
                                            🚔 Cop Faction (Lazarus)
                                        </button>
                                    </div>
                                </div>

                                {/* Faction Content Switcher */}
                                <div style={{ width: '100%', position: 'relative' }}>
                                    <AnimatePresence mode="wait">
                                        {activeFaction === 'racer' ? (
                                            <motion.div
                                                key="racer"
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -12 }}
                                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                                style={{
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    border: '1px solid rgba(255, 143, 0, 0.25)',
                                                    borderRadius: '16px',
                                                    padding: '2rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '1.5rem'
                                                }}
                                            >
                                                <div>
                                                    <h3 style={{ color: '#ff8f00', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 1rem' }}>
                                                        Racer Story &amp; Progression (Phoenix)
                                                    </h3>
                                                    <p style={{ lineHeight: '1.7', color: '#ccc', fontSize: '1rem', marginBottom: '1rem' }}>
                                                        <strong>Phoenix</strong> (late teens/early 20s) is the disciplined, cold, and calculated son to the Captain of an elite street-racing law enforcement unit. To prove his father was framed, he must enter the illegal street racing scene.
                                                    </p>
                                                    <p style={{ lineHeight: '1.7', color: '#ccc', fontSize: '1rem', margin: 0 }}>
                                                        He races to find evidence from Blacklist racers. Unique personality-driven pre/post-race interactions foster unexpected friendships, which unlock custom tuning guides as rivals grow more challenging.
                                                    </p>
                                                </div>

                                                <div style={{
                                                    background: 'rgba(255, 143, 0, 0.05)',
                                                    border: '1px solid rgba(255, 143, 0, 0.2)',
                                                    borderRadius: '12px',
                                                    padding: '1.25rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px'
                                                }}>
                                                    <span style={{ color: '#ff8f00', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                                        🎮 ACT 1 GAMEPLAY &amp; METRICS
                                                    </span>
                                                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbb', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        <li><strong>Objective:</strong> Defeat Blacklist rivals in Sprints, Circuits, Speed Traps, and Drag Races.</li>
                                                        <li><strong>Progression Metric:</strong> Infamy &amp; Cost to State.</li>
                                                        <li><strong>Systemic Reward:</strong> Unlocks vehicle tiers and Blacklist boss challenges.</li>
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="cop"
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -12 }}
                                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                                style={{
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    border: '1px solid rgba(79, 195, 247, 0.25)',
                                                    borderRadius: '16px',
                                                    padding: '2rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '1.5rem'
                                                }}
                                            >
                                                <div>
                                                    <h3 style={{ color: '#4fc3f7', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 1rem' }}>
                                                        Cop Story &amp; Progression (Lazarus)
                                                    </h3>
                                                    <p style={{ lineHeight: '1.7', color: '#ccc', fontSize: '1rem', marginBottom: '1rem' }}>
                                                        <strong>Lazarus</strong> (early 30s) is a hot-blooded, jaded rookie recently transferred to the unit after exposing a coverup. He wants to do the right thing and rises through the ranks after noticing Phoenix fighting Cain, the corrupt captain who framed Phoenix's father.
                                                    </p>
                                                    <p style={{ lineHeight: '1.7', color: '#ccc', fontSize: '1rem', margin: 0 }}>
                                                        Lazarus investigates from within the PD. Once Phoenix climbs to the top 10 of the Blacklist, their paths collide in a solitary chase, leading to an alliance.
                                                    </p>
                                                </div>

                                                <div style={{
                                                    background: 'rgba(79, 195, 247, 0.05)',
                                                    border: '1px solid rgba(79, 195, 247, 0.2)',
                                                    borderRadius: '12px',
                                                    padding: '1.25rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px'
                                                }}>
                                                    <span style={{ color: '#4fc3f7', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.85rem' }}>
                                                        🎮 ACT 2 GAMEPLAY &amp; METRICS
                                                    </span>
                                                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bbb', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        <li><strong>Objective:</strong> Seamlessly switch perspective post-race to intercept and arrest the rival you just defeated.</li>
                                                        <li><strong>Progression Metric:</strong> Departmental Respect.</li>
                                                        <li><strong>Systemic Reward:</strong> Unlocks tactical deployment calls (Spike strips, Rhino units, Helicopters).</li>
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3.5: Storyline Universe & Online Carousel (Unified Card) */}
                    <section className="section">
                        <div className="container">
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative' }}>
                                <div style={{ ...unifiedCardStyle, border: '1px solid rgba(255, 143, 0, 0.3)' }}>
                                    {/* Section Heading inside the card */}
                                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                        <h2 style={sectionHeaderStyle}>
                                            Universe & Online Integration
                                        </h2>
                                    </div>

                                    {/* Carousel Content (Equal Height Grid Container) */}
                                    <div className="carousel-equal-height" style={{ display: 'grid', gridTemplateColumns: '1fr', alignItems: 'center', width: '100%', minHeight: '160px' }}>
                                        {/* Invisible Ghost Sizer: Stacks all slides in the same grid cell so the card height dynamically and naturally locks to the tallest slide across all screen widths */}
                                        <div 
                                            className="carousel-ghost-sizer"
                                            style={{ display: 'grid', gridTemplateColumns: '1fr', gridArea: '1 / 1', visibility: 'hidden', pointerEvents: 'none' }} 
                                            aria-hidden="true"
                                        >
                                            {storySlides.map((s, idx) => (
                                                <div key={idx} style={{ gridArea: '1 / 1' }}>
                                                    <h3 style={{ color: '#ff8f00', margin: '0 0 1rem', fontSize: '1.25rem', fontFamily: 'monospace' }}>
                                                        {s.title}
                                                    </h3>
                                                    <p style={{ lineHeight: '1.7', fontSize: '1.05rem', color: '#ddd', margin: 0 }}>
                                                        {s.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Active Animated Slide */}
                                        <div className="carousel-active-container" style={{ gridArea: '1 / 1', width: '100%' }}>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={storySlide}
                                                    className="carousel-active-slide"
                                                    initial={{ opacity: 0, x: 30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <h3 style={{ color: '#ff8f00', margin: '0 0 1rem', fontSize: '1.25rem', fontFamily: 'monospace' }}>
                                                        {storySlides[storySlide].title}
                                                    </h3>
                                                    <p style={{ lineHeight: '1.7', fontSize: '1.05rem', color: '#ddd', margin: 0 }}>
                                                        {storySlides[storySlide].content}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Slider Controls */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                                        <button
                                            onClick={prevSlide}
                                            className="carousel-prev-btn"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                        >
                                            &larr; Prev
                                        </button>

                                        {/* Pagination Dots */}
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {storySlides.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`carousel-dot carousel-dot-${idx}`}
                                                    onClick={() => setStorySlide(idx)}
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: idx === storySlide ? '#ff8f00' : 'rgba(255, 255, 255, 0.2)',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.25s ease'
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={nextSlide}
                                            className="carousel-next-btn"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                                        >
                                            Next &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3.6: Retention Mechanics - Flipped Cards */}
                    <section className="section">
                        <div className="container">
                            <div style={{ ...unifiedCardStyle, border: '1px solid rgba(79, 195, 247, 0.3)' }}>
                                {/* Section Header inside the card */}
                                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                    <h2 style={sectionHeaderStyle}>
                                        Retention & Friction Buffers
                                    </h2>
                                    <p style={{ 
                                        color: '#fff', 
                                        fontSize: '1.05rem', 
                                        lineHeight: '1.7', 
                                        margin: '0 auto', 
                                        maxWidth: '650px' 
                                    }}>
                                        Decoupling progression stakes to protect Day 7 retention. Click either card and view the detailed mechanics.
                                    </p>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '25px', 
                                    justifyContent: 'center', 
                                    flexWrap: 'wrap',
                                    width: '100%'
                                }}>
                                    
                                    {/* Payback Buffer Card */}
                                    <div style={{ perspective: 1200, width: '100%', maxWidth: '320px', height: '290px' }}>
                                        <motion.div
                                            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
                                            animate={{ rotateY: paybackFlipped ? 180 : 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {/* Front */}
                                            <div 
                                                onClick={() => setPaybackFlipped(true)}
                                                style={{
                                                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                                                    visibility: paybackFlipped ? 'hidden' : 'visible',
                                                    pointerEvents: paybackFlipped ? 'none' : 'auto',
                                                    background: 'linear-gradient(135deg, rgba(30, 14, 45, 0.98) 0%, rgba(12, 8, 20, 0.99) 100%)',
                                                    border: '1px solid rgba(79, 195, 247, 0.3)',
                                                    borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column',
                                                    justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <div>
                                                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🔄</span>
                                                    <h3 style={{ color: '#ff8f00', margin: '0 0 0.5rem', fontSize: '1.25rem' }}>"Payback" Friction Buffer</h3>
                                                    <p style={{ fontSize: '0.95rem', color: '#bbb', margin: 0, lineHeight: '1.5' }}>
                                                        A soft-landing mechanism to protect players from severe loss aversion while preserving stakes.
                                                    </p>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: '#4fc3f7', alignSelf: 'flex-end', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.5px' }}>CLICK TO FLIP ➔</span>
                                            </div>

                                            {/* Back */}
                                            <div 
                                                onClick={() => setPaybackFlipped(false)}
                                                style={{
                                                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                                                    visibility: paybackFlipped ? 'visible' : 'hidden',
                                                    pointerEvents: paybackFlipped ? 'auto' : 'none',
                                                    transform: 'rotateY(180deg)',
                                                    background: 'linear-gradient(135deg, rgba(30, 14, 45, 0.98) 0%, rgba(12, 8, 20, 0.99) 100%)',
                                                    border: '1px solid rgba(79, 195, 247, 0.4)',
                                                    borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column',
                                                    justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <p style={{ fontSize: '0.95rem', color: '#ddd', margin: 0, lineHeight: '1.6' }}>
                                                    A failed pursuit tags the responsible AI cop unit. In the next session, players launch a <strong>"Payback" run</strong> to hunt down that unit, recovering lost session stats at the cost of double the standard Heat level (capped by tier maximum).
                                                </p>
                                                <span style={{ fontSize: '0.8rem', color: '#4fc3f7', alignSelf: 'flex-start', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.5px' }}>⬅ CLICK TO RETURN</span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Impound Strike Tokens Card */}
                                    <div style={{ perspective: 1200, width: '100%', maxWidth: '320px', height: '290px' }}>
                                        <motion.div
                                            style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
                                            animate={{ rotateY: impoundFlipped ? 180 : 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {/* Front */}
                                            <div 
                                                onClick={() => setImpoundFlipped(true)}
                                                style={{
                                                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                                                    visibility: impoundFlipped ? 'hidden' : 'visible',
                                                    pointerEvents: impoundFlipped ? 'none' : 'auto',
                                                    background: 'linear-gradient(135deg, rgba(30, 14, 45, 0.98) 0%, rgba(12, 8, 20, 0.99) 100%)',
                                                    border: '1px solid rgba(79, 195, 247, 0.3)',
                                                    borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column',
                                                    justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <div>
                                                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🎟️</span>
                                                    <h3 style={{ color: '#ff8f00', margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Impound Strike Tokens</h3>
                                                    <p style={{ fontSize: '0.95rem', color: '#bbb', margin: 0, lineHeight: '1.5' }}>
                                                        Expanding safety margins to protect vehicles and shield users from premature progress wipes.
                                                    </p>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: '#4fc3f7', alignSelf: 'flex-end', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.5px' }}>CLICK TO FLIP ➔</span>
                                            </div>

                                            {/* Back */}
                                            <div 
                                                onClick={() => setImpoundFlipped(false)}
                                                style={{
                                                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                                                    visibility: impoundFlipped ? 'visible' : 'hidden',
                                                    pointerEvents: impoundFlipped ? 'auto' : 'none',
                                                    transform: 'rotateY(180deg)',
                                                    background: 'linear-gradient(135deg, rgba(30, 14, 45, 0.98) 0%, rgba(12, 8, 20, 0.99) 100%)',
                                                    border: '1px solid rgba(79, 195, 247, 0.4)',
                                                    borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column',
                                                    justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <p style={{ fontSize: '0.95rem', color: '#ddd', margin: 0, lineHeight: '1.6' }}>
                                                    Players earn temporary <strong>strike tokens</strong> by defeating Blacklist members or via mystery rewards. These allow them to expand their safety margin up to <strong>6 total strikes</strong> before a vehicle is fully impounded.
                                                </p>
                                                <span style={{ fontSize: '0.8rem', color: '#4fc3f7', alignSelf: 'flex-start', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.5px' }}>⬅ CLICK TO RETURN</span>
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Current Market Dynamics */}
                    <section className="section">
                        <div className="container">
                            <div style={{ ...unifiedCardStyle, border: '1px solid rgba(255, 143, 0, 0.3)' }}>
                                {/* Section Header inside the card */}
                                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                    <h2 style={sectionHeaderStyle}>
                                        Current Market Dynamics
                                    </h2>
                                </div>

                                <div style={{ 
                                    display: 'flex', 
                                    gap: '20px', 
                                    justifyContent: 'center', 
                                    flexWrap: 'wrap',
                                    width: '100%'
                                }}>
                                    {/* Dynamic 1: Accessibility */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.25)',
                                            border: '1px solid rgba(255, 143, 0, 0.15)',
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            flex: '1 1 280px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <h3 style={{ color: '#ff8f00', fontSize: '1.25rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Onboarding & Tutorial
                                        </h3>
                                        <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#ccc', margin: 0 }}>
                                            Modern games often assume players are pre-versed in racing mechanics. To resolve this, our model introduces an interactive basic controls tutorial. Difficulty adjusts automatically in real-time by detecting user input patterns and steering mistakes.
                                        </p>
                                    </motion.div>

                                    {/* Dynamic 2: Polarization */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.25)',
                                            border: '1px solid rgba(255, 143, 0, 0.15)',
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            flex: '1 1 280px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <h3 style={{ color: '#ff8f00', fontSize: '1.25rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Genre Polarization
                                        </h3>
                                        <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#ccc', margin: 0 }}>
                                            The racing genre faces severe division: track simulators vs infinite sandboxes. Need for Speed personas split between <em>Street Racers</em> (precision) and <em>Urban Guerillas</em> (destruction). We challenge this by designing a self-contained premium title that bridges both worlds.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Live-Ops Strategy */}
                    <section className="section" style={{ width: '100%', overflowX: 'hidden' }}>
                        <div className="container" style={{ width: '100%', maxWidth: '1200px', boxSizing: 'border-box' }}>
                            
                            {/* Unified Exploit & Live-Ops Card */}
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%', boxSizing: 'border-box', marginBottom: '2.5rem' }}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    style={{
                                        ...unifiedCardStyle,
                                        width: '100%',
                                        maxWidth: 'min(950px, 100%)',
                                        minWidth: 0,
                                        boxSizing: 'border-box',
                                        margin: '0 auto',
                                        border: '1px solid rgba(79, 195, 247, 0.3)'
                                    }}
                                >
                                    <div style={{ textAlign: 'center', marginBottom: '2.5rem', width: '100%', boxSizing: 'border-box' }}>
                                        <h2 style={{ ...sectionHeaderStyle, fontSize: 'clamp(1.35rem, 4vw, 2rem)', wordBreak: 'break-word' }}>
                                            Live-Ops & Exploit Mitigation
                                        </h2>
                                        <p style={{ 
                                            color: '#fff', 
                                            fontSize: '1.05rem', 
                                            lineHeight: '1.7', 
                                            margin: '0 auto', 
                                            maxWidth: '650px',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}>
                                            Removing systemic vulnerabilities and tracking telemetry to optimize player retention and balance economy loops.
                                        </p>
                                    </div>

                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.25)',
                                        border: '1px solid rgba(79, 195, 247, 0.15)',
                                        borderRadius: '16px',
                                        padding: 'clamp(1.25rem, 4vw, 2rem)',
                                        marginBottom: '3rem',
                                        width: '100%',
                                        maxWidth: '100%',
                                        boxSizing: 'border-box',
                                        minWidth: 0
                                    }}>
                                        <h3 style={{ color: '#ff8f00', fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px', wordBreak: 'break-word' }}>
                                            🚫 Eliminating Systemic Vulnerabilities
                                        </h3>
                                        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#ccc', margin: 0 }}>
                                            The original game allowed players to abuse a systemic vulnerability: hitting "Restart" mid-race or mid-pursuit to escape tight corners or impending busts. This modernized installation removes fixed tutorial boundaries and introduces dynamic rolling starts. Pursuits can trigger seamlessly in the free-roam sandbox based on proximity to rivals, eliminating predictable safety zones.
                                        </p>
                                    </div>

                                    {/* Analytics Dashboard Title */}
                                    <h3 style={{ textAlign: 'center', color: '#fff', fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 1rem', wordBreak: 'break-word' }}>
                                        📊 Closed-Beta Analytics Dashboard
                                    </h3>
                                    <p style={{ textAlign: 'center', color: '#aaa', margin: '0 auto 2rem', maxWidth: '600px', fontSize: '0.95rem', width: '100%', boxSizing: 'border-box' }}>
                                        Core health indicators and telemetry parameters tracked during playtesting to balance loops.
                                    </p>

                                    {/* Dashboard Metrics Table */}
                                    <div style={{ 
                                        overflowX: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '16px', 
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(0, 0, 0, 0.25)',
                                        width: '100%',
                                        maxWidth: '100%',
                                        boxSizing: 'border-box',
                                        minWidth: 0
                                    }}>
                                        <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(79, 195, 247, 0.08)' }}>
                                                    <th style={{ padding: '15px', color: '#ff8f00', fontFamily: 'monospace', fontWeight: 'bold' }}>CATEGORY</th>
                                                    <th style={{ padding: '15px', color: '#ff8f00', fontFamily: 'monospace', fontWeight: 'bold' }}>METRIC NAME</th>
                                                    <th style={{ padding: '15px', color: '#ff8f00', fontFamily: 'monospace', fontWeight: 'bold' }}>DEFINITION / FORMULA</th>
                                                    <th style={{ padding: '15px', color: '#ff8f00', fontFamily: 'monospace', fontWeight: 'bold' }}>PRODUCT HEALTH INDICATOR</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Row 1 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff8f00', color: '#ff8f00', fontWeight: 'bold', fontFamily: 'monospace' }}>PRIMARY</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Faction Playtime Ratio</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>Total Time Spent as Cop / Total Time Spent as Racer</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Targets a stable 1:1 ratio. If skewed heavily toward one side, it indicates a feature balance failure.</td>
                                                </tr>
                                                {/* Row 2 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff8f00', color: '#ff8f00', fontWeight: 'bold', fontFamily: 'monospace' }}>PRIMARY</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Core Loop Velocity</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>Avg. Time (Hours) to progress from Blacklist N to N-1</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Measures pacing. Spikes in this metric highlight progression roadblocks or economy bottlenecks.</td>
                                                </tr>
                                                {/* Row 3 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff8f00', color: '#ff8f00', fontWeight: 'bold', fontFamily: 'monospace' }}>PRIMARY</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Payback Conversion Rate</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>Payback Runs Initiated / Total Busted Events</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Validates the adoption of your loss-aversion buffer. Low conversion means players find the mechanic unrewarding.</td>
                                                </tr>
                                                {/* Row 4 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff8f00', color: '#ff8f00', fontWeight: 'bold', fontFamily: 'monospace' }}>PRIMARY</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Economy Velocity</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>Total Currency Spent in Shop / Total Currency Earned</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Ensures currency isn't pooling unspent, validating that players are forced to upgrade to stay competitive.</td>
                                                </tr>
                                                {/* Row 5 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff1744', color: '#ff1744', fontWeight: 'bold', fontFamily: 'monospace' }}>COUNTER</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Faction-Specific Churn</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>Session Drops segmented by Faction (Cop vs. Racer)</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Identifies which side of the two-act loop is triggering friction-based churn.</td>
                                                </tr>
                                                {/* Row 6 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff1744', color: '#ff1744', fontWeight: 'bold', fontFamily: 'monospace' }}>COUNTER</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>The Rage-Quit Vector</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>% of App Closures within 60s of a Busted/Failed Screen</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>The ultimate metric for loss aversion. If this spikes, the soft landing features are failing.</td>
                                                </tr>
                                                {/* Row 7 */}
                                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                    <td style={{ padding: '15px', borderLeft: '4px solid #ff1744', color: '#ff1744', fontWeight: 'bold', fontFamily: 'monospace' }}>COUNTER</td>
                                                    <td style={{ padding: '15px', color: '#fff', fontWeight: '600' }}>Upgrade Bypass Rate</td>
                                                    <td style={{ padding: '15px', color: '#ccc', fontSize: '0.9rem' }}>% of Players clearing a tier with zero Shop purchases</td>
                                                    <td style={{ padding: '15px', color: '#aaa', fontSize: '0.9rem' }}>Validates the Pink Slip balancing. If this is high, the gifted cars are still too powerful for the next tier.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: The PM Verdict */}
                    <section className="section">
                        <div className="container">
                            <div style={{ ...unifiedCardStyle, maxWidth: '850px', border: '1px solid rgba(255, 143, 0, 0.3)' }}>
                                {/* Section Header inside the card */}
                                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                    <h2 style={sectionHeaderStyle}>
                                        The PM Verdict
                                    </h2>
                                </div>

                                <div style={{ 
                                    display: 'flex', 
                                    gap: '20px', 
                                    justifyContent: 'center', 
                                    flexWrap: 'wrap',
                                    width: '100%'
                                }}>
                                    {/* Card A: Major Feature Bet */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9 }}
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.25)',
                                            border: '1px solid rgba(79, 195, 247, 0.35)', // Cyan border
                                            borderRadius: '20px',
                                            padding: '2.5rem',
                                            flex: '1 1 280px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <h3 style={{ color: '#4fc3f7', fontSize: '1.25rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            🚀 Major Feature Bet
                                        </h3>
                                        <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#ccc', margin: 0 }}>
                                            The <strong>Two-Act Faction Shift sequence</strong>. Forcing an immediate transition into the Cop role to bust the rival you just defeated as a Racer converts a competing design conflict into a unified gameplay pipeline. This directly optimizes the North Star Metric of a balanced 1:1 Faction Playtime Ratio.
                                        </p>
                                    </motion.div>

                                    {/* Card B: Biggest Risk to LTV */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9 }}
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.25)',
                                            border: '1px solid rgba(255, 143, 0, 0.35)', // Orange border
                                            borderRadius: '20px',
                                            padding: '2.5rem',
                                            flex: '1 1 280px',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <h3 style={{ color: '#ff8f00', fontSize: '1.25rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            ⚠️ Biggest Risk to LTV
                                        </h3>
                                        <p style={{ lineHeight: '1.7', fontSize: '0.95rem', color: '#ccc', margin: 0 }}>
                                            The <strong>Compounding Failure Loop</strong> within the Payback mechanic. If a player fails a Payback run, the double-Heat difficulty modifier may scale past their mechanical skill ceiling, transforming an intended retention mechanic into an aggressive churn vector. Decoupling aggressive AI is planned if the Rage-Quit Vector spikes.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            )}
        </motion.div>
    );
};

export default DeepDiveNfsMw2005;
