import * as React from 'react';

export default function App(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div style={{width:200, height:200, backgroundColor:"black"}} {...props}>
        </div>
    )
}