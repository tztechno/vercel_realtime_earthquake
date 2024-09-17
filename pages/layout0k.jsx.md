import React, { useState, useEffect } from 'react';
import Page1 from './page1';
import Page5 from './page5';
import Page7 from './page7';
import Page9 from './page9';
import Page10 from './page10';
import Page11 from './page11';
import Page12 from './page12';
import Page13 from './page13';
import Page14 from './page14';
import Time from './time';
import AudioVisualizer from './sound';
import Navigation from '../components/Navigation';

const Layout = () => {
    // States to track the current page index for each slideshow
    const [currentPageIndex1, setCurrentPageIndex1] = useState(0);
    const [currentPageIndex2, setCurrentPageIndex2] = useState(0);

    // Arrays of pages for each slideshow
    const pages1 = [<Page1 key="page1" />, <Page7 key="page7" />, <Page9 key="page9" />];
    const pages2 = [<Page5 key="page5" />, <Page11 key="page11" />, <Page12 key="page12" />, <Page13 key="page13" />, <Page14 key="page14" />];

    // Effect to change the page index for the first slideshow
    useEffect(() => {
        const interval1 = setInterval(() => {
            setCurrentPageIndex1((prevIndex) => (prevIndex + 1) % pages1.length);
        }, 60000); // Change page every 60 seconds (60000 milliseconds)

        return () => clearInterval(interval1);
    }, []);

    // Effect to change the page index for the second slideshow
    useEffect(() => {
        const interval2 = setInterval(() => {
            setCurrentPageIndex2((prevIndex) => (prevIndex + 1) % pages2.length);
        }, 30000); // Change page every 30 seconds (30000 milliseconds)

        return () => clearInterval(interval2);
    }, []);

    return (
        <div style={{ position: 'relative', minHeight: '100vh', margin: 0, boxSizing: 'border-box' }}>
            {/* Background image with repeat, opacity, and fixed scroll */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // Ensure the background is behind the content
                    pointerEvents: 'none', // Disable interaction with the background
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '150%',
                        backgroundImage: 'url("/background.jpg")', // Set the background image path
                        backgroundRepeat: 'repeat', // Repeat the background image
                        backgroundSize: 'auto', // Default size
                        backgroundAttachment: 'fixed', // Fix the background so it doesn't scroll with content
                        opacity: 0.04, // Apply opacity only to the background
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)', // 黒の半透明レイヤー
                    }}
                />
            </div>

            {/* Main content */}
            <div style={{ display: 'flex', minHeight: '100vh', zIndex: 1 }}>
                {/* Left Column */}
                <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            flex: '0 0 30%',
                            border: '1px solid #999',
                            width: '320px',
                            boxSizing: 'border-box',
                            overflow: 'auto',
                        }}
                    >
                        <Page10 />
                    </div>
                    <div
                        style={{
                            flex: '0 0 30%',
                            border: '1px solid #999',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Navigation />
                    </div>
                    <div style={{ flex: '0 0 9%', border: '1px solid #999', boxSizing: 'border-box' }}>
                        <AudioVisualizer />
                    </div>

                    <div
                        style={{
                            flex: '0 0 4%',
                            border: '1px solid #999',
                            boxSizing: 'border-box',
                            height: '60px',
                            display: 'flex',
                            overflow: 'auto',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Time />
                    </div>
                </div>

                {/* Center Column */}
                <div style={{ flex: '0 0 80%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: '0 0 51%', border: '1px solid #999', boxSizing: 'border-box' }}>
                        {pages1[currentPageIndex1]} {/* Display the current page from the first slideshow */}
                    </div>
                    <div style={{ flex: '0 0 50%', border: '1px solid #999', boxSizing: 'border-box' }}>
                        {pages2[currentPageIndex2]} {/* Display the current page from the second slideshow */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
