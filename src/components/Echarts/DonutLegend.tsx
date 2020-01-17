import React from 'react';
import { 
    Grid,
    makeStyles,
    createStyles,
    Box,
    Typography,
    List
} from '@material-ui/core';
import PieChart, { PieChartProps } from './PieChart';
import clsx from 'clsx';
import ListItemEx from '~components/ListItemEx';
import * as Utils from '~code/utils';
import FontStyles from '~assets/tss/fontStyle';

export interface DonutLegendProps extends PieChartProps {
    unit?: string;
}

interface LegendItemProps {
    name: string;
    startColor: string;
    endColor: string;
    value: string;
    className?: string;
}

function LegendItem(props: LegendItemProps) {

    const classes = makeStyles(createStyles({
        root: {
            height: 12,
            width: '100%'
        },
        rectangle: {
            height: "100%",
            width: 26,
            background: `linear-gradient(90deg, ${props.startColor} 0%, ${props.endColor} 100%)`
        },
        text: {
            ...FontStyles.labelFont,
            fontSize: 12,
            opacity: 0.8
        },
        name: {
            width: 60
        },
        value: {
            width: 40
        }
    }))();

    return (
        <Box className={clsx(props.className,classes.root)} display="flex" justifyContent="space-between">
            <div className={classes.rectangle}/>
            <div style={{width:10}}/>
            <Box display="flex" flexGrow={1} alignItems="center">
                <Typography title={props.name} noWrap className={clsx(classes.text,classes.name)}>{props.name}</Typography>
            </Box>
            <div style={{width:10}}/>
            <Box display="flex" alignItems="center">
                <Typography noWrap align="right" title={props.value} className={clsx(classes.text,classes.value)}>{props.value}</Typography>
            </Box>
        </Box>
    )
}

export default function DonutLegend(props: DonutLegendProps) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} style={{height:"100%"}}>
                <PieChart style={{width:"100%", height:"100%"}} data={props.data}/>
            </Grid>
            <Grid item xs={6} style={{height:"100%"}}>
                <Box style={{width:"100%", height:"100%"}} display="flex" justifyContent="flex-end" alignItems="center">
                    <List style={{width:"100%"}}>
                        {props.data && props.data.map(el => (
                            <ListItemEx style={{width:"100%"}} key={el.name}>
                                <LegendItem name={el.name} startColor={el.startColor} endColor={el.endColor} value={Utils.parseNumerical(el.value)+props.unit}/>
                            </ListItemEx>
                        ))}
                    </List>
                </Box>
            </Grid>
        </Grid>
    )
}