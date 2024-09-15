import React, { useEffect, useState } from 'react';
import './Page8.css'; // スライダーのCSSを別ファイルで管理

const Page8 = () => {
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
        <div style={{ width: '98%', height: '98vh', padding: '4px', overflow: 'hidden' }}>
            {sortedData.length === 0 ? (
                <p>データがありません。</p>
            ) : (
                <div className="slider-container">
                    <table className="slider-table">
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>JST</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>Loc</th>
                                <th style={{ border: '1px solid #ddd', padding: '4px' }}>Mag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((feature, index) => {
                                const { mag, place, time } = feature.properties;
                                return (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid #ddd', padding: '4px' }}>{new Date(time).toUTCString()}</td>
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

export default Page8;
