import React, { useEffect, useState } from 'react';
//import Navigation from '../components/Navigation';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

// Dynamically import the Map component without server-side rendering
const Map = dynamic(() => import('../components/Map2'), { ssr: false });

// show world map
const Page2 = () => {
    const [data, setData] = useState(null); // Initialize state to hold earthquake data

    const updateMap = async () => {
        try {
            const response = await fetch('/api/fetchData'); // Fetch data from API route
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data); // Update state with fetched data
        } catch (error) {
            console.error('Error updating map:', error);
        }
    };

    useEffect(() => {
        updateMap(); // Initial data fetch on component mount
        const interval = setInterval(updateMap, 30000); // Update every 30 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <div style={{ width: '100%', height: '98vh' }}>
            <Map data={data} /> {/* Pass the fetched data to the Map component */}
        </div>
    );
};

export default Page2;
