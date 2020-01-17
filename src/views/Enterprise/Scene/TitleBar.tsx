import React from 'react';
import { AppBar, 
    Toolbar, 
    makeStyles, 
    Grid,
    Typography,
    Divider
} from '@material-ui/core';
import { titleBarStyle } from '~assets/tss/views/sceneStyle';
import ImageButton from '~components/ImageButton';

export interface TitleBarProp {
    title?: string;
    children?: React.ReactNode;
}

const clientMode = require('config').globalConfig.clienMode;

export default function TitleBar(props:TitleBarProp) {

    const classes = makeStyles((titleBarStyle))();

    const [maximized, setMaximized] = React.useState<boolean>(false);
    
    return (
        <AppBar
        classes={{
            root: classes.root
        }}
        >
            <Toolbar className={classes.toolBar}>
                <div>
                    <Grid container>
                        <Grid item><img alt="" src={require('~assets/img/logo_titleBar.png')} className={classes.logo}/></Grid>
                        {props.title && <React.Fragment>
                            <Grid item style={{width: 10}}/>
                            <Grid item><Divider classes={{root: classes.divider}} orientation='vertical'/></Grid>
                            <Grid item style={{width: 10}}/>
                            <Grid item><Typography className={classes.titleName}>{props.title}</Typography></Grid>
                        </React.Fragment> }
                    </Grid>
                </div>
                <div style={{flexGrow:1}}>
                    {props.children}
                </div>
                <div style={{marginTop:-10}}>
                    <Grid container spacing={3}>
                        {clientMode && <React.Fragment>
                            <Grid item>
                                <ImageButton image={require('~assets/img/minimize.png')} imageHover={require('~assets/img/minimize_hover.png')}/>
                            </Grid>
                            <Grid item>
                                {maximized ? <ImageButton image={require('~assets/img/nmaximize.png')} imageHover={require('~assets/img/nmaximize_hover.png')}/> 
                                : <ImageButton image={require('~assets/img/maximize.png')} imageHover={require('~assets/img/maximize_hover.png')}/>
                                }
                            </Grid>
                            <Grid item>
                                <ImageButton image={require('~assets/img/close.png')} imageHover={require('~assets/img/close_hover.png')}/>
                            </Grid>
                        </React.Fragment>}
                    </Grid>
                </div>
            </Toolbar>                
        </AppBar>
    )
}