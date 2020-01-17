import { createStyles } from '@material-ui/core';
import BgTitleBar from '~assets/img/bg_titleBar.png';
import BgLeftSide from '~assets/img/bg_leftSide.png';
import BgRightSide from '~assets/img/bg_rightSide.png';
import BgBottomBar from '~assets/img/bg_bottomBar.png';
import BgNavigationBar from '~assets/img/bg_navigationBar.png';

const titleBarStyle = createStyles({
    root: {
        height: 88,
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 0',
        backgroundImage: `url(${BgTitleBar})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        zIndex: 1300         
    },
    toolBar: {
        height: '100%'
    },
    logo: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    divider: {
        marginTop: 8,
        height: 16,
        backgroundColor: "#A5E9F2"
    },
    titleName: {
        marginTop: 4,
        fontFamily: 'Microsoft Yahei',
        fontSize: 16,
        color: "#91E2EB"
    }
});

const sideDrawerStyle = createStyles({
    paperLeft: {
        backgroundColor: 'transparent',
        borderImage: `url(${BgLeftSide}) 0 20 0 0 fill stretch`
    },
    paperRight: {
        backgroundColor: 'transparent',
        borderImage: `url(${BgRightSide}) 0 0 0 20 fill stretch`
    },
    paperAnchorDockedLeft: {
        borderWidth: 70
    },
    paperAnchorDockedRight: {
        borderWidth: 70
    },
    left: {
        marginTop: 88,
        paddingLeft: 30,
        paddingBottom: 30,
        height: '100%',
        overflow: 'hidden'
    },
    right: {
        marginTop: 88,
        paddingRight: 30,
        paddingBottom: 30,
        height: '100%'
    }
});

const bottomBarStyle = createStyles({
    root: {
        top: 'auto',
        bottom: 0,
        height: 180,
        boxShadow: '0 0 0 0',
        backgroundColor: 'transparent',
        backgroundImage: `url(${BgBottomBar})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    },
    toolBar: {
        height: 88,
        marginTop: 92,
        justifyContent: 'center',
        '&:hover': {
            zIndex: 1300
        }
    },
    navigation: {
        border: '20px solid transparent',
        borderImage: `url(${BgNavigationBar}) 25 25 fill stretch`
    }
});

export {
    titleBarStyle,
    sideDrawerStyle,
    bottomBarStyle
}