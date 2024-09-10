import React, { useState, useEffect } from 'react';

const ClockDisplay = () => {
    const [utcTime, setUtcTime] = useState('');

    useEffect(() => {
        function updateClocks() {
            const utc = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

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
                height: '50px', // 高さを固定（必要に応じて調整）
                padding: '0 10px',
            }}
        >
            {/* title */}
            <div style={{ marginRight: '450px', fontWeight: 'bold' }}>Live Earthquakes</div>

            <div style={{ margin: '4px' }}>
                <strong>UTC:</strong> <span>{utcTime}</span>
            </div>
        </div>
    );
};

export default ClockDisplay;