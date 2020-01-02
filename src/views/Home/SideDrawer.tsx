import * as React from 'react';
import { Drawer, makeStyles, createStyles } from '@material-ui/core';
import { sideDrawerStyle } from '~assets/jss/views/homeStyle';

export interface SideDrawerProps {
    position?: 'left'| 'top';
    open?: boolean;
}

export default function SideDrawer(props: SideDrawerProps) {
    
    const classes = makeStyles(createStyles(sideDrawerStyle))();

    const {
        position = 'left'
    } = props;

    return (
        <Drawer
        anchor={position}
        open={props.open}
        variant="persistent"
        classes={{
            paper: classes.paper,
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
            paperAnchorDockedRight: classes.paperAnchorDockedRight
        }}
        >
            <div style={{width:280, height:'100%'}}/>
        </Drawer>
    )
}