import React, { useEffect, useState, useRef } from 'react';

const Page15 = () => {
    const [data, setData] = useState(null);
    const [lastEventId, setLastEventId] = useState(null);
    const [announcement, setAnnouncement] = useState('');
    const speechSynthesisRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data);
            checkForNewEarthquake(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkForNewEarthquake = (newData) => {
        if (newData?.features && newData.features.length > 0) {
            const latestEvent = newData.features[0];
            if (latestEvent.id !== lastEventId) {
                setLastEventId(latestEvent.id);
                announceNewEarthquake(latestEvent);
            } else {
                console.log('No new earthquakes detected. Skipping announcement.');
            }
        }
    };

    const announceNewEarthquake = (event) => {
        const { mag, place } = event.properties;
        const announcementText = `New earthquake detected. Location: ${place}, Magnitude: ${mag.toFixed(1)}`;
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
            <p><strong>Earthquake Notification System</strong></p>
            {announcement && (
                <div style={{
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '10px'
                }}>
                    <h2>Latest Announcement:</h2>
                    <p>{announcement}</p>
                </div>
            )}
        </div>
    );
};

export default Page15;