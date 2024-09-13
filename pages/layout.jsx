import React, { useState, useEffect } from 'react';
import Page1 from './page1';
import Page5 from './page5';
import Page8 from './page8';
import Page7 from './page7';
import Page9 from './page9';
import Time from './time';
import AudioVisualizer from './sound';
import Navigation from '../components/Navigation';

const Layout = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track the current page index

    // Array of pages to display alternately
    const pages = [<Page1 key="page1" />, <Page7 key="page7" />, <Page9 key="page9" />];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length); // Cycle through the pages
        }, 60000); // Change page every 60 seconds (60000 milliseconds)

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', margin: 0, boxSizing: 'border-box' }}>
            {/* Left Column */}
            <div style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column' }}>
                <div
                    style={{
                        flex: '0 0 98%',
                        border: '1px solid #999',
                        width: '286px',
                        boxSizing: 'border-box',
                        overflow: 'auto',
                    }}
                >
                    <Page8 />
                </div>
                <div
                    style={{
                        flex: '0 0 50%',
                        border: '1px solid #999',
                        boxSizing: 'border-box',
                    }}
                >
                    <Navigation />
                </div>
            </div>

            {/* Center Column */}
            <div style={{ flex: '0 0 80%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '0 0 60%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    {pages[currentPageIndex]} {/* Display the current page */}
                </div>
                <div style={{ flex: '0 0 50%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    <Page5 />
                </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column' }}>

                <div
                    style={{
                        flex: '0 0 7%',
                        border: '1px solid #999',
                        boxSizing: 'border-box',
                        height: '50px',
                        display: 'flex',
                        overflow: 'auto',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Time />
                </div>

                <div style={{ flex: '0 0 20%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    <AudioVisualizer />
                </div>

                <div
                    style={{
                        flex: '0 0 50%',
                        border: '1px solid #999',
                        boxSizing: 'border-box',
                    }}
                >
                    <Navigation />
                </div>


            </div>
        </div>
    );
};

export default Layout;
