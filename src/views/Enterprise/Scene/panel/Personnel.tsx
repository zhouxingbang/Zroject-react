import React from 'react';
import { 
    makeStyles, 
    createStyles,
    Typography
} from "@material-ui/core";
import BarChart from '~components/Echarts/BarChart';

interface AreaItem {
    id: string;
    name: string;
    value: number;
}

export default function Personnel() {

    const [areaList, setAreaList] = React.useState<Array<AreaItem>>([]);

    const classes = makeStyles(createStyles({
        root: {
            width: 280,
            height: '100%'
        },
        barChart: {
            width: '100%',
            height: `${areaList.length*46}px`
        }
    }))();

    React.useEffect(() => {
        setAreaList([
            {id:'01', name:"区域01", value: 20},
            {id:'02', name:"区域02", value: 15},
            {id:'03', name:"区域03", value: 20},
            {id:'04', name:"区域04", value: 15}
        ]);
    }, []);

    return (
        <div className={classes.root}>
            <Typography>fafafafdadfa</Typography>
            <BarChart className={classes.barChart}
            labels={areaList.map(el => el.name)}
            data={[{name:"",data:areaList.map(el => ({startColor:"#3ed5f0",endColor:"#0eb9de",value:el.value}))}]}
            />
        </div>
    )
}