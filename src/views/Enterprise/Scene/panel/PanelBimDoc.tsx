import React from 'react';
import {
    Grid,
    makeStyles,
    createStyles
} from '@material-ui/core';
import ExpandPanel from '~components/ExpandPanel';
import DonutLegend from '~components/Echarts/DonutLegend';
import BarChart from '~components/Echarts/BarChart';
import BimDocView from './BimDocView';
import { PieItemType } from '~components/Echarts/PieChart';

export default function PanelBimDoc() {

    const classes = makeStyles(createStyles({
        donutLegend: {
            height: 125
        },
        barChart: {
            height: 120
        }
    }))();

    const [chartData, setChartData] = React.useState({
        labels: Array<string>(),
        donut: Array<PieItemType>(),
        bar: Array<{startColor:string,endColor:string,value:number}>()
    });

    React.useEffect(() => {
        
    }, []);

    return (
        <Grid container style={{height:'100%'}}>
            <Grid item style={{height:'100%'}}>
                <ExpandPanel title="资料详情">
                    <DonutLegend unit="份" className={classes.donutLegend} data={chartData.donut}/>
                    <div style={{height:40}}/>
                    <BarChart orientation className={classes.barChart} labels={chartData.labels} data={[{name:"大小",data:chartData.bar}]}/>
                    <div style={{height:60}}/>
                    <BimDocView />
                </ExpandPanel>
            </Grid>
        </Grid>
    )
}