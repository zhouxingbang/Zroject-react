import React from 'react';
import ExpandPanel from '~components/ExpandPanel';
import {
    Grid,
    makeStyles,
    createStyles
} from '@material-ui/core';
import DonutLegend from '~components/Echarts/DonutLegend';
import BarRing from '~components/BarRing';
import BimCoView from './BimCoView';
import { PieItemType } from '~components/Echarts/PieChart';

export default function PanelBimCo() {

    const classes = makeStyles(createStyles({
        donutLegend: {
            height: 125             
        }
    }))();

    const [donutData, setDonutData] = React.useState<PieItemType[]>([]);
    const [status, setStatus] = React.useState({deal:0,undeal:0}); 

    return (
        <Grid container style={{height:'100%'}}>
            <Grid item style={{height:'100%'}}>
                <ExpandPanel title="协同信息">
                    <DonutLegend unit="份" data={donutData} className={classes.donutLegend}/>
                    <div style={{height:40}}/>
                    <BarRing tdata={{name:"未处理",value:status.undeal}} bdata={{name:"已处理",value:status.deal}} rdata={{name:"处理率",value:status.deal*100/Math.max(1,status.deal+status.undeal)}}/>
                    <div style={{height:50}}/>
                    <BimCoView />
                </ExpandPanel>
            </Grid>
        </Grid>
    )
}