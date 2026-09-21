import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TauReadiness = () => {
    const navigate = useNavigate();

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
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
                minHeight: '100vh', 
                width: '100vw', 
                background: '#14161A', 
                position: 'relative', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                boxSizing: 'border-box'
            }}
        >
            {/* Fixed Back Button */}
            <button 
                onClick={() => navigate('/')} 
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    zIndex: 500,
                    background: 'rgba(27, 30, 35, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: "'BF Modernista', sans-serif",
                    fontWeight: 'bold',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 107, 53, 0.8)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(27, 30, 35, 0.8)'}
            >
                ← Back to Portfolio
            </button>
            
            {/* Canva Embed Container */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                background: '#1B1E23',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                marginTop: '2rem'
            }}>
                <div style={{
                    position: 'relative', 
                    width: '100%', 
                    height: 0, 
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
                    overflow: 'hidden',
                    borderRadius: '8px', 
                    willChange: 'transform'
                }}>
                    <iframe 
                        loading="lazy" 
                        style={{
                            position: 'absolute', 
                            width: '100%', 
                            height: '100%', 
                            top: 0, 
                            left: 0, 
                            border: 'none', 
                            padding: 0,
                            margin: 0
                        }}
                        src="https://www.canva.com/design/DAHPRvJv6qI/kv_OlghtvexU9LHUDx5RBQ/view?embed" 
                        allowFullScreen="allowfullscreen" 
                        allow="fullscreen"
                        title="Warframe: Tau (Fornax + Brysko) Presentation"
                    ></iframe>
                </div>
                <div style={{ 
                    marginTop: '1.25rem', 
                    textAlign: 'center', 
                    fontFamily: "'BF Modernista', sans-serif",
                    fontSize: '1.1rem'
                }}>
                    <a 
                        href="https://www.canva.com/design/DAHPRvJv6qI/kv_OlghtvexU9LHUDx5RBQ/view" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#3E7FCC', textDecoration: 'none', fontWeight: 'bold' }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                        Deck A — Warframe: Tau (Fornax + Brysko): Instrumenting a Star System So It Isn't a Content Island
                    </a>
                    <span style={{ color: '#FFFFFF', marginLeft: '8px' }}>by Adwaith V</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TauReadiness;
