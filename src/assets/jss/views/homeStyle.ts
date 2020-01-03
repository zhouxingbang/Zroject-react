import BgTitleBar from '~assets/img/bg_titleBar.png';
import BgLeftSide from '~assets/img/bg_leftSide.png';

const titleBarStyle = {
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
    }
}

const sideDrawerStyle = {
    paper: {
        height: "100%",
        backgroundColor: 'transparent',
        borderImage: `url(${BgLeftSide}) 0 20 0 0 fill stretch`
    },
    paperAnchorDockedLeft: {
        borderWidth: 70
    },
    paperAnchorDockedRight: {
        borderWidth: 0
    }
}

export {
    titleBarStyle,
    sideDrawerStyle
}