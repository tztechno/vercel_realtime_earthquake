import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">ホーム</Link></li>
                <li><Link href="/page1">ページ 1</Link></li>
                <li><Link href="/page2">ページ 2</Link></li>
                <li><Link href="/page3">ページ 3</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
