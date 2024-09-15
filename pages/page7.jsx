import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map3 = dynamic(() => import('../components/Map3'), { ssr: false });

const Page7 = () => {
    const [data, setData] = useState(null);
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data);
        } catch (error) {
            console.error('Data fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const fetchInterval = setInterval(fetchData, 30000);
        return () => clearInterval(fetchInterval);
    }, []);

    useEffect(() => {
        if (data && data.features && data.features.length > 0) {
            const slideShowInterval = setInterval(() => {
                setCurrentFeatureIndex((prevIndex) =>
                    (prevIndex + 1) % data.features.filter(feature => feature.properties.mag >= 5).length
                );
            }, 10000);
            return () => clearInterval(slideShowInterval);
        }
    }, [data]);

    const filteredFeatures = data?.features?.filter(feature => feature.properties.mag >= 5) || [];

    if (!data || filteredFeatures.length === 0) {
        return <div>Loading or no earthquake data available...</div>;
    }

    const currentFeature = filteredFeatures[currentFeatureIndex];

    return (
        <div style={{ width: '100%', height: '98vh' }}>
            <Map3 feature={currentFeature} />
            <div style={{ position: 'absolute', top: '10px', left: '380px', background: 'white', padding: '10px', zIndex: 1000 }}>
{currentFeatureIndex + 1} of {filteredFeatures.length}
            </div>
        </div>
    );
};

export default Page7;