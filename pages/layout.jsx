import React from 'react';
import Page3 from './Page3'; // Import Page3 component
import Time from './Time'; // Import Time component
import Page1 from './Page1'; // Import Page1 component

const Layout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', margin: 0, boxSizing: 'border-box' }}>
            {/* 左列 */}
            <div style={{ flex: '0 0 15%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '0 0 90%', 
                    border: '1px solid #999', 
                    width: '320px', // 高さを固定（必要に応じて調整）
                    boxSizing: 'border-box', 
                    overflow: 'auto' }}>
                    <Page3 />
                </div>
                <div style={{ flex: '0 0 10%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    Left Bottom 50%
                </div>
            </div>

            {/* 中央列 */}
            <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    flex: '0 0 8%', // 幅を10%に設定
                    border: '1px solid #999',
                    boxSizing: 'border-box',
                    height: '50px', // 高さを固定（必要に応じて調整）
                    display: 'flex',
                    overflow: 'auto', // コンテンツがオーバーフローしたときにスクロールバーを表示
                    alignItems: 'bottom', // 縦の中央揃え
                    justifyContent: 'right' // 横の中央揃え
                }}>
                    <Time />
                </div>
                <div style={{ flex: '0 0 60%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    <Page1 />
                </div>
                <div style={{ flex: '0 0 24%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    Center Bottom 20%
                </div>
            </div>

            {/* 右列 */}
            <div style={{ flex: '0 0 25%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '0 0 50%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    Right Top 50%
                </div>
                <div style={{ flex: '0 0 50%', border: '1px solid #999', boxSizing: 'border-box' }}>
                    Right Bottom 50%
                </div>
            </div>
        </div>
    );
};

export default Layout;
