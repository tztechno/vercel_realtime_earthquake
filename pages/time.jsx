import React, { useState, useEffect } from 'react';

const ClockDisplay = () => {
    const [utcTime, setUtcTime] = useState('');
    const [jstTime, setJstTime] = useState('');

    useEffect(() => {
        function updateClocks() {
            const utc = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
            const jst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' });

            function formatDateTime(dateTime) {
                const date = new Date(dateTime);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            }

            setUtcTime(formatDateTime(utc));
            setJstTime(formatDateTime(jst));
        }

        updateClocks();
        const intervalId = setInterval(updateClocks, 1000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 4px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    textAlign: 'left',
                    width: '210px', // Set your desired width
                    margin: '0 auto', // Center the content within the given width
                }}
            >
                <div style={{ margin: '0' }}>
                    <strong>UTC:</strong> <span>{utcTime}</span>
                </div>
                <div style={{ margin: '0' }}>
                    <strong>JST:</strong> <span>{jstTime}</span>
                </div>
            </div>
        </div>
    );
};

export default ClockDisplay;
