import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import clsx from 'clsx';
import BarChart from './Echarts/BarChart';
import * as Utils from '~code/utils';

export interface BarRingProps {
    className?: string;
    style?: React.CSSProperties;
    tdata: {name:string,value:number};
    bdata: {name:string,value:number};
    rdata: {name:string,value:number};
}

export default function BarRing(props:BarRingProps) {

    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: 80
        },
        barChart: {
            height: 80,
            flexGrow: 1
        },
        ring: {
            width: 60,
            height: 60,
            marginTop: -10,
            fontFamily: "Microsoft YaHei",
            fontSize: 12,
            color: '#fff',
            textAlign: 'center',
            backgroundImage: `url(${require('~assets/img/circle_small.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }
    }))();

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" className={clsx(classes.root,props.className)} style={props.style}>
            <BarChart 
            className={classes.barChart} 
            xAxisColor='#416d7d' 
            labels={[props.tdata.name,props.bdata.name]} 
            data={[{name:'', data:[
                {value:props.tdata.value,startColor:"#2bf99f",endColor:"#56ffb5"},
                {value:props.bdata.value,startColor:"#3ed5f0",endColor:"#0eb9de"}
                ]}]}
            />
            <div style={{width: 20}}/>
            <Box display="flex" justifyContent="center" alignItems="center" className={classes.ring}>
                {Utils.parseNumerical(props.rdata.value,0)+"%"}<br/>{props.rdata.name}
            </Box>
        </Box>
    )
}