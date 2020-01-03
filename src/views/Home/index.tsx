import * as React from 'react';
import TitleBar from './TitleBar';
import SideDrawer from './SideDrawer';

export default function Home() {
    return (
        <div>
            <TitleBar/>
            <SideDrawer open={true}/>
        </div>
    )
}