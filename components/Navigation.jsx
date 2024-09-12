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
                        <a>Total Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page2">
                        <a>Latest Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page7">
                        <a>Huge Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page3">
                        <a>Table All</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page4">
                        <a>Table All 3 columns</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page6">
                        <a>Table Huge Earthquake</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page5">
                        <a>Magnituide Fig</a>
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
