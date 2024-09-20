import React, { useEffect, useState, useRef } from 'react';

const Page15 = () => {
    const [data, setData] = useState(null);
    const [lastAnnouncedEventId, setLastAnnouncedEventId] = useState(null);
    const [announcement, setAnnouncement] = useState('');
    const speechSynthesisRef = useRef(null);
    const lastFetchTimeRef = useRef(0);

    const fetchData = async () => {
        const currentTime = Date.now();
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data);
            checkForNewEarthquake(result.data, currentTime);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkForNewEarthquake = (newData, fetchTime) => {
        if (newData?.features && newData.features.length > 0) {
            const latestEvent = newData.features[0];
            const eventTime = latestEvent.properties.time;

            if (eventTime > lastFetchTimeRef.current && latestEvent.id !== lastAnnouncedEventId) {
                setLastAnnouncedEventId(latestEvent.id);
                announceNewEarthquake(latestEvent);
                lastFetchTimeRef.current = fetchTime;
            } else {
                console.log('No new earthquakes detected since last check. Skipping announcement.');
            }
        } else {
            console.log('No earthquake data available.');
        }
    };

    const announceNewEarthquake = (event) => {
        const { mag, place, time } = event.properties;
        const eventTime = new Date(time).toLocaleString();
        const announcementText = `New earthquake detected at ${place}, Magnitude: ${mag.toFixed(1)}`;
        setAnnouncement(announcementText);

        if (typeof window !== 'undefined' && speechSynthesisRef.current) {
            const utterance = new SpeechSynthesisUtterance(announcementText);
            utterance.lang = 'en-US';
            speechSynthesisRef.current.speak(utterance);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            speechSynthesisRef.current = window.speechSynthesis;
        }

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

        return () => {
            clearInterval(interval);
            if (speechSynthesisRef.current) {
                speechSynthesisRef.current.cancel();
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Notification</h2>
            {announcement && (
                <div style={{
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '10px'
                }}>
                    <p>{announcement}</p>
                </div>
            )}
            {lastAnnouncedEventId && (
                <p>ID: {lastAnnouncedEventId}</p>
            )}
        </div>
    );
};

export default Page15;