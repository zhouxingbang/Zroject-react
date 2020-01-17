import React from 'react';
import { Drawer, makeStyles, Box } from '@material-ui/core';
import { sideDrawerStyle } from '~assets/tss/views/sceneStyle';

export interface SideDrawerProps {
    position?: 'left'| 'right';
    open?: boolean;
    component?: React.ReactNode;
    componentEx?: React.ReactNode;
}

export default function SideDrawer(props: SideDrawerProps) {
    
    const classes = makeStyles(sideDrawerStyle)();

    const {
        position = 'left'
    } = props;

    return (
        <Drawer
        anchor={position}
        open={props.open}
        variant="persistent"
        classes={{
            paper: position === 'left' ? classes.paperLeft : classes.paperRight,
            paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
            paperAnchorDockedRight: classes.paperAnchorDockedRight
        }}
        >
            <Box display="flex" flexDirection={position === 'left' ? "row" : "row-reverse"} 
            className={position === 'left' ? classes.left : classes.right}>
                {props.component}
                {props.componentEx && <div 
                style={position === 'left' ? {paddingLeft:30,height:'100%'} : {paddingRight:30,height:'100%'}}>
                    {props.componentEx}
                </div>}
            </Box>
        </Drawer>
    )
}