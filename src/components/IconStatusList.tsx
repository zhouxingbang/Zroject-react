import React from 'react';
import { makeStyles, createStyles, Box, Typography, Grid, Divider, List } from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';
import ListItemEx from './ListItemEx';

export type IconStatusItemType = {
    icon?: string;
    iconColor?: string;
    title: string;
    desc?: string;
    name?: string;
    nameColor?: string;
    [key:string]: any;
}

function IconStatusItem(props:IconStatusItemType & React.HTMLAttributes<HTMLDivElement>) {

    const {
        icon,
        iconColor,
        title,
        desc,
        name,
        nameColor,
        ...other
    } = props;

    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: 54
        },
        divider: {
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.02) 100%)'
        },
        icon: {
            width: 32,
            height: 32,
            backgroundImage: `url(${icon})`,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: '100% 100%'
        },
        title: {
            ...FontStyles.titleFont,
            color: "rgba(255,255,255,0.8)"
        },
        text: {
            ...FontStyles.labelFont,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 12,
            color: "rgba(255,255,255,0.7)"
        }
    }))();

    return (
        <div className={classes.root} {...other}>
            <Grid container>
                <Grid item container xs={12} style={{height:38}} spacing={0}>
                    <Grid item xs={8}>
                        <Box style={{width:'100%',height:'100%'}} display="flex" justifyContent="flex-start" alignItems="flex-start">
                            <Box className={classes.icon} display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <div style={{width:10,height:10,backgroundColor:iconColor}}/>
                            </Box>
                            <div style={{width:10}}/>
                            <Box style={{height:'100%',width:120}} display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography title={title} noWrap className={classes.title}>{title}</Typography>
                                <Typography title={desc} noWrap className={classes.text}>{desc}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box style={{width:'100%',height:'100%'}} display="flex" justifyContent="flex-end" alignItems="flex-end">
                            {nameColor && <div style={{padding:0, width:12,height:12,backgroundColor:nameColor}}/>}
                            <div style={{width:5}}/>
                            <Typography className={classes.text}>{name}</Typography>
                        </Box>
                    </Grid>                    
                </Grid>
                <Grid item xs={12} style={{height:15}}/>
                <Grid item xs={12}>
                    <Divider classes={{root: classes.divider}}/>
                </Grid>
            </Grid>
        </div>
    )
}

export interface IconStatusListProps {
    style?: React.CSSProperties;
    className?: string;
    data?: IconStatusItemType[];
    onDoubleClicked?(value:IconStatusItemType): void;
}

export default function IconStatusList(props:IconStatusListProps) {

    return (
        <div className={props.className} style={props.style}>
            <List style={{width:'100%'}}>
                {props.data && props.data.map(el => (
                    <ListItemEx key={el.title}>
                        <IconStatusItem {...el} onDoubleClick={() => {
                            if(props.onDoubleClicked) {
                                props.onDoubleClicked(el);
                            }
                        }}/>
                    </ListItemEx>
                ))}
            </List>
        </div>
    )
}