import React from 'react';
import { PanelNavi } from '~views/PanelDefine';
import AppBar from '@material-ui/core/AppBar';
import { 
    makeStyles, 
    Toolbar, 
    Grid 
} from '@material-ui/core';
import { bottomBarStyle } from '~assets/tss/views/sceneStyle';
import ImageButton from '~components/ImageButton';
import sceneViewMgr from '~views/SceneViewMgr';

export interface BottomBarProps {
    naviList?: Array<PanelNavi>;
    defaultName?: string;
    onClicked?: (navi:PanelNavi|null) => void;
}

export default function BottomBar(props: BottomBarProps) {

    const {
        naviList = []
    } = props;

    const classes = makeStyles((bottomBarStyle))();
    const [curName, setCurName] = React.useState<string>("");

    const onNaviClicked = (navi:PanelNavi): void => {
        let curNavi:PanelNavi|null = null;
        if(navi.name !== curName) {
            curNavi = navi;
        }
        setCurName(curNavi ? curNavi.name : "");
        if(curNavi) {
            sceneViewMgr.leftPanel = curNavi.leftPanel ? curNavi.leftPanel : null;
            sceneViewMgr.rightPanel = curNavi.rightPanel ? curNavi.rightPanel : null;
        }
        else {
            sceneViewMgr.leftPanel = null;
            sceneViewMgr.rightPanel = null;
        }
    }

    return (
        <AppBar
        position="fixed"
        classes={{
            root: classes.root
        }}
        >
            <Toolbar className={classes.toolBar}>
                <div className={classes.navigation}>
                    <Grid container spacing={2}>
                        {naviList.map(el => <Grid item key={el.name}>
                            <ImageButton image={curName === el.name ? el.logoHover : el.logo} 
                            imageHover={el.logoHover}
                            onClick={() => {onNaviClicked(el);}}
                            />    
                        </Grid>)}
                    </Grid>
                </div>
            </Toolbar>
        </AppBar>
    )
}