import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/page1">All Map</Link></li>
                <li><Link href="/page2">Latest Map</Link></li>
                <li><Link href="/page7">Huge Map</Link></li>

                <li><Link href="/page3">Table all</Link></li>
                <li><Link href="/page4">Table small</Link></li>  
                <li><Link href="/page6">Table huge</Link></li>  
                   
                <li><Link href="/page5">Mag Plot</Link></li>      

                <li><Link href="/time">Time</Link></li>            
            </ul>
        </nav>
    );
};

export default Navigation;
