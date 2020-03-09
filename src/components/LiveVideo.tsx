import React, { useEffect } from 'react';
import 'video.js/dist/video-js.min.css';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/styles';

let videojs = require('video.js');

export default function LiveVideo(props:{
    url: string, 
    className?: string,
    style?: React.CSSProperties
}) {
    
    const {
        url = "",
        className,
        ...other
    } = props;

    const classes = makeStyles(createStyles({
        root: {
            border: "1px solid #144861"
        }
    }))();

    const videoRef = React.useRef(null);

    useEffect(() => {
        let inst = videojs(videoRef.current, {
            autoplay: true,
            controls: false,
            sources: [{
                src: url,
                type: 'application/x-mpegURL'
            }]}, function onPlayerReady() {}
        );
        inst.src([{type:"application/x-mpegURL",src:url}]);
        inst.play();
    }, [url]);

    useEffect(() => {
        let inst = videojs(videoRef.current, {
            autoplay: true,
            controls: false,
            sources: [{
                src: url,
                type: 'application/x-mpegURL'
            }]}, function onPlayerReady() {}
        );
       return () => {
           if(inst){
                inst.dispose();
            }
        }
    }, []);

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <div data-vjs-player style={{width:"100%", height:"100%"}}>
                <video ref={ videoRef } className="video-js" width="100%" height="100%" preload="auto"></video>
            </div>
        </div>
    )
};