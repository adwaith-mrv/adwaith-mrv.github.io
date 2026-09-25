import React, { useState, useEffect } from 'react';
import { AUDIO_ENABLED } from '../../config/audioConfig';
import './Navbar.css';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Deep Dives', href: '#deep-dives' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const RESUME_URL = '/assets/resume/Adwaith_V_Resume.pdf';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Sync with background audio state
    useEffect(() => {
        if (!AUDIO_ENABLED) return;

        const audio = document.getElementById('bg-music');
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handlePause);

        setIsPlaying(!audio.paused);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handlePause);
        };
    }, []);

    const toggleSound = () => {
        if (!AUDIO_ENABLED) return;

        const audio = document.getElementById('bg-music');
        if (!audio) return;

        if (audio.paused) {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.log('Sound toggle play error:', err));
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile drawer on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
            <div className="navbar-container">
                <a href="#top" className="navbar-logo" onClick={scrollToTop}>
                    <span className="logo-accent">Adwaith</span> V
                </a>

                {/* Desktop Links */}
                <div className="navbar-links-desktop">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="navbar-link"
                            onClick={(e) => scrollToSection(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* Sound Toggle Button - Preserved in code; deactivated and hidden until AUDIO_ENABLED is true */}
                    {AUDIO_ENABLED && (
                        <button
                            type="button"
                            className={`navbar-sound-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={toggleSound}
                            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
                            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
                        >
                            <span className="sound-icon">{isPlaying ? '🔊' : '🔇'}</span>
                            <span className="sound-text">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
                        </button>
                    )}
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-resume-btn"
                        aria-label="Download Resume"
                        title="Download Resume"
                    >
                        <span className="btn-text">Resume</span>
                        <div className="btn-glow"></div>
                        <div className="btn-particles">
                            <div className="particle"></div>
                            <div className="particle"></div>
                            <div className="particle"></div>
                        </div>
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className={`navbar-hamburger ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <div
                className={`navbar-drawer-backdrop ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(false)}
            />

            <div className={`navbar-drawer ${isOpen ? 'open' : ''}`}>
                <div className="navbar-drawer-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="drawer-link"
                            onClick={(e) => scrollToSection(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* Mobile Sound Toggle Button - Preserved in code; deactivated and hidden until AUDIO_ENABLED is true */}
                    {AUDIO_ENABLED && (
                        <button
                            type="button"
                            className={`drawer-sound-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={toggleSound}
                            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
                        >
                            <span className="sound-icon">{isPlaying ? '🔊' : '🔇'}</span>
                            <span className="sound-text">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
                        </button>
                    )}
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="drawer-resume-btn"
                        onClick={() => setIsOpen(false)}
                        aria-label="Download Resume"
                        title="Download Resume"
                    >
                        <span className="btn-text">Download Resume</span>
                        <div className="btn-glow"></div>
                        <div className="btn-particles">
                            <div className="particle"></div>
                            <div className="particle"></div>
                            <div className="particle"></div>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
