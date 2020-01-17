import React from 'react';
import Utils from '~code/utils';
import {
    makeStyles,
    createStyles,
    List
} from '@material-ui/core';
import ListItemEx from '~components/ListItemEx';
import ProgressText from '~components/ProgressText';
import ExpandPanel, { PanelItem } from '~components/ExpandPanel';
import DonutLegend from '~components/Echarts/DonutLegend';
import BarChart from '~components/Echarts/BarChart';
import { PieItemType } from '~components/Echarts/PieChart';

type DocProgressType = {
    name:string;
    count:number;
    size:number;
    ratio:number;
}

const DocProgressList = React.forwardRef((props:{style?:React.CSSProperties,data:DocProgressType[]}, ref?:React.Ref<HTMLDivElement>) => {
    
    const getSizeText = (size:number):string => {
        let sizeInfo = Utils.parseFileSize(size);
        return Utils.parseNumerical(sizeInfo.value)+sizeInfo.unit;
    };

    return (
        <div ref={ref} style={props.style}>
            <List style={{width:'100%'}}>
                {props.data.map(el => (
                    <ListItemEx key={el.name}>
                        <ProgressText 
                        ltText={el.name} 
                        rtText={Utils.parseNumerical(el.count)+"份  "+getSizeText(el.size)} 
                        endPct={el.ratio}
                        />
                    </ListItemEx>
                ))}
            </List>
        </div>
    )
});

export default function PanelDoc() {
    const classes = makeStyles(createStyles({
        root: {
            height: '100%'
        },
        donutLegend: {
            width: '100%',
            height: 125
        },
        barChart: {
            width: '100%',
            height: 125
        }
    }))();

    const [progressList, setProgressList] = React.useState<DocProgressType[]>([]);
    const [chartData, setChartData] = React.useState({
        labels: Array<string>(),
        donut: Array<PieItemType>(),
        bar: Array<{startColor:string,endColor:string,value:number}>()
    });

    function formatLabel(name:string,value:number) {
        let sizInfo = Utils.parseFileSize(value);
        return Utils.parseNumerical(sizInfo.value,0)+sizInfo.unit;
    }

    return (
        <ExpandPanel title="资料详情">
            <DonutLegend className={classes.donutLegend} data={chartData.donut} unit="份"/>
            <div style={{height:30}}/>
            <BarChart orientation className={classes.barChart} labels={chartData.labels} data={[{name:"",data:chartData.bar}]} formatLabel={formatLabel}/>
            <PanelItem className={classes.root} 
            expandView={<DocProgressList 
            style={{width:'100%',height:'100%',overflowX:'hidden',overflowY:'auto'}} 
            data={progressList}/>}
            >
                <DocProgressList style={{width:'100%'}} data={progressList}/>
            </PanelItem>
        </ExpandPanel>
    )
}