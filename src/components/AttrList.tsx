import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { 
    List, 
    Box, 
    Grid, 
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import FontStyles from '~assets/tss/fontStyle';
import ListItemEx from './ListItemEx';

export type ListAttrType = {
    name: string;
    value: string;
}

function AttrItem(props:ListAttrType) {
    
    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: 36
        },
        text: {
            ...FontStyles.labelFont,
            fontSize: 12
        },
        canvas: {
            marginLeft: 20,
            width: 4,
            height: '100%'
        },
        value: {
            flexGrow: 1,
            width: "100%",
            direction: 'ltr'
        }
    }))();

    const canvasRef = React.useRef<HTMLCanvasElement|null>(null);

    React.useEffect(() => {
        if(!canvasRef.current) return;
        let ctx=canvasRef.current.getContext('2d');
        if(ctx) {
            let width = canvasRef.current.width;
            let height = canvasRef.current.height; 
            ctx.clearRect(0,0,width,height);
            ctx.lineWidth = 1;
            ctx.moveTo(width*0.5, 0);
            ctx.lineTo(width*0.5, height);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.stroke();
            ctx.fillStyle='rgba(44,249,159,0.8)';
            ctx.fillRect(0, height*0.25, width, height*0.5);
        }
    });

    return (
        <Box className={classes.root} display="flex" alignItems="center" justifyContent="space-between">
            <Grid container style={{height:"100%"}}>
                <Grid item container style={{width:50}} alignItems="center">
                    <Typography className={classes.text}>{props.name}</Typography>
                </Grid>
                <Grid item style={{width:10}}/>
                <Grid item>
                    <canvas className={classes.canvas} ref={canvasRef}/>
                </Grid>
            </Grid>
            <Typography noWrap align="left" className={clsx(classes.text,classes.value)} title={props.value}>{props.value}</Typography>
        </Box>
    )
}

export interface AttrListProps {
    data?: ListAttrType[];
    style?: React.CSSProperties;
    className?: string;
}

export default function AttrList(props:AttrListProps) {

    const {
        data = [],
        ...other
    } = props;

    return (
        <div {...other}>
            <List style={{width:'100%'}}>
                {data.map(el => (
                    <ListItemEx key={el.name}>
                        <AttrItem {...el} />
                    </ListItemEx>
                ))}
            </List>
        </div>
    )
}