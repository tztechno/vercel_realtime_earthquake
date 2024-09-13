// Layout.jsx
import React from 'react';
import Page1 from './page1'; // Import Page1 component
import Page5 from './page5'; // Import Page3 component
import Page4 from './page4'; // Import Page3 component
import Time from './time';   // Import Time component
import AudioVisualizer from './sound';   // Import Time component
import Navigation from '../components/Navigation'; // Import Navigation component

const Layout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', margin: 0, boxSizing: 'border-box' }}>
            {/* Left Column */}
            <div style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column' }}>
                <div
                    style={{
                        flex: '0 0 98%',
                        border: '1px solid #999',
                        width: '286px', // Fixed minimum width
                        boxSizing: 'border-box',
                        overflow: 'auto',
                    }}
                >
                    <Page4 />
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
                    <Page1 />
                </div>
                
                <div style={{ flex: '0 0 50%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    <Page5 />
                </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: '0 0 20%', display: 'flex', flexDirection: 'column' }}>

                <div style={{ flex: '0 0 91%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    <AudioVisualizer />
                </div>

                <div
                    style={{
                        flex: '0 0 7%', // Set height to 10%
                        border: '1px solid #999',
                        boxSizing: 'border-box',
                        height: '50px', // Fixed minimum height (adjust if needed)
                        display: 'flex',
                        overflow: 'auto', // Show scroll bar if content overflows
                        alignItems: 'flex-end', // Align to bottom
                        justifyContent: 'flex-end', // Align to the right
                    }}
                >
                    <Time />
                </div>

            </div>
        </div>
    );
};

export default Layout;
