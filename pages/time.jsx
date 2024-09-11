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
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '50px',
                padding: '0 10px',
            }}
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ margin: '4px' }}>
                    <strong>UTC:</strong> <span>{utcTime}</span>
                </div>
                <div style={{ margin: '4px' }}>
                    <strong>JST:</strong> <span>{jstTime}</span>
                </div>
            </div>
        </div>
    );
};

export default ClockDisplay;
