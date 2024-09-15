import React, { useEffect, useState } from 'react';

const Page4 = () => {
    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) {
                throw new Error('ネットワーク応答が正常ではありません');
            }
            const result = await response.json();
            console.log('Fetched data:', result.data);
            setData(result.data);
        } catch (error) {
            console.error('データ取得エラー:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
        const interval = setInterval(fetchData, 30000); // Update data every 30 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        // Shift the data index every 10 seconds
        const shiftInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (!data || !data.features) return 0;

                const total = data.features.length;
                const maxStartIndex = Math.max(total - 12, 0); // Calculate max start index to stay within bounds

                // Move to the next index or loop back to start
                return prevIndex < maxStartIndex ? prevIndex + 1 : 0;
            });
        }, 5000);

        return () => clearInterval(shiftInterval); // Cleanup on component unmount
    }, [data]);

    // Sort data by time in descending order
    const sortedData = data?.features?.slice().sort((a, b) => b.properties.time - a.properties.time) || [];

    // Get the slice of data to display (8 rows, starting from currentIndex)
    const displayedData = sortedData.slice(currentIndex, currentIndex + 12);

    return (
        <div style={{ width: '96%', height: '94vh', padding: '4px' }}>
            {displayedData.length === 0 ? (
                <p>データがありません。</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>UTC</th>
                            <th style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>Loc</th>
                            <th style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>Mag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((feature, index) => {
                            const { mag, place, time } = feature.properties;
                            return (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>
                                        {new Date(time).toISOString().replace('T', ' ').substring(0, 19)}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>{place}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '4px', fontSize: '12px' }}>{mag.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Page4;
