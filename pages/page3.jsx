import React, { useEffect, useState } from 'react';

const Page3 = () => {
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
        fetchData(); // コンポーネントのマウント時にデータを取得
        const interval = setInterval(fetchData, 30000); // 30秒ごとにデータを更新

        return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
    }, []);

    // データを新しい順に並べ替え
    const sortedData = data?.features?.slice().sort((a, b) => b.properties.time - a.properties.time) || [];

    return (
        <div style={{ width: '97%', height: '100vh', padding: '20px' }}>
            <h1>地震データ一覧</h1>
            {sortedData.length === 0 ? (
                <p>データがありません。</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>日時</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>場所</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>マグニチュード</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>深さ (km)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>緯度</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>経度</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((feature, index) => {
                            const { mag, place, time } = feature.properties;
                            const [long, lat, depth] = feature.geometry.coordinates;
                            return (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(time).toLocaleString()}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{place}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mag}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{depth}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lat.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{long.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Page3;
