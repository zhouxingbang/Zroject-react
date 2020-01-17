import React from 'react';
import { BizPanel } from './PanelDefine';

export type ActionType = {
    type: "leftPanel" | "rightPanel" | "card";
}

class SceneViewMgr {
    
    private _viewDispatch: ((action:ActionType) => void) | null = null;
    private _leftPanel: BizPanel|null = null;
    private _rightPanel: BizPanel|null = null;
    private _card: React.ReactNode|null = null;

    init(dispatch: (action:ActionType) => void) {
        this._viewDispatch = dispatch;
    }

    unInit() {
        this._viewDispatch = null;
    }

    get leftPanel(): BizPanel|null {
        return this._leftPanel;
    }
    
    set leftPanel(newPanel: BizPanel|null) {
        this._leftPanel = newPanel;
        if(this._viewDispatch) {
            this._viewDispatch({type:"leftPanel"});
        }
    }

    get rightPanel(): BizPanel|null {
        return this._rightPanel;
    }
    
    set rightPanel(newPanel: BizPanel|null) {
        this._rightPanel = newPanel;
        if(this._viewDispatch) {
            this._viewDispatch({type:"rightPanel"});
        }
    }

    get card(): React.ReactNode|null {
        return this._card;
    }

    set card(newCard: React.ReactNode|null) {
        this._card = newCard;
        if(this._viewDispatch) {
            this._viewDispatch({type:"card"});
        }
    }
}

const sceneViewMgr = new SceneViewMgr;
export default sceneViewMgr;