import React from 'react';
import { Typography, makeStyles, createStyles, List } from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';
import BarChart, { BarData } from '~components/Echarts/BarChart';
import ListItemEx from '~components/ListItemEx';
import ExpandPanel, { PanelItem } from '~components/ExpandPanel';
import DonutLegend from '~components/Echarts/DonutLegend';
import { PieItemType } from '~components/Echarts/PieChart';
import BarRing from '~components/BarRing';

type CoItemType = {
    labels: [];
    data: BarData;
}

function CoBarItem(props: CoItemType) {

    const classes = makeStyles(createStyles({
        name: {
            ...FontStyles.labelFont,
            color: '#f8f8ff'
        },
        barChart: {
            width: '100%',
            height: 125
        }
    }))();

    return (
        <div>
            <Typography className={classes.name}>{props.data.name}</Typography>
            <div style={{height:30}}/>
            <BarChart orientation className={classes.barChart} labels={props.labels} data={[props.data]}/>
        </div>
    )
}

const CoBarList = React.forwardRef((props: {data: CoItemType[], style?:React.CSSProperties}, ref?:React.Ref<HTMLDivElement>) => {

    return (
        <div ref={ref} style={props.style}>
            <List style={{width:'100%'}}>
                {props.data.map(el => (
                    <ListItemEx key={el.data.name}>
                        <CoBarItem {...el} />
                    </ListItemEx>
                ))}
            </List>
        </div>
    )
});

export default function PanelCo() {

    const classes = makeStyles(createStyles({
        root: {
            height: '100%'
        },
        donutLegend: {
            width: "100%",
            height: 125
        },
        coBar: {
            width: 200,
            height: 80
        }
    }))();

    const [donutData, setDonutData] = React.useState<PieItemType[]>([]);
    const [dealData, setDealData] = React.useState({deal:0,undeal:0});
    const [barItemList, setBarItemList] = React.useState<CoItemType[]>([]);

    React.useEffect(() => {
        setDonutData([
            {name:"测试01",value:2000,startColor:"red",endColor:"blue"},
            {name:"测试00001",value:450,startColor:"gray",endColor:"blue"},
            {name:"测试0932111",value:2000100,startColor:"yellow",endColor:"blue"}
        ]);
    }, []);

    return (
        <ExpandPanel title="协同信息">
            <DonutLegend className={classes.donutLegend} data={donutData} unit="份"/>
            <div style={{height:30}}/>
            <BarRing tdata={{name:"未处理",value:dealData.undeal}} bdata={{name:"已处理",value:dealData.deal}} rdata={{name:"处理率",value:dealData.deal*100/Math.max(1,dealData.deal+dealData.undeal)}}/>
            <PanelItem expandView={<CoBarList 
            style={{marginTop:-30, width:'100%',height:'100%',overflowX:'hidden',overflowY:'auto'}} 
            data={barItemList}/>}>
                <CoBarList style={{width:'100%'}} data={barItemList}/>
            </PanelItem>
        </ExpandPanel>
    )
} 