import React from 'react';
import SideDrawer from './SideDrawer';
import TitleBar from './TitleBar';
import BottomBar from './BottomBar';
import PanelConfig from '~views/PanelDefine';
import sceneViewMgr, { ActionType } from '~views/SceneViewMgr';

type StateType = {
    leftPanel: React.ReactNode|null;
    rightPanel: React.ReactNode|null;
    card: React.ReactNode|null;
}

function reducer(state:StateType, action:ActionType) {
    switch(action.type) {
        case "leftPanel":
            return {
                ...state,
                leftPanel: sceneViewMgr.leftPanel ? sceneViewMgr.leftPanel.view : null
            };
        case "rightPanel":
            return {
                ...state,
                rightPanel: sceneViewMgr.rightPanel ? sceneViewMgr.rightPanel.view : null
            };
        case "card":
            return {
                ...state,
                card: sceneViewMgr.card
            };
    }
    return state;
}

export default function Scene() {

     const [state, dispatch] = React.useReducer(reducer, { 
         leftPanel:null, 
         rightPanel:null, 
         card:null 
        });
    
    React.useEffect(() => {
        sceneViewMgr.init(dispatch);
        return () => {
            sceneViewMgr.unInit();
        }
    }, []);

    return (
        <div>
            <TitleBar/>
            <SideDrawer open={Boolean(state.leftPanel)} component={state.leftPanel}/>
            <SideDrawer open={Boolean(state.rightPanel) || Boolean(state.card)} position="right" 
            component={state.rightPanel} componentEx={state.card}
            />
            <BottomBar naviList={PanelConfig.bimNaviList}/>
        </div>
    )
}