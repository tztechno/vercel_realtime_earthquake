// components/Navigation.jsx
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page1">
                        <a>Whole Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page2">
                        <a>Focus Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page3">
                        <a>Table</a>
                    </Link>
                </li>
                <li>
                    <Link href="/time">
                        <a>Time</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
