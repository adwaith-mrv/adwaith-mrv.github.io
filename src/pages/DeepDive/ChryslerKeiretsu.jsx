import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ChryslerKeiretsu = () => {
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
            
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                background: '#1B1E23',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                marginTop: '2rem'
            }}>
                <div style={{ width: '100%' }}>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', paddingTop: 0, height: 0 }}>
                        <iframe 
                            title="How Chrysler created an American Keiretsu" 
                            frameBorder="0" 
                            width="1200" 
                            height="675" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                            src="https://view.genially.com/6288764e27bfd400185a9033" 
                            type="text/html" 
                            allowScriptAccess="always" 
                            allowFullScreen={true} 
                            scrolling="yes" 
                            allowNetworking="all"
                        ></iframe> 
                    </div> 
                </div>
            </div>
        </motion.div>
    );
};

export default ChryslerKeiretsu;
