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
                        <a>1:Total Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page2">
                        <a>2:Latest Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page7">
                        <a>7:Huge Earthquake Map</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page3">
                        <a>3:Table All</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page4">
                        <a>4:Table All 3 columns</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page6">
                        <a>6:Table Huge Earthquake</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page5">
                        <a>5:Magnituide Fig</a>
                    </Link>
                </li>
                <li>
                    <Link href="/time">
                        <a>t:Time</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
