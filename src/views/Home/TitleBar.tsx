import * as React from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { titleBarStyle } from '~assets/jss/views/homeStyle';

export default function TitleBar() {

    const classes = makeStyles(createStyles(titleBarStyle))();

    return (
        <AppBar
        classes={{
            root: classes.root
        }}
        >
            <Toolbar>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                <div style={{flexGrow:1}}/>
                <IconButton>
                    <AccountCircle/>
                </IconButton>
            </Toolbar>                
        </AppBar>
    )
}