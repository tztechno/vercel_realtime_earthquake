import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>

                <li><Link href="/page1">1: World Map</Link></li>
                <li><Link href="/page2">2: Latest Map</Link></li>
                <li><Link href="/page7">7: Huge Map</Link></li>
                <li><Link href="/page9">9: Japan Map</Link></li>

                <li><Link href="/page3">3: Table All</Link></li>
                <li><Link href="/page4">4: Table All small</Link></li> 
                <li><Link href="/page8">8: Table All slide</Link></li>   
                <li><Link href="/page6">6: Table Huge</Link></li>  
                <li><Link href="/page10">10: Table Huge small</Link></li> 
                <li><Link href="/page15">15: Notification System</Link></li> 

                <li><Link href="/page5">5: Mag Time Plot</Link></li>    
                <li><Link href="/page11">11: Mag Lat Plot</Link></li>    
                <li><Link href="/page12">12: Mag Long Plot</Link></li>   
                <li><Link href="/page13">13: Depth Long Plot</Link></li>   
                <li><Link href="/page14">14: Lat Long Plot</Link></li>   

                <li><Link href="/time">Time</Link></li>   
                <li><Link href="/sound">Sound</Link></li>   
                <li><Link href="/NavigationPage">Navigation</Link></li>   
            </ul>
        </nav>
    );
};

export default Navigation;
