import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/page1">Whole Map</Link></li>
                <li><Link href="/page2">Fucus Map</Link></li>
                <li><Link href="/page3">Table</Link></li>
                <li><Link href="/page4">Table2</Link></li>  
                <li><Link href="/page5">Plot</Link></li>      
                <li><Link href="/time">Time</Link></li>            
            </ul>
        </nav>
    );
};

export default Navigation;
