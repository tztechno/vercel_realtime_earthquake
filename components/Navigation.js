import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/page1">Page1</Link></li>
                <li><Link href="/page2">Page2</Link></li>
                <li><Link href="/page3">Page3</Link></li>
                <li><Link href="/time">Time</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
