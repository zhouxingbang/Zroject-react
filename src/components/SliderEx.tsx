import React from 'react';
import { withStyles, Slider } from '@material-ui/core';

export default withStyles({
    root: {
        color: '#0fbdda',
        height: 2,
        padding: '16px 0'
    },
    thumb: {
        height: '10px',
        width: '10px',
        backgroundColor: '#0fbdda',
        boxShadow: '0px 0px 0px 6px rgba(15, 189, 218, 0.48)',
        marginTop: 'calc(50%-5px)',
        marginLeft: 'calc(50%-5px)',
        '&:hover': {
            boxShadow: '0px 0px 0px 6px rgba(15, 189, 218, 0.48)'
        },
        '&:focus': {
            boxShadow: '0px 0px 0px 6px rgba(15, 189, 218, 0.48)'
        }
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: 'rgba(255,255,255,0.1)'
    }  
})(Slider);