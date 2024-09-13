import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>

                <li><Link href="/page1">1: All Map</Link></li>
                <li><Link href="/page2">2: Latest Map</Link></li>
                <li><Link href="/page7">7: Huge Map</Link></li>

                <li><Link href="/page3">3: Table all</Link></li>
                <li><Link href="/page4">4: Table small</Link></li> 
                <li><Link href="/page8">8: Table slide</Link></li>   
                <li><Link href="/page6">6: Table huge</Link></li>  

                <li><Link href="/page5">5: Mag Plot</Link></li>      

                <li><Link href="/time">Time</Link></li>   
                <li><Link href="/sound">Sound</Link></li>   
                <li><Link href="/NavigationPage">Navigation</Link></li>   
            </ul>
        </nav>
    );
};

export default Navigation;
