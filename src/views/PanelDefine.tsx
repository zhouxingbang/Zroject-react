import React from 'react';
import PanelProject from './Enterprise/Scene/panel/PanelProject';
import PanelBimProject from './Enterprise/Scene/panel/PanelBimProject';
import PanelCo from './Enterprise/Scene/panel/PanelCo';
import PanelSand from './Enterprise/Scene/panel/PanelSand';
import PanelSchedule from './Enterprise/Scene/panel/PanelSchedule';
import PanelDoc from './Enterprise/Scene/panel/PanelDoc';
import PanelBimCo from './Enterprise/Scene/panel/PanelBimCo';
import PanelBimDoc from './Enterprise/Scene/panel/PanelBimDoc';

export interface BizPanel {
    instanceId: string;
    view: React.ReactNode;
    thumbnail?: string;
    noWar?: boolean;
};

export interface PanelNavi {
    name: string;
    logo: string;
    logoHover: string;
    leftPanel?: BizPanel;
    rightPanel?: BizPanel;
}

export default class PanelConfig {

    static sceneNaviList:PanelNavi[] = [
        {
            name: "项目",
            logo: require("~assets/img/panel_xiangmu.png"),
            logoHover: require("~assets/img/panel_xiangmu_hover.png"),
            leftPanel: {
                instanceId: "panelproject",
                view: <PanelProject />,
            }
        },
        {
            name: "进度",
            logo: require("~assets/img/panel_jindu.png"),
            logoHover: require("~assets/img/panel_jindu_hover.png"),
            leftPanel: {
                instanceId: "panelschedule",
                view: <PanelSchedule />,
            }
        },
        {
            name: "资料",
            logo: require("~assets/img/panel_ziliao.png"),
            logoHover: require("~assets/img/panel_ziliao_hover.png"),
            leftPanel: {
                instanceId: "paneldoc",
                view: <PanelDoc />,
            }
        },
        {
            name: "协同",
            logo: require("~assets/img/panel_xietong.png"),
            logoHover: require("~assets/img/panel_xietong_hover.png"),
            leftPanel: {
                instanceId: "panelco",
                view: <PanelCo />,
            }
        }
    ];

    static bimNaviList:PanelNavi[] = [
        {
            name: "项目",
            logo: require("~assets/img/panel_xiangmu.png"),
            logoHover: require("~assets/img/panel_xiangmu_hover.png"),
            leftPanel: {
                instanceId: "panelproject",
                view: <PanelBimProject />,
            }
        },
        {
            name: "资料",
            logo: require("~assets/img/panel_ziliao.png"),
            logoHover: require("~assets/img/panel_ziliao_hover.png"),
            leftPanel: {
                instanceId: "panelbimdoc",
                view: <PanelBimDoc />,
            }
        },
        {
            name: "协同",
            logo: require("~assets/img/panel_xietong.png"),
            logoHover: require("~assets/img/panel_xietong_hover.png"),
            leftPanel: {
                instanceId: "panelbimco",
                view: <PanelBimCo />,
            }
        },
        {
            name: "沙盘",
            logo: require("~assets/img/panel_shapan.png"),
            logoHover: require("~assets/img/panel_shapan_hover.png"),
            leftPanel: {
                instanceId: "panelsand",
                view: <PanelSand />,
            }
        }
    ];
}