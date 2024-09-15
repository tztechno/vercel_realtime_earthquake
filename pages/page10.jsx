import React, { useEffect, useState } from 'react';

const Page10 = () => {
    const [data, setData] = useState(null);

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
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    // マグニチュード5以上の地震をフィルタリングし、新しい順に並べ替え
    const filteredAndSortedData = data?.features
        ?.filter(feature => feature.properties.mag >= 5)
        ?.sort((a, b) => b.properties.time - a.properties.time) || [];

    return (
        <div style={{ width: '98%', height: '98vh', padding: '4px' }}>

            {filteredAndSortedData.length === 0 ? (
                <p>マグニチュード5以上の地震データがありません。</p>
            ) : (
                <div style={{ fontSize: '0.8em' }}> {/* Smaller text size */}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>UTC</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>Loc</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>Mag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedData.map((feature, index) => {
                                const { mag, place, time } = feature.properties;
                                return (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>{new Date(time).toISOString().replace('T', ' ').substring(0, 19)}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>{place}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>{mag.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Page10;
